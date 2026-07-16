const shopParticles = [];
const SHOP_PARTICLE_COUNT = 80;
const dim_x = 890;

function initShopParticles() {
    shopParticles.length = 0;

    for (let i = 0; i < SHOP_PARTICLE_COUNT; i++) {
        shopParticles.push(createShopParticle());
    }
}

function drawShopParticles(ctx) {
    ctx.scale(2,2);
	for (const p of shopParticles) {
		const x = Math.round(p.x);
		const y = Math.round(p.y);

		ctx.globalAlpha = p.alpha;
		ctx.fillStyle = p.ember ? "#00c5e8" : "#9b8d82";

		if (p.ember) {
			ctx.fillRect(x, y, 2, 1);
		} else if (p.shape === 0) {
			ctx.fillRect(x, y, 1, 1);
		} else if (p.shape === 1) {
			ctx.fillRect(x, y, 2, 1);
		} else {
			ctx.fillRect(x, y, 1, 2);
		}
	}
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(1,1);
	ctx.globalAlpha = 1;
}

function createShopParticle() {
	return {
		x: Math.random() * (dim_x / 2),
		y: Math.random() * 250,

		vx: (Math.random() - 0.5) * 0.15,
		vy: Math.random() * 0.2 + 0.05,

		alpha: Math.random() * 0.5 + 0.2,
		ember: Math.random() < 0.4,
		shape: Math.floor(Math.random() * 10+4)
	};
}

function updateShopParticles() {
	for (const p of shopParticles) {
		p.x += p.vx;
		p.y += p.vy;
		p.angle += p.rotationSpeed;

		p.x += Math.sin(p.y * 0.025) * 0.08;

		if (p.y > 260) {
			Object.assign(p, createShopParticle());
			p.y = -10;
		}

		if (p.x < -10) p.x = dim_x + 10;
		if (p.x > dim_x + 10) p.x = -10;
	}
}




function drawShopBackground(ctx) {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,dim_x,500);
    ctx.scale(2,2);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(fountainpng,0,-600);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(1,1);
    ctx.globalAlpha=1.;

    drawShopParticles(ctx);
}



function drawPixelOptionBox(
	ctx,
	label,
	x,
	y,
	width,
	height,
	selected,
	available
) {
	x = Math.round(x);
	y = Math.round(y);
	width = Math.round(width);
	height = Math.round(height);

	ctx.save();

	let outer;
	let inner;
	let text;

	if (!available && !selected) {
		outer = "#3c3c3c";
		inner = "#17110f";
		text = "#564a45";
	} else if (!available) {
		outer = "#4b3429";
		inner = "#17110f";
		text = "#665047";
    } else if (selected) {
		outer = "#ffd24a";
		inner = "#d94c00";
		text = "#170900";
	} else {
		outer = "#89481f";
		inner = "#17100d";
		text = "#b45211";
	}

	// Bordure extérieure
	ctx.fillStyle = outer;
	ctx.fillRect(x, y, width, height);

	// Bordure noire intermédiaire
	ctx.fillStyle = "#080504";
	ctx.fillRect(x + 2, y + 2, width - 4, height - 4);

	// Fond intérieur
	ctx.fillStyle = inner;
	ctx.fillRect(x + 4, y + 4, width - 8, height - 8);

	// Petits coins coupés
	ctx.fillStyle = "#080504";
	ctx.fillRect(x, y, 3, 3);
	ctx.fillRect(x + width - 3, y, 3, 3);
	ctx.fillRect(x, y + height - 3, 3, 3);
	ctx.fillRect(x + width - 3, y + height - 3, 3, 3);

	ctx.font = "20px PixelFont"; // idéalement une vraie police pixel
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = text;

	ctx.fillText(
		label,
		Math.round(x + width / 2),
		Math.round(y + height / 2)
	);

	ctx.restore();
}


function drawCharacterPlatform(ctx, x, y, width) {
	x = Math.round(x);
	y = Math.round(y);
	width = Math.round(width);

	// Ombre basse
	ctx.fillStyle = "#080403";
	ctx.fillRect(x, y, width, 5);

	// Centre
	ctx.fillStyle = "#422e2a";
	ctx.fillRect(x + 8, y - 106, width - 16, 230);


}



const boostParticles = [];

function spawnBoostParticle(x, y, width, height) {
	const side = Math.floor(Math.random() * 3);

	let px;
	let py;

	if (side === 0) {
		// Bord inférieur
		px = x + Math.random() * width;
		py = y + height;
	} else if (side === 1) {
		// Bord gauche
		px = x;
		py = y + Math.random() * height;
	} else {
		// Bord droit
		px = x + width;
		py = y + Math.random() * height;
	}

	boostParticles.push({
		x: Math.round(px),
		y: Math.round(py),

		vx: (Math.random() - 0.5) * 0.35,
		vy: -(Math.random() * 0.5 + 0.25),

		lifetime: Math.floor(Math.random() * 18 + 12),
		maxLifetime: 30,

		size: Math.random() < 0.7 ? 2 : 3
	});
}

function updateBoostParticles() {
	for (let i = boostParticles.length - 1; i >= 0; i--) {
		const p = boostParticles[i];

		p.x += p.vx;
		p.y += p.vy;
		p.lifetime--;

		if (p.lifetime <= 0) {
			boostParticles.splice(i, 1);
		}
	}
}

function drawBoostParticles(ctx) {
	for (const p of boostParticles) {
		const ratio = p.lifetime / p.maxLifetime;

		if (ratio > 0.65) {
			ctx.fillStyle = "#fff09a";
		} else if (ratio > 0.35) {
			ctx.fillStyle = "#ff9d19";
		} else {
			ctx.fillStyle = "#d83a00";
		}

		const size = ratio < 0.35 ? 1 : p.size;

		ctx.fillRect(
			Math.round(p.x),
			Math.round(p.y),
			size,
			size
		);
	}
}

function updateBoostedButton(x, y, width, height, boosted) {
	if (!boosted) return;

	if (Math.random() < 0.7) {
		spawnBoostParticle(x, y, width, height);
	}
}
