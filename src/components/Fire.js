import Sprite from '../../lib/Sprite';

class Fire extends Sprite {

    constructor(game, options) {
        super(game, {
            key: 'fire',
            x: 400,
            y: 400
        });
        this.create();
    }

    create() {
        this.zIndex = 17;
        this.body.setAnchor(0.5, 0.5);

        this.animations.add({
            key: 'fire',
            frames: [
                { 'sx': 0, 'sy': 0, 'fW': 16, 'fH': 32, },
                { 'sx': 16, 'sy': 0, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 2, 'sy': 0, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 3, 'sy': 0, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 4, 'sy': 0, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 5, 'sy': 0, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 6, 'sy': 0, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 7, 'sy': 0, 'fW': 16, 'fH': 32, },
                { 'sx': 0, 'sy': 32, 'fW': 16, 'fH': 32, },
                { 'sx': 16, 'sy': 32, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 2, 'sy': 32, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 3, 'sy': 32, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 4, 'sy': 32, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 5, 'sy': 32, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 6, 'sy': 32, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 7, 'sy': 32, 'fW': 16, 'fH': 32, },
                { 'sx': 0, 'sy': 32 * 2, 'fW': 16, 'fH': 32, },
                { 'sx': 16, 'sy': 32 * 2, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 2, 'sy': 32 * 2, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 3, 'sy': 32 * 2, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 4, 'sy': 32 * 2, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 5, 'sy': 32 * 2, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 6, 'sy': 32 * 2, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 7, 'sy': 32 * 2, 'fW': 16, 'fH': 32, },
                { 'sx': 0, 'sy': 32 * 3, 'fW': 16, 'fH': 32, },
                { 'sx': 16, 'sy': 32 * 3, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 2, 'sy': 32 * 3, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 3, 'sy': 32 * 3, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 4, 'sy': 32 * 3, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 5, 'sy': 32 * 3, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 6, 'sy': 32 * 3, 'fW': 16, 'fH': 32, },
                { 'sx': 16 * 7, 'sy': 32 * 3, 'fW': 16, 'fH': 32, }
            ]
        })

        this.animations.play(
            {
                key: 'fire',
                delay: 1,
                actionDelay: 10,
                action: () => {
                    this.game.ARR.fireGroup.recycle(this);
                }
            }
        );
    }
};

export default Fire;