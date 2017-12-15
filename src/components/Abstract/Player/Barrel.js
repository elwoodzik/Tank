import Image from '../../../../lib/Image';

const superUpdate = Image.prototype.update;
//const superDraw = Image.prototype.draw;

class Barrel extends Image {

    constructor(game, options) {
        super(game, options);
        this.marginX = options.marginX || 0;
        this.marginY = options.marginY || 0;
        this.x = this.x + this.marginX;
        this.y = this.y + this.marginY;
        this.create();
    }

    create() {
        this.barrelLength = 35; // zasieg lufy
        this.currentTimeToShot = 150; // obecny czas do wystrzalu
        this.shotTime = 150; // czas potrzebny by wystrzelic
        this.shotTimeAcc = 1; // predkosc ladowania pocisku

        this.body.setAnchor(0.3, 0.5);

        this.setIndex(10);




        // this.rectangle = this.game.add.rect({
        //     x: this.getCenter().x,
        //     y: this.getCenter().y,
        //     width: 500,
        //     height: 1
        // })
        //     .body.setAnchor(0, 0.8);

        // this.rectangle.body.addAngle(this.body.angle)
    }

    // draw(dt) {

    //     superDraw.call(this, dt);
    // }

    update(dt) {
        // superUpdate.call(this, dt);

        // this.body.rotateByMouse(0, true, 0.02);

        // this.game.mouse.trigger(null, false, this.shot, false);

        // this.reChargeShot();

        // const a = this.game.VAR.map.getPoint(this.getCenter().x - this.marginX - 2, this.getCenter().y - this.marginY, this.getCenter().x + this.halfWidth - 20, this.getCenter().y, this.body.angle);

        // if (this.rectangle) {
        //     this.rectangle.x = a.x;
        //     this.rectangle.y = a.y;
        //     this.rectangle.body.angle = this.body.angle;
        // }
    }

    shot = () => {
        if (this.currentTimeToShot >= this.shotTime) {
            this.discharge.use(this);

            const bullet = this.game.ARR.bulletGroup.spawn();

            if (bullet) {
                bullet.move(this);
            }
            this.currentTimeToShot = 0;
        }
    }

    reChargeShot() {
        if (this.currentTimeToShot < this.shotTime) {
            this.currentTimeToShot += this.shotTimeAcc;
        }
    }

    preAllocateBullets(count, ClassName) {
        if (!ClassName) {
            throw "Podaj drugi argument, Trzeba przekazac Classe jaka chce sie utworzyc";
        }

        this.game.ARR.bulletGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const bullet = new ClassName(this.game);

            this.game.ARR.bulletGroup.add(bullet, true);
        }
    }

    preAllocateExplosion(count, ClassName) {
        this.game.ARR.explosionGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const explosion = new ClassName(this.game);

            this.game.ARR.explosionGroup.add(explosion, true);
        }
    }
};
const superDraw = Image.prototype.draw;

export default Barrel;
