import Image from '../GameLib/Image';

class Barrel extends Image {

    constructor(game, options) {
        super(game, options);
        this.marginX = options.marginX || 0;
        this.marginY = options.marginY || 0;
        this.create();
    }

    create() {
        this.barrelLength = 35; // zasieg lufy
        this.currentTimeToShot = 150; // obecny czas do wystrzalu
        this.shotTime = 150; // czas potrzebny by wystrzelic
        this.shotTimeAcc = 1; // predkosc ladowania pocisku

        this.body.setAnchor(0.3, 0.5);

        this.setIndex(10);
    }
};


export default Barrel;
