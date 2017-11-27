import _ObjectSettings from './_ObjectSettings';

class MapDrawLayers extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);
        this.game = game;
        this.mapImages = options.mapImages;
        this.zIndex = options.zIndex;
        this.type = 'layers';
        this.static = true;
        this.generateMask();
    }

    generateMask() {
        setTimeout(() => {
            let ctx = document.createElement("canvas").getContext("2d");
            ctx.canvas.width = 500;
            ctx.canvas.height = 500;



            this.imageMask = ctx.canvas;
        }, 1000)
        // 
    }

    drawFlashLightArc(radius, alpha) {
        this.context.globalAlpha = alpha;
        this.context.beginPath();
        this.context.arc(this.game.VAR.tank.getCenter().x - this.game.camera.xScroll, this.game.VAR.tank.getCenter().y - this.game.camera.yScroll, radius, 0, Math.PI * 2);
        this.context.fillStyle = 'black';
        this.context.fill();
        this.context.closePath();

    }
    drawFlashLight(x, y, alpha) {
        this.context.globalAlpha = alpha;
        this.context.fillStyle = 'black';
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(x, -y);
        this.context.lineTo(x, y);
        //context.closePath();

        this.context.fill();
        this.context.closePath();
        this.context.globalAlpha = 1;
    }

    draw(dt) {

        this.context.globalCompositeOperation = 'destination-over';
        this.drawFlashLightArc(110, 0.8);
        this.drawFlashLightArc(120, 0.3);
        this.drawFlashLightArc(130, 0.09);

        const a = this.game.VAR.map.getPoint(this.game.VAR.tank.barrel.getCenter().x - this.game.VAR.tank.barrel.marginX - 2, this.game.VAR.tank.barrel.getCenter().y - this.game.VAR.tank.barrel.marginY, this.game.VAR.tank.barrel.getCenter().x + this.game.VAR.tank.barrel.halfWidth - 20, this.game.VAR.tank.barrel.getCenter().y, this.game.VAR.tank.barrel.body.angle);

        this.context.translate(a.x - this.game.camera.xScroll, a.y - this.game.camera.yScroll);
        this.context.rotate(this.game.VAR.tank.barrel.body.angle);
        this.drawFlashLight(550, 200, 0.3)
        this.drawFlashLight(550, 220, 0.2)
        this.drawFlashLight(550, 240, 0.1)


        this.context.setTransform(1, 0, 0, 1, 0, 0);


        this.context.globalCompositeOperation = 'source-atop';

        if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
            this.context.save();
            this.context.globalAlpha = this.objAlfa;
        }

        this.context.drawImage(
            this.mapImages,
            this.game.camera.xScroll || 0,
            this.game.camera.yScroll || 0,
            this.game.width,
            this.game.height,
            0,
            0,
            this.game.width,
            this.game.height,
        )

        if (this.objAlfa !== 1) {
            this.context.restore();
        }
    }
};

export default MapDrawLayers;