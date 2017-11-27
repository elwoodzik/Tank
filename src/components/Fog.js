import Rect from '../../lib/Rect';

class Fog extends Rect {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        this.zIndex = 100;
    }

    draw(dt) {
    
        this.context.globalCompositeOperation = 'destination-over';
        superDraw.call(this, dt);
      
    }
};
const superDraw = Rect.prototype.draw;

export default Fog;