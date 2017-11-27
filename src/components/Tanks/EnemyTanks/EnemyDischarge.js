import AbstractDischarge from '../../Abstract/Enemy/Discharge';

class Discharge extends AbstractDischarge {

    constructor(game) {
        super(game, {
            key: 'fireShot32'
        });
    }
};

export default Discharge;
