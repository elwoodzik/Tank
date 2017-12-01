import io from 'socket.io-client';

class Socket {
 
    constructor(){

    }

    initialize(){
        this.socket = io.connect();
        this.onSocket('connected', function (err, msg) {
            if (err) {
                console.error(err);
            } else {
                console.log(msg);
            }
        });
    }

    onSocket(name, callback) {
        this.socket.removeAllListeners(name);

        if (typeof callback === 'function') {
            this.socket.on(name, callback);
        } else {
            throw 'Metoda przyjmuje dwa parametry. Nazwe Socketu (String) i callback (Function)';
        }
    }

    emit(name, data, callback) {
        if (!name) {
            throw 'musisz podac jako pierwszy parametr nazwe socketu';
        }
        this.socket.emit(name, data, callback);
    }
};
 
export default Socket;