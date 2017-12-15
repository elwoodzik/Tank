import Image from '../GameLib/Image';
import Barrel from './Barrel';

class Tank extends Image {

    constructor(game, options) {
        super(game, options);
        this.game = game;

        this.create();
        
    }

    create() {
        this.body.setAnchor(0.5, 0.5);
        this.speed = 0;
        this.maxSpeed = 120;
        this.maxBackSpeed = -50;
        this.acc = 0.5;
        this.frictale = 2;
        this.lifeMax = 5;
        this.life = this.lifeMax;

        this.isTrigger = false;

        this.socket.on("on move", this.onTriggerKey.bind(this));
    }

    update(dt) {
        superUpdate.call(this, dt);
        this.move();
        this.isTrigger = false;
    }

    onTriggerKey(data){
        this.isTrigger = data.type;
    }

    move(){
        if(this.isTrigger === 'W'){
            if (this.speed <= this.maxSpeed) {
                this.speed += this.acc;
            }
        }else if (this.speed > 0 || this.speed < 0) {
            this.speed -= this.frictale * this.speed < 0 ? -1 : 1;

            if (this.speed === 0 || this.speed === 0.5) {
                this.speed = 0;
            }
        }
    
        this.body.velocity.x = Math.cos((this.body.angle)) * this.speed;
        this.body.velocity.y = Math.sin((this.body.angle)) * this.speed;

        if(this.speed > 0 || this.speed < 0){
          this.game.multiplayer.socket.emitToRoom("on move", 'global', {x: this.x , y:this.y});
        }
    }
};

const superUpdate = Image.prototype.update;

export default Tank;