import Multiplayer from './lib/Multiplayer';
import GameObjectFactory from './GameLib/GameObjectFactory';
import Math from 'mathjs';
import Tank from './components/Tank';
import Barrel from './components/Barrel';

class Game {

    constructor(io) {
        this.gameObjects = [];
        this.playersObjects = {};

        this.add = new GameObjectFactory(this);

        this.initialize(io);
    }

    initialize(io) {
        this.multiplayer = new Multiplayer(io, this);

        this.multiplayer.socket.initializeSockets((socket) => {
            socket.on("game start", this.onGameStart.bind(this, socket));
            // socket.on

            socket.on("chatMessage", (msg) => {
                this.multiplayer.socket.emitToRoom('chatMessage', 'global', msg);
            })
            // tutaj sockety uzytkownika
            // socket.on(name,function) 

            // socket.on("start game", (room) => {
            //     this.multiplayer.rooms.close(room.name);
            //     this.multiplayer.socket.emitToRoom('start game', room.name, room);
            // });


            // socket.on("create room", (data, cb) => {
            //     this.multiplayer.rooms.create('test', 2);
            //     this.multiplayer.rooms.join('test', socket, (err, room, sock) => {
            //         if (err) {
            //             console.error(err);
            //             //callback(err);
            //         } else {
            //             console.log(this.multiplayer.rooms.rooms)
            //            // callback(false);
            //         }
            //     });
            //     //cb('dostalem dupe');

            // })
            //console.log(this.multiplayer.rooms.rooms)
        });
    }

    onGameStart(socket){
        this.gameLoop();
        this.emitExistObjects(socket);
        
        const sendData = {};

        const tank = new Tank(this, {
            key: 'tank32',
            socketId: socket.id,
            socket: socket,
            x: Math.round(Math.random(10)) * 32,
            y: Math.round(Math.random(10)) * 32,
        });

        const barrel = new Barrel(this, {
            key: 'barrel32',
            socketId: socket.id,
            socket: socket,
            x: tank.x,
            y: tank.y,
            marginX: 8,
            marginY: 1
        });

        sendData['Tank'] = this.removeGameObj(tank);
        sendData['Barrel'] = this.removeGameObj(barrel);

        this.multiplayer.socket.emitToRoom('game start', 'global', sendData);

        
    }

    emitExistObjects(socket) {
        const enemies = {};
        this.gameObjects.forEach((obj) => {
            enemies[obj.constructor.name] = this.removeGameObj(obj);
        })
        this.multiplayer.socket.emitToMe('add enemy', socket, enemies);
    }

    gameLoop() {
        let lastUpdate = Date.now();

        setInterval(() => {
            let now = Date.now();
            let dt = (now - lastUpdate ) / 1000;
            lastUpdate = now;
           
            this.update(dt);
        }, 1000 / 60);
    }

    update(dt) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(dt);
        }
    }

    removeGameObj(obj) {
        const newObj = {...obj};
        delete newObj.game;
        delete newObj.body.game;
        delete newObj.body.sprite;
        delete newObj.width;
        delete newObj.height;
        delete newObj.halfHeight;
        delete newObj.halfWidth;
        delete newObj.socket;
        // const newObj = {
        //     ...obj,
        //     game: null,
        //     socket: null,
        //     body: {
        //         ...obj.body,
        //         game: null,
        //         sprite: null
        //     }
        // };
        return newObj;
    }
}

export default Game;