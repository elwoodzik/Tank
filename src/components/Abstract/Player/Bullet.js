import Image from '../../../../lib/Image';

class Bullet extends Image {

    constructor(game, options) {
        super(game, options);
        this.marginX = options.marginX || 0;
        this.marginY = options.marginY || 0;

        this.body.setAnchor(0.5, 0.5);
        this.create();
    }

    create() {
        this.zIndex = 8;
        this.startLifeTime = 17;
        this.speed = 1700;
    }

    draw(dt) {
        superDraw.call(this, dt);
    }

    update(dt) {
        superUpdate.call(this, dt);

        const centerX = this.getCenter().x;
        const centerY = this.getCenter().y;

        const skeleton = {
            front: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY, this.body.angle)
        }

        if (this.game.VAR.map.getNextPosition(skeleton) === 'solid') {
            this.spawExplosion();
            this.showFire();
            this.game.ARR.bulletGroup.recycle(this);
        }

        this.lifeTime--;

        if (this.lifeTime <= 0) {
            this.spawExplosion();
            this.game.ARR.bulletGroup.recycle(this);
        }

        this.game.physic.collide(this, this.game.ARR.enemyGroup.entities, (bullet, tank) => {
            this.spawExplosion();
            tank.life--;

            if (tank.life <= 0) {
                if (tank.barrel) {
                    this.showFire(tank.x + tank.halfWidth, tank.y, 0);
                    this.showFire(tank.x, tank.y, 0);
                    tank.body.velocity.x = 0;
                    tank.body.velocity.y = 0;
                    tank.barrel.destroy();
                    tank.barrel = null;
                    tank.changeImage('tank_destroy');
                    this.game.VAR.enemiesText.rem(1);
                }
            }
            this.game.ARR.bulletGroup.recycle(this);
        })
    }

    move(barrel) {
        this.lifeTime = this.startLifeTime;
        this.body.angle = barrel.body.angle;
        this.x = barrel.x + this.marginX + Math.cos(this.body.angle) * barrel.barrelLength;
        this.y = barrel.y + this.marginY + Math.sin(this.body.angle) * barrel.barrelLength;
        this.body.setVelocity(Math.cos(this.body.angle) * this.speed, Math.sin(this.body.angle) * this.speed);
    }

    showFire(x, y, angle) {
        const fire = this.game.ARR.fireGroup.spawn();

        if (fire) {
            fire.x = x || (this.getCenter().x - this.marginX);
            fire.y = y || (this.getCenter().y - this.marginY - 5);
            fire.body.angle = angle || 0;
        }
    }

    spawExplosion() {
        const explosion = this.game.ARR.explosionGroup.spawn();

        if (explosion) {
            explosion.x = this.x - this.marginX;
            explosion.y = this.y - this.marginY;
            explosion.body.angle = this.body.angle;
        }
    }
};

const superUpdate = Image.prototype.update;
const superDraw = Image.prototype.draw;

export default Bullet;