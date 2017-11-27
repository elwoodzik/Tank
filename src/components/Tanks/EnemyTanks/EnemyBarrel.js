import AbstractBarrel from '../../Abstract/Enemy/Barrel';
import Bullet from './EnemyBullet';

class Barrel extends AbstractBarrel {

    constructor(game, options) {
        super(game, options);

        this.newSettings();

        // this.discharge = new Discharge(this.game);

        this.preAllocateBullets(10, Bullet);

        // this.preAllocateExplosion(10, Explosion);
    }

    //  SĄ TO DOMYŚLNE USTAWIENIA, TUTAJ MOŻNA JE NADPISAĆ
    newSettings() {
        // this.barrelLength = 35; // zasieg lufy
        // this.currentTimeToShot = 150; // obecny czas do wystrzalu
        // this.shotTime = 150; // czas potrzebny by wystrzelic
        // this.shotTimeAcc = 1; // predkosc ladowania pocisku

        // this.body.setAnchor(0.3, 0.5);
    }
};

export default Barrel;
