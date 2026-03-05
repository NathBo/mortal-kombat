import tkinter as tk
from tkinter import ttk, filedialog, messagebox
from PIL import Image, ImageTk
import numpy as np
from collections import deque
import os
import re

# =========================
# CONFIG
# =========================
PREFIX = "joh"   # ex: "joh" -> johcoordinates.set(...)
# =========================


def connected_component_bbox(alpha: np.ndarray, sx: int, sy: int, connectivity: int = 4):
    """
    alpha: HxW uint8 array
    (sx, sy): seed pixel in image coordinates
    Returns (minx, miny, maxx, maxy) inclusive bounds of the connected component of alpha>0.
    If seed is on transparent pixel => returns None.
    """
    h, w = alpha.shape
    if sx < 0 or sy < 0 or sx >= w or sy >= h:
        return None
    if alpha[sy, sx] == 0:
        return None

    visited = np.zeros((h, w), dtype=np.uint8)
    q = deque()
    q.append((sx, sy))
    visited[sy, sx] = 1

    minx = maxx = sx
    miny = maxy = sy

    if connectivity == 8:
        neighbors = [(-1, -1), (0, -1), (1, -1),
                     (-1,  0),          (1,  0),
                     (-1,  1), (0,  1), (1,  1)]
    else:
        neighbors = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while q:
        x, y = q.popleft()

        if x < minx: minx = x
        if x > maxx: maxx = x
        if y < miny: miny = y
        if y > maxy: maxy = y

        for dx, dy in neighbors:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                if visited[ny, nx] == 0 and alpha[ny, nx] != 0:
                    visited[ny, nx] = 1
                    q.append((nx, ny))

    return (minx, miny, maxx, maxy)


def increment_trailing_number(name: str) -> str:
    """
    If name ends with digits, increment them: "hkick1" -> "hkick2", "move009" -> "move010".
    Otherwise return unchanged.
    """
    m = re.match(r"^(.*?)(\d+)$", name)
    if not m:
        return name
    base, num = m.group(1), m.group(2)
    width = len(num)
    new_num = int(num) + 1
    return f"{base}{new_num:0{width}d}"


