# File: launch_game.ps1

$ErrorActionPreference = "Stop"

$Root = [System.IO.Path]::GetFullPath(
    (Split-Path -Parent $MyInvocation.MyCommand.Path)
)

$Port = 8000
$Url = "http://localhost:$Port/"


function Test-PortAvailable {
    param(
        [Parameter(Mandatory = $true)]
        [int]$Port
    )

    $TcpListener = $null

    try {
        $TcpListener = [System.Net.Sockets.TcpListener]::new(
            [System.Net.IPAddress]::Loopback,
            $Port
        )

        $TcpListener.Start()

        return $true
    }
    catch {
        return $false
    }
    finally {
        if ($null -ne $TcpListener) {
            try {
                $TcpListener.Stop()
            }
            catch {
            }
        }
    }
}


if (-not (Test-PortAvailable -Port $Port)) {
    Clear-Host

    Write-Host "========================================" -ForegroundColor Red
    Write-Host "         UNABLE TO START GAME" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""

    Write-Host `
        "Port $Port is already in use." `
        -ForegroundColor Yellow

    Write-Host ""

    Write-Host `
        "The game always uses $Url to preserve browser save data."

    Write-Host ""

    Write-Host `
        "Close the application using port $Port, then launch the game again."

    Write-Host ""

    Read-Host "Press Enter to close"

    exit 1
}


$ServerSource = @'
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;

public sealed class ParallelGameServer
{
    private readonly HttpListener listener;
    private readonly string rootDirectory;

    private readonly Dictionary<string, string> mimeTypes =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { ".html",  "text/html; charset=utf-8" },
            { ".htm",   "text/html; charset=utf-8" },
            { ".js",    "text/javascript; charset=utf-8" },
            { ".mjs",   "text/javascript; charset=utf-8" },
            { ".css",   "text/css; charset=utf-8" },
            { ".json",  "application/json; charset=utf-8" },

            { ".glsl",  "text/plain; charset=utf-8" },
            { ".vert",  "text/plain; charset=utf-8" },
            { ".frag",  "text/plain; charset=utf-8" },

            { ".png",   "image/png" },
            { ".jpg",   "image/jpeg" },
            { ".jpeg",  "image/jpeg" },
            { ".gif",   "image/gif" },
            { ".webp",  "image/webp" },
            { ".svg",   "image/svg+xml" },
            { ".ico",   "image/x-icon" },
            { ".bmp",   "image/bmp" },

            { ".wav",   "audio/wav" },
            { ".mp3",   "audio/mpeg" },
            { ".ogg",   "audio/ogg" },
            { ".m4a",   "audio/mp4" },
            { ".flac",  "audio/flac" },

            { ".mp4",   "video/mp4" },
            { ".webm",  "video/webm" },

            { ".woff",  "font/woff" },
            { ".woff2", "font/woff2" },
            { ".ttf",   "font/ttf" },
            { ".otf",   "font/otf" },

