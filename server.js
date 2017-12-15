import config from './config';
import path from 'path';
import bodyParser from 'body-parser';

import express from 'express';
import mongoose from 'mongoose';

import homePage from './routes/home';
import login from './routes/login';

import io from 'socket.io';
import Game from './srcServer/Game';

const server = express();

// mongoose.connect(config.mongodbUri, {
//     useMongoClient: true,
//     /* other options */
// });

process.env.NODE_ENV = 'production';

server.set('view engine', 'twig');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/', homePage);
server.use('/play', homePage);
server.use('/options', homePage);
server.post('/login', login);

//let a = new Game();
server.use(express.static('public'));

const sock_io = io.listen(server.listen(config.port, config.host, () => {
    console.info('Server listening on ' + config.host + ":" + config.port);
    new Game(sock_io);
}))

