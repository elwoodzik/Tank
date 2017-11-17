import Image from '../../lib/Image';

class Discharge extends Image {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        this.body.setAnchor(0.5, 0.3);
        this.zIndex = 9;

        this.toAngle = 90 * Math.PI / 180;
        this.hide();
    }

    use(barrel) {
        const angle = barrel.body.angle + this.toAngle;
        this.body.angle = barrel.body.angle;
        this.x = (barrel.x + barrel.halfWidth - 13) + Math.cos(angle) * 60;
        this.y = (barrel.y + barrel.halfHeight * barrel.body.anchorY - 1) + Math.sin(angle) * 60;
        this.show();

        setTimeout(() => {
            this.hide();
        }, 30)
    }
};

export default Discharge;