            { ".wasm",  "application/wasm" },
            { ".xml",   "application/xml" },
            { ".txt",   "text/plain; charset=utf-8" },
            { ".map",   "application/json; charset=utf-8" }
        };


    public ParallelGameServer(
        string rootDirectory,
        string prefix
    )
    {
        this.rootDirectory =
            Path.GetFullPath(
                rootDirectory
            );

        listener =
            new HttpListener();

        listener.Prefixes.Add(
            prefix
        );
    }


    public bool IsRunning
    {
        get
        {
            return listener != null &&
                   listener.IsListening;
        }
    }


    public void Start()
    {
        listener.Start();

        Thread acceptThread =
            new Thread(
                new ThreadStart(
                    AcceptLoop
                )
            );

        acceptThread.IsBackground =
            true;

        acceptThread.Start();
    }


    public void Stop()
    {
        try
        {
            if (listener.IsListening)
            {
                listener.Stop();
            }
        }
        catch
        {
        }

        try
        {
            listener.Close();
        }
        catch
        {
        }
    }


    private void AcceptLoop()
    {
        while (listener.IsListening)
        {
            HttpListenerContext context;

            try
            {
                context =
                    listener.GetContext();
            }
            catch
            {
                if (!listener.IsListening)
                {
                    return;
                }

                continue;
            }


            ThreadPool.QueueUserWorkItem(
                new WaitCallback(
                    HandleRequestWorker
                ),
                context
            );
        }
    }


    private void HandleRequestWorker(
        object state
    )
    {
        HttpListenerContext context =
            state as HttpListenerContext;

        if (context == null)
        {
            return;
        }

        try
        {
            HandleRequest(
                context
            );
        }
        catch
        {
            try
            {
                context.Response.Close();
            }
            catch
            {
            }
        }
    }


    private void HandleRequest(
        HttpListenerContext context
    )
    {
        HttpListenerRequest request =
            context.Request;

        bool sendBody =
            !string.Equals(
                request.HttpMethod,
                "HEAD",
                StringComparison.OrdinalIgnoreCase
            );


        if (
            !string.Equals(
                request.HttpMethod,
                "GET",
                StringComparison.OrdinalIgnoreCase
            )
            &&
            !string.Equals(
                request.HttpMethod,
                "HEAD",
                StringComparison.OrdinalIgnoreCase
            )
        )
        {
            SendText(
                context,
                405,
                "405 - Method Not Allowed",
                sendBody
            );

            return;
        }


        string filePath =
            GetSafeFilePath(
                request.Url.AbsolutePath
            );


        if (filePath == null)
        {
            SendText(
                context,
                403,
                "403 - Forbidden",
                sendBody
            );

            return;
        }


        if (!File.Exists(filePath))
        {
            SendText(
                context,
                404,
                "404 - File Not Found",
                sendBody
            );

            return;
        }


        try
        {
            SendFile(
                context,
                filePath,
                sendBody
            );
        }
        catch (
            HttpListenerException
        )
        {
        }
        catch (
            IOException
        )
        {
        }
        catch
        {
            try
            {
                SendText(
                    context,
                    500,
                    "500 - Internal Server Error",
                    true
                );
            }
            catch
            {
            }
        }
    }


    private string GetSafeFilePath(
        string requestPath
    )
    {
        try
        {
            string decodedPath =
                Uri.UnescapeDataString(
                    requestPath ?? ""
                );


            decodedPath =
                decodedPath.Replace(
                    '/',
                    Path.DirectorySeparatorChar
                );


            decodedPath =
                decodedPath.TrimStart(
                    Path.DirectorySeparatorChar
                );


            if (
                string.IsNullOrWhiteSpace(
                    decodedPath
                )
            )
            {
                decodedPath =
                    "index.html";
            }


            string candidate =
                Path.GetFullPath(
                    Path.Combine(
                        rootDirectory,
                        decodedPath
                    )
                );


            string rootPrefix =
                rootDirectory.TrimEnd(
                    Path.DirectorySeparatorChar,
                    Path.AltDirectorySeparatorChar
                )
                +
                Path.DirectorySeparatorChar;


            bool isRoot =
                string.Equals(
                    candidate,
                    rootDirectory,
                    StringComparison.OrdinalIgnoreCase
                );


            bool isInsideRoot =
                candidate.StartsWith(
                    rootPrefix,
                    StringComparison.OrdinalIgnoreCase
                );


            if (
                !isRoot &&
                !isInsideRoot
            )
            {
                return null;
            }


            if (
                Directory.Exists(
                    candidate
                )
            )
            {
                candidate =
                    Path.Combine(
                        candidate,
                        "index.html"
                    );
            }


            return candidate;
        }
        catch
        {
            return null;
        }
    }


    private string GetMimeType(
        string filePath
    )
    {
        string extension =
            Path.GetExtension(
                filePath
            );


        string contentType;

        if (
            mimeTypes.TryGetValue(
                extension,
                out contentType
            )
        )
        {
            return contentType;
        }


        return "application/octet-stream";
    }


    private string GetCacheControl(
        string filePath
    )
    {
        string extension =
            Path.GetExtension(
                filePath
            )
            .ToLowerInvariant();


        switch (extension)
        {
            case ".html":
            case ".htm":
            case ".js":
            case ".mjs":
            case ".css":
            case ".glsl":
            case ".vert":
            case ".frag":
                return "no-store";

            default:
                return "public, max-age=86400";
        }
    }


    private void SendFile(
        HttpListenerContext context,
        string filePath,
        bool sendBody
    )
    {
        HttpListenerResponse response =
            context.Response;


        FileInfo fileInfo =
            new FileInfo(
                filePath
            );


        response.StatusCode =
            200;

        response.ContentType =
            GetMimeType(
                filePath
            );

        response.Headers[
            "Cache-Control"
        ] =
            GetCacheControl(
                filePath
            );

        response.ContentLength64 =
            fileInfo.Length;


        if (!sendBody)
        {
            SafeClose(
                response
            );

            return;
        }


        try
        {
            using (
                FileStream stream =
                    new FileStream(
                        filePath,
                        FileMode.Open,
                        FileAccess.Read,
                        FileShare.Read,
                        64 * 1024,
                        FileOptions.SequentialScan
                    )
            )
            {
                byte[] buffer =
                    new byte[
                        64 * 1024
                    ];

                int bytesRead;

                while (
                    (
                        bytesRead =
                            stream.Read(
                                buffer,
                                0,
                                buffer.Length
                            )
                    ) > 0
                )
                {
                    response.OutputStream.Write(
                        buffer,
                        0,
                        bytesRead
                    );
                }
            }
        }
        catch (
            HttpListenerException
        )
        {
        }
        catch (
            IOException
        )
        {
        }
        finally
        {
            SafeClose(
                response
            );
        }
    }


    private void SendText(
        HttpListenerContext context,
        int statusCode,
        string text,
        bool sendBody
    )
    {
        byte[] content =
            Encoding.UTF8.GetBytes(
                text
            );


        HttpListenerResponse response =
            context.Response;


        try
        {
            response.StatusCode =
                statusCode;

            response.ContentType =
                "text/plain; charset=utf-8";

            response.Headers[
                "Cache-Control"
            ] =
                "no-store";

            response.ContentLength64 =
                content.Length;


            if (
                sendBody &&
                content.Length > 0
            )
            {
                response.OutputStream.Write(
                    content,
                    0,
                    content.Length
                );
            }
        }
        catch (
            HttpListenerException
        )
        {
        }
        catch (
            IOException
        )
        {
        }
        finally
        {
            SafeClose(
                response
            );
        }
    }


    private static void SafeClose(
        HttpListenerResponse response
    )
    {
        try
        {
            response.OutputStream.Close();
        }
        catch
        {
        }


        try
        {
            response.Close();
        }
        catch
        {
        }
    }
}
'@


Add-Type `
    -TypeDefinition $ServerSource `
    -Language CSharp


$Server =
    [ParallelGameServer]::new(
        $Root,
        $Url
    )


try {
    $Server.Start()

    Clear-Host

    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "          GAME SERVER RUNNING" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "Game directory : $Root"
    Write-Host "Address        : $Url"

    Write-Host ""

    Write-Host `
        "Port $Port is fixed to preserve browser save data." `
        -ForegroundColor DarkGray

    Write-Host `
        "HTTP requests are processed in parallel." `
        -ForegroundColor DarkGray

    Write-Host `
        "HTML, JS, CSS and GLSL files are not cached." `
        -ForegroundColor DarkGray

    Write-Host `
        "Images, audio, fonts and other assets are cached for 24 hours." `
        -ForegroundColor DarkGray

    Write-Host ""

    Write-Host `
        "Close this window to stop the server." `
        -ForegroundColor DarkGray

    Write-Host ""

    Start-Process `
        $Url


    while ($Server.IsRunning) {
        Start-Sleep `
            -Milliseconds 500
    }
}
finally {
    if ($null -ne $Server) {
        $Server.Stop()
    }
}