class SpriteBBoxTool(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Connected Component BBox (alpha>0)")
        self.geometry("1200x800")

        # Data
        self.image_path = None
        self.img_rgba = None              # PIL RGBA
        self.alpha = None                 # numpy HxW uint8
        self.tk_img = None                # ImageTk
        self.zoom = 1.0

        # Last computed line (only added when user clicks "Ajouter")
        self.pending_js_line = None

        self._build_ui()

    def _build_ui(self):
        self.columnconfigure(1, weight=1)
        self.rowconfigure(0, weight=1)

        left = ttk.Frame(self, padding=10)
        left.grid(row=0, column=0, sticky="ns")
        left.columnconfigure(0, weight=1)

        right = ttk.Frame(self, padding=10)
        right.grid(row=0, column=1, sticky="nsew")
        right.columnconfigure(0, weight=1)
        right.rowconfigure(0, weight=1)

        # ---- Controls (left) ----
        btn_open = ttk.Button(left, text="Choisir une image...", command=self.open_image)
        btn_open.grid(row=0, column=0, sticky="ew")

        self.lbl_path = ttk.Label(left, text="Aucune image")
        self.lbl_path.grid(row=1, column=0, sticky="ew", pady=(6, 10))

        params = ttk.LabelFrame(left, text="Paramètres de sortie", padding=10)
        params.grid(row=2, column=0, sticky="ew")
        params.columnconfigure(1, weight=1)

        ttk.Label(params, text='name').grid(row=0, column=0, sticky="w")
        self.var_name = tk.StringVar(value="hkick1")
        ttk.Entry(params, textvariable=self.var_name).grid(row=0, column=1, sticky="ew", pady=2)

        ttk.Label(params, text='decx').grid(row=1, column=0, sticky="w")
        self.var_decx = tk.IntVar(value=0)
        ttk.Entry(params, textvariable=self.var_decx).grid(row=1, column=1, sticky="ew", pady=2)

        ttk.Label(params, text='decy').grid(row=2, column=0, sticky="w")
        self.var_decy = tk.IntVar(value=0)
        ttk.Entry(params, textvariable=self.var_decy).grid(row=2, column=1, sticky="ew", pady=2)

        ttk.Label(params, text='connectivité').grid(row=3, column=0, sticky="w")
        self.var_conn = tk.StringVar(value="4")
        ttk.Combobox(params, textvariable=self.var_conn, values=["4", "8"], width=5, state="readonly") \
            .grid(row=3, column=1, sticky="w", pady=2)

        # Zoom
        zoomf = ttk.LabelFrame(left, text="Zoom", padding=10)
        zoomf.grid(row=3, column=0, sticky="ew", pady=(10, 0))
        zoomf.columnconfigure(0, weight=1)

        self.var_zoom = tk.DoubleVar(value=1.0)
        s = ttk.Scale(zoomf, from_=0.25, to=6.0, variable=self.var_zoom, command=self._on_zoom_change)
        s.grid(row=0, column=0, sticky="ew")
        self.lbl_zoom = ttk.Label(zoomf, text="x1.00")
        self.lbl_zoom.grid(row=1, column=0, sticky="w", pady=(6, 0))

        # Output area (pending)
        out = ttk.LabelFrame(left, text="Résultat (en attente)", padding=10)
        out.grid(row=4, column=0, sticky="ew", pady=(10, 0))
        out.columnconfigure(0, weight=1)

        self.txt_out = tk.Text(out, height=6, wrap="word")
        self.txt_out.grid(row=0, column=0, sticky="ew")
        self.txt_out.configure(state="disabled")

        btns = ttk.Frame(out)
        btns.grid(row=1, column=0, sticky="ew", pady=(8, 0))
        btns.columnconfigure((0, 1), weight=1)

        ttk.Button(btns, text="Copier (ligne)", command=self.copy_pending_line).grid(row=0, column=0, sticky="ew")
        ttk.Button(btns, text="Ajouter", command=self.add_pending_to_history).grid(row=0, column=1, sticky="ew", padx=(8, 0))

        # History
        hist = ttk.LabelFrame(left, text="Historique", padding=10)
        hist.grid(row=5, column=0, sticky="nsew", pady=(10, 0))
        left.rowconfigure(5, weight=1)

        self.lst = tk.Listbox(hist, height=10)
        self.lst.grid(row=0, column=0, sticky="nsew")
        hist.rowconfigure(0, weight=1)
        hist.columnconfigure(0, weight=1)

        hist_btns = ttk.Frame(hist)
        hist_btns.grid(row=1, column=0, sticky="ew", pady=(8, 0))
        hist_btns.columnconfigure((0, 1), weight=1)

        ttk.Button(hist_btns, text="Clear history", command=self.clear_history)\
            .grid(row=0, column=0, sticky="ew")
        ttk.Button(hist_btns, text="Tout copier", command=self.copy_all_history)\
            .grid(row=0, column=1, sticky="ew", padx=(8, 0))

        # Hint
        self.lbl_hint = ttk.Label(
            left,
            text="Cliquez sur un pixel non transparent → calcule le bbox.\n"
                 "L’historique ne s’ajoute que via le bouton “Ajouter”."
        )
        self.lbl_hint.grid(row=6, column=0, sticky="ew", pady=(10, 0))

        # ---- Canvas (right) ----
        canvas_frame = ttk.Frame(right)
        canvas_frame.grid(row=0, column=0, sticky="nsew")
        canvas_frame.rowconfigure(0, weight=1)
        canvas_frame.columnconfigure(0, weight=1)

        self.canvas = tk.Canvas(canvas_frame, bg="#222222", highlightthickness=0)
        self.canvas.grid(row=0, column=0, sticky="nsew")

        vsb = ttk.Scrollbar(canvas_frame, orient="vertical", command=self.canvas.yview)
        hsb = ttk.Scrollbar(canvas_frame, orient="horizontal", command=self.canvas.xview)
        self.canvas.configure(yscrollcommand=vsb.set, xscrollcommand=hsb.set)
        vsb.grid(row=0, column=1, sticky="ns")
        hsb.grid(row=1, column=0, sticky="ew")

        self.canvas.bind("<Button-1>", self.on_click)
        self.canvas.bind("<Configure>", lambda e: self._update_scrollregion())

        # Drag to pan
        self.canvas.bind("<ButtonPress-2>", self._pan_start)
        self.canvas.bind("<B2-Motion>", self._pan_move)
        self.canvas.bind("<ButtonPress-3>", self._pan_start)
        self.canvas.bind("<B3-Motion>", self._pan_move)

        self.rect_id = None

    def _pan_start(self, event):
        self.canvas.scan_mark(event.x, event.y)

    def _pan_move(self, event):
        self.canvas.scan_dragto(event.x, event.y, gain=1)

    def open_image(self):
        path = filedialog.askopenfilename(
            title="Choisir une image",
            filetypes=[("Images", "*.png *.webp *.bmp *.gif *.jpg *.jpeg"), ("Tous les fichiers", "*.*")]
        )
        if not path:
            return

        try:
            img = Image.open(path).convert("RGBA")
        except Exception as e:
            messagebox.showerror("Erreur", f"Impossible d'ouvrir l'image:\n{e}")
            return

        self.image_path = path
        self.img_rgba = img
        self.alpha = np.array(img)[:, :, 3].astype(np.uint8)

        self.lbl_path.configure(text=os.path.basename(path))

        self.var_zoom.set(1.0)
        self.zoom = 1.0
        self.canvas.xview_moveto(0)
        self.canvas.yview_moveto(0)

        self.pending_js_line = None
        self._set_output("Image chargée. Cliquez sur un pixel non transparent.")

        self._render_image()

    def _on_zoom_change(self, _=None):
        z = float(self.var_zoom.get())
        if z <= 0:
            return
        self.zoom = z
        self.lbl_zoom.configure(text=f"x{z:.2f}")
        if self.img_rgba is not None:
            self._render_image()

    def _render_image(self):
        self.canvas.delete("img")
        if self.rect_id is not None:
            self.canvas.delete(self.rect_id)
            self.rect_id = None

        w, h = self.img_rgba.size
        zw, zh = int(w * self.zoom), int(h * self.zoom)
        disp = self.img_rgba.resize((zw, zh), resample=Image.NEAREST)

        self.tk_img = ImageTk.PhotoImage(disp)
        self.canvas.create_image(0, 0, anchor="nw", image=self.tk_img, tags=("img",))
        self._update_scrollregion()

    def _update_scrollregion(self):
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))

    def canvas_to_image_coords(self, cx, cy):
        if self.img_rgba is None:
            return None
        x = self.canvas.canvasx(cx)
        y = self.canvas.canvasy(cy)
        ix = int(x / self.zoom)
        iy = int(y / self.zoom)
        return ix, iy

    def on_click(self, event):
        if self.img_rgba is None:
            return

        coords = self.canvas_to_image_coords(event.x, event.y)
        if coords is None:
            return
        ix, iy = coords

        conn = 4 if self.var_conn.get() == "4" else 8
        bbox = connected_component_bbox(self.alpha, ix, iy, connectivity=conn)
        if bbox is None:
            self.pending_js_line = None
            self._set_output("Clic sur un pixel transparent (alpha=0).")
            if self.rect_id is not None:
                self.canvas.delete(self.rect_id)
                self.rect_id = None
            return

        minx, miny, maxx, maxy = bbox
        offx = minx
        offy = miny
        width = (maxx - minx + 1)
        height = (maxy - miny + 1)

        name = self.var_name.get().strip() or "sprite"
        decx = int(self.var_decx.get())
        decy = int(self.var_decy.get())

        # PREFIX applied here:
        line = f'{PREFIX}coordinates.set("{name}",{{offx:{offx},width:{width},offy:{offy},height:{height},decx:{decx},decy:{decy}}});'
        self.pending_js_line = line

        self._set_output(
            f"seed=({ix},{iy})\n"
            f"bbox: min=({minx},{miny}) max=({maxx},{maxy})\n\n"
            f"{line}\n\n"
            f"(Cliquez “Ajouter” pour l’insérer dans l’historique.)"
        )

        # Draw rectangle overlay
        x1 = minx * self.zoom
        y1 = miny * self.zoom
        x2 = (maxx + 1) * self.zoom
        y2 = (maxy + 1) * self.zoom

        if self.rect_id is not None:
            self.canvas.delete(self.rect_id)
        self.rect_id = self.canvas.create_rectangle(x1, y1, x2, y2, outline="yellow", width=2)

    def add_pending_to_history(self):
        if not self.pending_js_line:
            messagebox.showinfo("Info", "Aucun résultat en attente à ajouter.")
            return

        self.lst.insert("end", self.pending_js_line)
        self.lst.yview_moveto(1)

        # Auto increment name if ends with number
        cur_name = self.var_name.get().strip()
        if cur_name:
            self.var_name.set(increment_trailing_number(cur_name))

        # Optional: keep pending line (so you can re-add) or clear it.
        # Here: clear it to avoid accidental duplicates.
        self.pending_js_line = None
        self._set_output("Ajouté à l’historique. Cliquez à nouveau pour calculer un autre bbox.")

    def copy_pending_line(self):
        if not self.pending_js_line:
            return
        self.clipboard_clear()
        self.clipboard_append(self.pending_js_line)

    def clear_history(self):
        self.lst.delete(0, "end")

    def copy_all_history(self):
        if self.lst.size() == 0:
            return
        all_lines = "\n".join(self.lst.get(i) for i in range(self.lst.size()))
        self.clipboard_clear()
        self.clipboard_append(all_lines)

    def _set_output(self, text):
        self.txt_out.configure(state="normal")
        self.txt_out.delete("1.0", "end")
        self.txt_out.insert("1.0", text)
        self.txt_out.configure(state="disabled")


if __name__ == "__main__":
    app = SpriteBBoxTool()
    app.mainloop()