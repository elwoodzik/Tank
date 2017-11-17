import Image from '../../lib/Image';
import Barrel from './Barrel';

class Tank extends Image {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        this.body.setAnchor(0.5, 0.5);
        this.body.setWorldColider(true);

        this.barrel = new Barrel(this.game, {
            key: 'barrel',
            x: this.x + 7,
            y: this.y + 14,
        })

        this.rect = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 6,
            height: 6,
        })

        this.rect1 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 6,
            height: 6,
            fill: 'red'
        })

        this.rect2 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 6,
            height: 6,
            fill: 'red'
        })


        this.rect3 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 6,
            height: 6,
            fill: 'red'
        })

        this.rect4 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 6,
            height: 6,
            fill: 'red'
        })

        this.rect5 = this.game.add.rect({
            x: this.x,
            y: this.y,
            width: 6,
            height: 6,
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
        const a = this.body.angle * 180 / Math.PI + 90;
        const centerX = this.getCenter().x;
        const centerY = this.getCenter().y;

        const skeletonBottom = {
            bottom: this.game.VAR.map.getPoint(centerX, centerY, centerX, this.y + this.height, this.body.angle),
            bottomLeft: this.game.VAR.map.getPoint(centerX, centerY, this.x + 6, this.y + this.height, this.body.angle),
            bottomRight: this.game.VAR.map.getPoint(centerX, centerY, this.x + this.width - 6, this.y + this.height, this.body.angle)
        }

        const skeletonTop = {
            topRight: this.game.VAR.map.getPoint(centerX, centerY, this.x + this.width - 6, this.y, this.body.angle),
            topLeft: this.game.VAR.map.getPoint(centerX, centerY, this.x + 6, this.y, this.body.angle),
            top: this.game.VAR.map.getPoint(centerX, centerY, centerX, this.y, this.body.angle),
        }

        this.rect.x = skeletonTop.topRight.x;
        this.rect.y = skeletonTop.topRight.y;

        this.rect1.x = skeletonTop.topLeft.x;
        this.rect1.y = skeletonTop.topLeft.y;

        this.rect5.x = skeletonTop.top.x;
        this.rect5.y = skeletonTop.top.y;

        this.rect2.x = skeletonBottom.bottomLeft.x;
        this.rect2.y = skeletonBottom.bottomLeft.y;

        this.rect3.x = skeletonBottom.bottomRight.x;
        this.rect3.y = skeletonBottom.bottomRight.y;

        this.rect4.x = skeletonBottom.bottom.x;
        this.rect4.y = skeletonBottom.bottom.y;

        if (this.game.keyboard.trigger('W')) {
            if (this.game.VAR.map.getNextPosition(skeletonBottom)) {
                this.x += Math.cos(a * Math.PI / 180) * 2;
                this.y += Math.sin(a * Math.PI / 180) * 2;
            } else {
                this.x -= Math.cos(a * Math.PI / 180) * 1;
                this.y -= Math.sin(a * Math.PI / 180) * 1;
            }
        }
        if (this.game.keyboard.trigger('S')) {
            if (this.game.VAR.map.getNextPosition(skeletonTop)) {
                this.x -= Math.cos(a * Math.PI / 180) * 1;
                this.y -= Math.sin(a * Math.PI / 180) * 1;
            } else {
                this.x += Math.cos(a * Math.PI / 180) * 1;
                this.y += Math.sin(a * Math.PI / 180) * 1;
            }
        }

        if (this.game.keyboard.trigger('A')) {
            if (this.game.VAR.map.getNextPosition(skeletonBottom)) {
                this.body.remAngle(1);
            }
        }
        if (this.game.keyboard.trigger('D')) {
            if (this.game.VAR.map.getNextPosition(skeletonBottom)) {
                this.body.addAngle(1);
            }
        }
        this.barrel.x = this.x + 7;
        this.barrel.y = this.y + 14;
    }


};

const superUpdate = Image.prototype.update;
const superDraw = Image.prototype.draw;

export default Tank;