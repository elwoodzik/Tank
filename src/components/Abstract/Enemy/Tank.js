import Image from '../../../../lib/Image';

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

        this.directions = {
            forward: true,
            back: false
        }

        this.directionsTimes = {
            back: 75
        }

        this.rotateAngle = {
            dist: 80,
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
    }

    move() {
        const centerX = this.getCenter().x;
        const centerY = this.getCenter().y;

        const skeletonFront = {
            bottom: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, centerY, this.body.angle),
            bottomLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, centerY + this.halfHeight - 4, this.body.angle),
            bottomRight: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, this.y + 4, this.body.angle)
        }

        const skeletonBack = {
            topRight: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, centerY, this.body.angle),
            topLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, centerY + this.halfHeight - 4, this.body.angle),
            top: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, this.y + 4, this.body.angle),
        }


        if (this.game.VAR.map.getNextPosition(skeletonFront) && this.directions.forward) {
            if (this.speed <= this.maxSpeed) {
                this.speed += this.acc;
            }
        } else if (!this.rotateAngle.direction) {
            const dirs = ['left', 'right'];
            const rand = this.game.rand(0, 1);
            this.rotateAngle.direction = dirs[rand];
            this.directions.forward = false;

        }
        if (this.rotateAngle.current <= this.rotateAngle.dist && this.rotateAngle.direction) {
            if (this.rotateAngle.direction === 'left') {
                this.body.addAngle(1);
            } else {
                this.body.remAngle(1);
            }

            this.rotateAngle.current++;
        }
        else {
            this.directions.forward = true;
            this.rotateAngle.current = 0;
            this.rotateAngle.direction = false;
        }
        // if (this.game.VAR.map.getNextPosition(skeletonFront) && this.directions.forward) {
        //     if (this.speed <= this.maxSpeed) {
        //         this.speed += this.acc;
        //     }
        // } else if (!this.directions.back) {
        //     this.directions.forward = false;
        //     this.directions.back = true;

        //     this.speed = 0;
        // }

        // if (this.directions.back) {
        //     if (this.speed >= this.maxBackSpeed) {
        //         this.speed -= this.acc;
        //     }
        //     if (this.directionsTimes.back > 0) {
        //         this.directionsTimes.back--;
        //     } else {
        //         this.directions.back = false;
        //         this.directionsTimes.back = 75;
        //         const dirs = ['left', 'right'];
        //         const rand = this.game.rand(0, 1);
        //         this.rotateAngle[dirs[rand]] = true;
        //     }
        // }

        // if (this.rotateAngle.current <= this.rotateAngle.dist && this.rotateAngle.left) {
        //     this.body.addAngle(1);
        //     this.rotateAngle.current++;
        // } else if (this.rotateAngle.current <= this.rotateAngle.dist && this.rotateAngle.right) {
        //     this.body.remAngle(1);
        //     this.rotateAngle.current++;
        // }
        // else {
        //     this.directions.forward = true;
        //     this.rotateAngle.current = 0;
        //     this.rotateAngle.left = false;
        //     this.rotateAngle.right = false;
        // }


        this.body.velocity.x = Math.cos((this.body.angle)) * this.speed;
        this.body.velocity.y = Math.sin((this.body.angle)) * this.speed;
        // if (this.game.keyboard.trigger('W')) {
        //     if (this.game.VAR.map.getNextPosition(skeletonFront)) {
        //         if (this.speed <= this.maxSpeed) {
        //             this.speed += this.acc;
        //         }
        //     } else {
        //         this.speed = 0;
        //     }
        // } else if (this.game.keyboard.trigger('S')) {
        //     if (this.game.VAR.map.getNextPosition(skeletonBack)) {
        //         if (this.speed >= this.maxBackSpeed) {
        //             this.speed -= this.acc;
        //         }
        //     } else {
        //         this.speed = 0;
        //     }
        // }
        // else if (this.speed > 0 || this.speed < 0) {
        //     this.speed -= this.frictale * this.speed < 0 ? -1 : 1;

        //     if (this.speed === 0 || this.speed === 0.5) {
        //         this.speed = 0;
        //     }
        // }

        // if (this.game.keyboard.trigger('A')) {

        //     if (this.game.VAR.map.getNextPosition(skeletonFront)) {
        //         this.body.remAngle(1);
        //     }
        //     else {
        //         this.speed = 0;
        //     }
        // }
        // else if (this.game.keyboard.trigger('D')) {
        //     if (this.game.VAR.map.getNextPosition(skeletonFront)) {
        //         this.body.addAngle(1);
        //     }
        //     else {
        //         this.speed = 0;
        //     }
        // }

        // this.body.velocity.x = Math.cos((this.body.angle)) * this.speed;
        // this.body.velocity.y = Math.sin((this.body.angle)) * this.speed;

        // if (this.barrel) {
        //     this.barrel.x = this.x + this.barrel.marginX;
        //     this.barrel.y = this.y + this.barrel.marginY;
        // }

    }
};

const superUpdate = Image.prototype.update;
const superDraw = Image.prototype.draw;

export default Tank;