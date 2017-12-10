import Image from '../GameLib/Image';

class Tank extends Image {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        this.body.setAnchor(0.5, 0.5);
        this.speed = 0;
        this.maxSpeed = 120;
        this.maxBackSpeed = -50;
        this.acc = 0.5;
        this.frictale = 2;
        this.lifeMax = 5;
        this.life = this.lifeMax;
    }
};

export default Tank;