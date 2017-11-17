import Image from '../../lib/Image';

class Ship extends Image {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        //this.body.velocity.x = 200;
        this.body.setAnchor(0.5, 0.5);

        this.body.worldColider(true);
    }

    update(dt) {
        superUpdate.call(this, dt);

        if (this.game.keyboard.trigger('D')) {
            this.body.velocity.x = 200;
        }
        else if (this.game.keyboard.trigger('A')) {
            this.body.velocity.x = -200;
        }
        else if (this.game.keyboard.trigger('W')) {
            this.body.velocity.y = -200;
        }
        else if (this.game.keyboard.trigger('S')) {
            this.body.velocity.y = 200;
        }
    }
};

const superUpdate = Image.prototype.update;

export default Ship;