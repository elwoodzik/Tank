import Image from '../../lib/Image';

class Bullet extends Image {

    constructor(game, options) {
        super(game, options);
        this.body.setAnchor(0.5, 0.5);
        this.create();
    }

    create() {
        this.toAngle = 90 * Math.PI / 180;

        this.zIndex = 8;

        this.lifeTime = 17;

        //this.body.setWorldBounds(true);

       // this.body.setWorldColider(true);
    }

    update(dt) {
        superUpdate.call(this, dt);
        this.lifeTime--;
        if (this.lifeTime <= 0) {
            this.game.ARR.bulletGroup.recycle(this);
        }
    }
};

const superUpdate = Image.prototype.update;

export default Bullet;