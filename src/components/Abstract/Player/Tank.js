import Image from '../../../../lib/Image';

class Tank extends Image {

    constructor(game, options) {
        super(game, options);
        this.game = game;
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
        console.log(this.game.multiplayer.socket)
        this.game.multiplayer.socket.on('on move', this.onMove.bind(this));
    }

    draw(dt) {
        this.context.globalCompositeOperation = 'source-over';


        superDraw.call(this, dt);
        this.context.globalCompositeOperation = 'source-atop';
    }

    update(dt) {
        superUpdate.call(this, dt);

        this.move2();
    }

    onMove(data){
        this.x = data.x;
        this.y = data.y;
    }

    move2() {
        if (this.game.keyboard.trigger('W')) {
            this.game.multiplayer.emit("on move", { type: 'W' });
        }
    }

    move() {
        const centerX = this.getCenter().x;
        const centerY = this.getCenter().y;

        const skeletonFront = {
            bottom: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY, this.body.angle),
            bottomLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY + this.halfHeight - 4, this.body.angle),
            bottomRight: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, this.y + 4, this.body.angle)
        }

        const skeletonBack = {
            topRight: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, centerY, this.body.angle),
            topLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, centerY + this.halfHeight - 4, this.body.angle),
            top: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, this.y + 4, this.body.angle),
        }
        if (this.speed > 0) {
            if (this.game.VAR.map.getNextPosition(skeletonFront) === 'solid' || this.game.VAR.map.getNextPosition(skeletonFront) === 'flaying') {
                this.speed = 0;
            }
        }
        if (this.game.keyboard.trigger('W')) {
            if (this.game.VAR.map.getNextPosition(skeletonFront) === 'empty') {
                if (this.speed <= this.maxSpeed) {
                    this.speed += this.acc;
                }
            } else {
                this.speed = 0;
            }
        } else if (this.game.keyboard.trigger('S')) {
            if (this.game.VAR.map.getNextPosition(skeletonBack) === 'empty') {
                if (this.speed >= this.maxBackSpeed) {
                    this.speed -= this.acc;
                }
            } else {
                this.speed = 0;
            }
        }
        else if (this.speed > 0 || this.speed < 0) {
            this.speed -= this.frictale * this.speed < 0 ? -1 : 1;

            if (this.speed === 0 || this.speed === 0.5) {
                this.speed = 0;
            }
        }

        if (this.game.keyboard.trigger('A')) {

            if (this.game.VAR.map.getNextPosition(skeletonFront) === 'empty') {
                this.body.remAngle(1);
            }
            else {
                this.speed = 0;
            }
        }
        else if (this.game.keyboard.trigger('D')) {
            if (this.game.VAR.map.getNextPosition(skeletonFront) === 'empty') {
                this.body.addAngle(1);
            }
            else {
                this.speed = 0;
            }
        }

        this.body.velocity.x = Math.cos((this.body.angle)) * this.speed;
        this.body.velocity.y = Math.sin((this.body.angle)) * this.speed;

        if (this.barrel) {
            this.barrel.x = this.x + this.barrel.marginX;
            this.barrel.y = this.y + this.barrel.marginY;
        }
    }
};

const superUpdate = Image.prototype.update;
const superDraw = Image.prototype.draw;

export default Tank;