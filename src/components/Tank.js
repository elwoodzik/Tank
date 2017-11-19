import Image from '../../lib/Image';
import Barrel from './Barrel';

class Tank extends Image {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        this.body.setAnchor(0.5, 0.5);
        this.speed = 1;

        this.barrel = new Barrel(this.game, {
            key: 'barrel32',
            x: this.x + 8,
            y: this.y + 1
        })

        this.rect = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 2,
            height: 2,
        })

        this.rect1 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 2,
            height: 2,
            fill: 'red'
        })

        this.rect2 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 2,
            height: 2,
            fill: 'red'
        })

        this.rect3 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 2,
            height: 2,
            fill: 'red'
        })

        this.rect4 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 2,
            height: 2,
            fill: 'red'
        })

        this.rect5 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 2,
            height: 2,
            fill: 'red'
        })
    }

    // draw(dt) {
    //     // superDraw.call(this, dt);
    //     // const tile = this.game.VAR.map.getPosition(this);
    //     // if (this.body.angle !== 0) {
    //     //     this.context.fillRect(0 + this.game.camera.xScroll, 0 + this.game.camera.yScroll, 64, 64)
    //     // } else {
    //     //     this.context.fillRect(tile.x - this.game.camera.xScroll, tile.y - this.game.camera.yScroll, 64, 64)
    //     // }

    // }
    update(dt) {
        superUpdate.call(this, dt);

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

        this.rect.x = skeletonBack.topRight.x;
        this.rect.y = skeletonBack.topRight.y;

        this.rect1.x = skeletonBack.topLeft.x;
        this.rect1.y = skeletonBack.topLeft.y;

        this.rect5.x = skeletonBack.top.x;
        this.rect5.y = skeletonBack.top.y;

        this.rect2.x = skeletonFront.bottomLeft.x;
        this.rect2.y = skeletonFront.bottomLeft.y;

        this.rect3.x = skeletonFront.bottomRight.x;
        this.rect3.y = skeletonFront.bottomRight.y;

        this.rect4.x = skeletonFront.bottom.x;
        this.rect4.y = skeletonFront.bottom.y;

        if (this.game.keyboard.trigger('W')) {
            if (this.game.VAR.map.getNextPosition(skeletonFront)) {
                this.x += Math.cos(this.body.angle) * this.speed;
                this.y += Math.sin(this.body.angle) * this.speed;
            } else {
                this.x -= Math.cos(this.body.angle) * 0.5;
                this.y -= Math.sin(this.body.angle) * 0.5;
            }
        }
        else if (this.game.keyboard.trigger('S')) {
            if (this.game.VAR.map.getNextPosition(skeletonBack)) {
                this.x -= Math.cos(this.body.angle) * 0.5;
                this.y -= Math.sin(this.body.angle) * 0.5;
            } else {
                this.x += Math.cos(this.body.angle) * 0.5;
                this.y += Math.sin(this.body.angle) * 0.5;
            }
        }

        if (this.game.keyboard.trigger('A')) {
            if (this.game.VAR.map.getNextPosition(skeletonFront)) {
                this.body.remAngle(1);
            }
        }
        else if (this.game.keyboard.trigger('D')) {
            if (this.game.VAR.map.getNextPosition(skeletonFront)) {
                this.body.addAngle(1);
            }
        }
        this.barrel.x = this.x + 8;
        this.barrel.y = this.y + 1;
    }
};

const superUpdate = Image.prototype.update;
const superDraw = Image.prototype.draw;

export default Tank;