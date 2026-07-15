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
	for (const p of shopParticles) {
		ctx.save();

		ctx.globalAlpha = p.alpha;

		if (p.ember) {
			ctx.fillStyle = "#d96b24";
			ctx.shadowColor = "#ff6a00";
			ctx.shadowBlur = 5;
		} else {
			ctx.fillStyle = "#b8aaa0";
		}

		ctx.translate(p.x, p.y);
		ctx.rotate(p.angle);

		ctx.fillRect(
			-p.length / 2,
			-p.thickness / 2,
			p.length,
			p.thickness
		);

		ctx.restore();
	}
}

function createShopParticle() {
	const ember = Math.random() < 0.4;

	return {
		x: Math.random() * dim_x,
		y: Math.random() * 576,

		vx: Math.random() * 0.35 - 0.15,
		vy: Math.random() * 0.45 + 0.1,

		length: Math.random() * 5 + 2,
		thickness: Math.random() * 2 + 1,

		alpha: ember
			? Math.random() * 0.4 + 0.5
			: Math.random() * 0.4 + 0.3,

		angle: Math.random() * Math.PI,
		rotationSpeed: Math.random() * 0.02 - 0.01,

		ember
	};
}

function updateShopParticles() {
	for (const p of shopParticles) {
		p.x += p.vx;
		p.y += p.vy;
		p.angle += p.rotationSpeed;

		p.x += Math.sin(p.y * 0.025) * 0.08;

		if (p.y > 586) {
			Object.assign(p, createShopParticle());
			p.y = -10;
		}

		if (p.x < -10) p.x = dim_x + 10;
		if (p.x > dim_x + 10) p.x = -10;
	}
}

function drawShopBackground(ctx) {
    ctx.fillStyle = "#070403";
    ctx.fillRect(0, 0, dim_x, 576);

    const glow = ctx.createLinearGradient(0, 100, 0, 576);
    glow.addColorStop(0, "rgba(70, 15, 5, 0)");
    glow.addColorStop(1, "rgba(70, 15, 5, 0.8)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, dim_x, 576);

    drawShopParticles(ctx);
}