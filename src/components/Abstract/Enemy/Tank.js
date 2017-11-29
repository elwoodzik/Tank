import Image from '../../../../lib/Image';

class Tank extends Image {

    constructor(game, options) {
        super(game, options);

        this.create();
    }

    create() {
        this.body.setAnchor(0.5, 0.5);
        this.body.addAngle(this.game.rand(0, 350));

        this.speed = 0;
        this.maxSpeed = 80;
        this.maxBackSpeed = -10;
        this.acc = 0.5;
        this.frictale = 2;
        this.lifeMax = 1;
        this.life = this.lifeMax;
        this.lifeTimeAfterDestroy = 1000;

        this.directions = {
            forward: true,
            back: false,
            angle: true
        }

        this.directionsTimes = {
            back: 75
        }

        this.rotateAngle = {
            dist: 90,
            distOnMove: 27,
            current: 0,
            direction: false,
        }
    }

    // draw(dt) {
    //     // superDraw.call(this, dt);
    // }

    update(dt) {
        superUpdate.call(this, dt);

        this.move();

        if (this.barrel) {
            this.barrel.x = this.x + this.barrel.marginX;
            this.barrel.y = this.y + this.barrel.marginY;
        }
    }

    changeRotateOnStop(skeleton) {
        if (this.rotateAngle.current <= this.rotateAngle.dist) {
            this.rotateAngle.current++;
            if (this.rotateAngle.direction === 'left') {
                this.body.addAngle(1);
            } else {
                this.body.remAngle(1);
            }
            if (this.speed >= this.maxBackSpeed) {
                this.speed -= this.frictale;
            }
        }
        else if (this.game.VAR.map.getNextPosition(skeleton) === 'solid' || this.game.VAR.map.getNextPosition(skeleton) === 'flaying') {
            this.rotateAngle.current = 0;
        } else {
            this.directions.forward = true;
            this.directions.back = false;
            this.rotateAngle.direction = false;
            this.directions.angle = true;
        }
    }

    changeRotateOnMove(skeleton) {
        if (this.rotateAngle.current <= this.rotateAngle.distOnMove) {
            this.rotateAngle.current++;
            if (this.rotateAngle.direction === 'left') {
                this.body.addAngle(1);
            } else {
                this.body.remAngle(1);
            }
        }
        else if (this.game.VAR.map.getNextPosition(skeleton) === 'solid' || this.game.VAR.map.getNextPosition(skeleton) === 'flaying') {
            this.rotateAngle.current = 0;
        } else {
            this.rotateAngle.direction = false;
            this.directions.angle = true;
        }
    }

    getDirection() {
        const dirs = ['right', 'left'];
        const rand = this.game.rand(0, 1);
        this.rotateAngle.direction = dirs[rand];
    }

    moveStop() {
        this.directions.forward = false;
        this.directions.back = true;
        this.speed = 0;
    }

    moveAngle() {
        this.directions.angle = false;
    }

    moveForward() {
        if (this.speed <= this.maxSpeed) {
            this.speed += this.acc;
        }
    }

    move() {
        if (this.life > 0) {
            const centerX = this.getCenter().x;
            const centerY = this.getCenter().y;

            const skeletonFront = {
                bottom: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, centerY, this.body.angle),
                bottomLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, centerY + this.halfHeight - 4, this.body.angle),
                bottomRight: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, this.y + 4, this.body.angle)
            }

            const skeletonMask = {
                bottom: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY, this.body.angle),
                bottomLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY + this.halfHeight - 4, this.body.angle),
                bottomRight: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, this.y + 4, this.body.angle)
            }

            if (this.game.VAR.map.getNextPosition(skeletonMask) === 'empty' && this.directions.forward) {
                this.moveForward();
                if ((this.game.VAR.map.getNextPosition(skeletonFront) === 'solid' || this.game.VAR.map.getNextPosition(skeletonFront) === 'flaying') && this.directions.angle) {
                    this.directions.angle = false;
                    this.getDirection();
                } else if (this.rotateAngle.direction) {
                    this.changeRotateOnMove(skeletonFront);
                }
            } else if (!this.directions.back) {
                this.moveStop();
                this.getDirection();
            } else if (this.directions.back) {
                this.changeRotateOnStop(skeletonMask);
            }

            this.body.velocity.x = Math.cos((this.body.angle)) * this.speed;
            this.body.velocity.y = Math.sin((this.body.angle)) * this.speed;
        } else {
            this.lifeTimeAfterDestroy--;
            if (this.lifeTimeAfterDestroy <= 0) {
                this.game.ARR.enemyGroup.recycle(this);
            }
        }
    }
};

const superUpdate = Image.prototype.update;
//const superDraw = Image.prototype.draw;

export default Tank;