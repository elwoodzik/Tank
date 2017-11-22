import Image from '../../../../lib/Image';

class Discharge extends Image {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        this.body.setAnchor(0.3, 0.5);
        this.dischargeLength = 30;
        this.zIndex = 9;
        this.hide();
    }

    use(barrel) {
        this.body.angle = barrel.body.angle;
        this.x = (barrel.x + 7) + Math.cos(barrel.body.angle) * this.dischargeLength;
        this.y = (barrel.y + barrel.halfHeight - 6 ) + Math.sin(barrel.body.angle) * this.dischargeLength;
        this.show();

        setTimeout(() => {
            this.hide();
        }, 30)
    }
};

export default Discharge;