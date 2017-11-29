import Sprite from '../../../../lib/Sprite';

class Explosion extends Sprite {

    constructor(game, options) {
        super(game, {
            key: 'explo',
            x: 400,
            y: 400
        });
        this.create();
    }

    create() {
        this.zIndex = 18;
        this.body.setAnchor(0.5, 0.5);

        this.animations.add({
            key: 'destroy',
            frames: [
                { 'sx': 0, 'sy': 0, 'fW': 32, 'fH': 30, },
                { 'sx': 32, 'sy': 0, 'fW': 32, 'fH': 30, },
                { 'sx': 32 * 2, 'sy': 0, 'fW': 32, 'fH': 30, },
                { 'sx': 32 * 3, 'sy': 0, 'fW': 32, 'fH': 30, },
                { 'sx': 0, 'sy': 32, 'fW': 32, 'fH': 30, },
                { 'sx': 32, 'sy': 32, 'fW': 32, 'fH': 30, },
                { 'sx': 32 * 2, 'sy': 32, 'fW': 32, 'fH': 30, },
                { 'sx': 32 * 3, 'sy': 32, 'fW': 32, 'fH': 30, },
                { 'sx': 0, 'sy': 32 * 2, 'fW': 32, 'fH': 30, },
                { 'sx': 32, 'sy': 32 * 2, 'fW': 32, 'fH': 30, },
                { 'sx': 32 * 2, 'sy': 32 * 2, 'fW': 32, 'fH': 30, },
                { 'sx': 32 * 3, 'sy': 32 * 2, 'fW': 32, 'fH': 30, },
                { 'sx': 0, 'sy': 32 * 3, 'fW': 32, 'fH': 30, },
                { 'sx': 32, 'sy': 32 * 3, 'fW': 32, 'fH': 30, },
            ]
        })

        this.animations.play(
            {
                key: 'destroy',
                delay: 5,
                action: () => {
                    this.game.ARR.explosionGroup.recycle(this);
                }
            }
        );
    }
};

export default Explosion;