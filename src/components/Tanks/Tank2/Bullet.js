import AbstractBullet from '../../Abstract/Player/Bullet';

class Bullet extends AbstractBullet {

    constructor(game) {
        super(game, {
            key: 'bullet',
            marginX: 11,
            marginY: 12
        });
    }
};

export default Bullet;
