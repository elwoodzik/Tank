/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Leya = __webpack_require__(1);

	var _Leya2 = _interopRequireDefault(_Leya);

	var _Menu = __webpack_require__(25);

	var _Menu2 = _interopRequireDefault(_Menu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	    function Game() {
	        _classCallCheck(this, Game);

	        var gameWidth = 1280;
	        var gameHeight = 720;
	        var orientation = false; //false -> vertical, true -> horizontal (obecnie 'horizontal' jest nie obslugiwany!!!)
	        var scallable = true;
	        var mobile = false;

	        new _Leya2.default(gameWidth, gameHeight, orientation, scallable, mobile, this.preload, this.create);
	    }

	    _createClass(Game, [{
	        key: 'preload',
	        value: function preload() {
	            return {
	                'water': '/images/water.png',
	                'ship': '/images/ship.png',
	                'coins': '/images/coins.png',
	                'tank': '/images/tank.png',
	                'barrel': '/images/barrel.png',
	                'fireShot': '/images/fireShot.png',
	                'bullet': '/images/bullet.png',
	                'tileset': '/images/tileset.png',
	                'test': '/images/test.png',
	                'rpg': '/images/rp.png',
	                'rpg64': '/images/rp64.png',
	                'tank32': '/images/tank_32.png',
	                'tank_enemy32': '/images/tank_enemy_32.png',
	                'barrel32': '/images/barrel_32.png',
	                'fireShot32': '/images/fireShot_32.png',
	                'explo': '/images/explo.png',
	                'barrel128': '/images/barrel128.png',
	                'tank128': '/images/tank128.png'
	            };
	        }
	    }, {
	        key: 'create',
	        value: function create(game) {
	            game.mouse.initialize();
	            game.keyboard.initialize();

	            game.state.add('Menu', _Menu2.default);
	            game.state.start('Menu');
	        }
	    }]);

	    return Game;
	}();

	;

	exports.default = new Game();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AssetManager = __webpack_require__(2);

	var _AssetManager2 = _interopRequireDefault(_AssetManager);

	var _Mobile = __webpack_require__(3);

	var _Mobile2 = _interopRequireDefault(_Mobile);

	var _GameStateFactory = __webpack_require__(4);

	var _GameStateFactory2 = _interopRequireDefault(_GameStateFactory);

	var _GameObjectFactory = __webpack_require__(5);

	var _GameObjectFactory2 = _interopRequireDefault(_GameObjectFactory);

	var _Physic = __webpack_require__(22);

	var _Physic2 = _interopRequireDefault(_Physic);

	var _Mouse = __webpack_require__(23);

	var _Mouse2 = _interopRequireDefault(_Mouse);

	var _Keyboard = __webpack_require__(24);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var elapsed = 0;
	var last = 0;
	var step = 1 / 60;

	var Leya = function () {
	    function Leya(width, height, orientation, scallable, mobile, preload, create) {
	        _classCallCheck(this, Leya);

	        this.gameObjects = [];

	        this.states = {};

	        this.width = width;

	        this.height = height;

	        this.orientation = orientation;

	        this.create = create;

	        this.preload = preload;

	        this.VAR = {};

	        this.ARR = {};

	        this.CLASS = {};

	        this.camera = {
	            xScroll: 0,
	            yScroll: 0
	        };

	        this.useFpsCounter = false;

	        this.renderer = true;

	        this.mobile = new _Mobile2.default(this, mobile);

	        this.state = new _GameStateFactory2.default(this);

	        this.add = new _GameObjectFactory2.default(this);

	        this.physic = new _Physic2.default(this);

	        this.mouse = new _Mouse2.default(this);

	        this.keyboard = new _Keyboard2.default(this);

	        this.createCanvas(width, height, orientation);

	        this.scallable(scallable);

	        this.preloaded();
	    }

	    _createClass(Leya, [{
	        key: 'preloaded',
	        value: function preloaded() {
	            _AssetManager2.default.load(this.preload(), this.loaded.bind(this), function (loaded, total, key, path, success) {
	                return console.log(loaded, total, key, path, success);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render(dt) {
	            if (this.renderer) {
	                this.clearCanvas(this.ctx);
	                this.fadeOutHandler();
	                this.fadeInHandler();

	                for (var i = 0, iMax = this.gameObjects.length; i < iMax; i++) {
	                    var entityRender = this.gameObjects[i];
	                    if (entityRender && entityRender.draw && entityRender.contextType === 'main' && entityRender.used) {

	                        if (!entityRender.isOutOfScreen) {
	                            if (entityRender.body && entityRender.body.angle != 0) {
	                                //this.ctx.save();
	                                this.ctx.translate(entityRender.x - this.camera.xScroll + entityRender.width * entityRender.body.anchorX, entityRender.y - this.camera.yScroll + entityRender.height * entityRender.body.anchorY);
	                                this.ctx.rotate(entityRender.body.angle);
	                                //this.ctx.translate(-entityRender.x + this.camera.xScroll - entityRender.width * entityRender.body.anchorX, -entityRender.y + this.camera.yScroll - entityRender.height * entityRender.body.anchorY);
	                            }

	                            entityRender.draw(dt);

	                            if (entityRender.body && entityRender.body.angle != 0) {
	                                // this.ctx.restore();
	                                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	                            }
	                        }
	                    }
	                    entityRender = null;
	                }
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            for (var u = 0, uMax = this.gameObjects.length; u < uMax; u++) {
	                var entityUpdate = this.gameObjects[u];

	                if (entityUpdate && entityUpdate.update && entityUpdate.used) {
	                    if (entityUpdate.updateOfScreen) {
	                        entityUpdate.update(dt);
	                    } else if (!entityUpdate.updateOfScreen && !entityUpdate.isOutOfScreen) {
	                        entityUpdate.update(dt);
	                    }
	                }
	                entityUpdate = null;
	            }
	            if (this.currentState && typeof this.currentState.update === 'function') {
	                this.currentState.update(dt);
	            }
	        }
	    }, {
	        key: 'animationLoop',
	        value: function animationLoop(timestamp) {
	            if (this.useFpsCounter) {
	                this.fpsmeter.tickStart();
	            }

	            if (!timestamp) {
	                timestamp = 0;
	                last = 0;
	            }

	            elapsed = elapsed + Math.min(1, (timestamp - last) / 1000);

	            while (elapsed >= step) {
	                this.capturePreviousPositions(this.gameObjects);

	                this.update(step);

	                elapsed -= step;
	            }

	            this.render(elapsed);

	            last = timestamp;

	            if (this.useFpsCounter) {
	                this.fpsmeter.tick();
	            }

	            window.requestAnimationFrame(this.animationLoop.bind(this));
	        }
	    }, {
	        key: 'createCanvas',
	        value: function createCanvas(width, height, orientation) {
	            this.canvas = document.createElement('canvas');
	            this.ctx = this.canvas.getContext("2d");
	            this.screenWidth = width || 960;
	            this.screenHeight = height || 540;
	            this.portViewWidth = width;
	            this.portViewHeight = height;
	            this.orientation = orientation || false;
	            this.canvas.style.zIndex = 5;
	            this.canvas.id = "main";
	            this.canvas.width = this.screenWidth;
	            this.canvas.height = this.screenHeight;

	            this.canvas.style.width = this.canvas.width + "px";
	            this.canvas.style.height = this.canvas.height + "px";

	            if (!this.mobile.active) {
	                this.canvas.style.position = 'absolute';
	                this.canvas.style.left = '50%';
	                this.canvas.style.marginLeft = -this.canvas.width / 2 + "px";
	                this.scale1 = 1;
	            }

	            document.body.style.overflow = 'hidden';

	            document.body.appendChild(this.canvas);

	            this.animationLoop();
	        }
	    }, {
	        key: 'scallable',
	        value: function scallable(bool) {
	            var _this = this;

	            this.scaleUsed = bool;
	            this.resizeCanvas(this.canvas, this.orientation);

	            if (this.bgcanvas) {
	                this.resizeCanvas(this.bgcanvas, this.orientation);
	            }
	            if (this.onbgcanvas) {
	                this.resizeCanvas(this.onbgcanvas, this.orientation);
	            }
	            window.removeEventListener("resize", function () {
	                return _this.scallableFunction();
	            });
	            if (bool) {
	                window.addEventListener("resize", function () {
	                    return _this.scallableFunction();
	                });
	            }
	        }
	    }, {
	        key: 'scallableFunction',
	        value: function scallableFunction() {
	            this.resizeCanvas(this.canvas, this.orientation);

	            if (this.bgcanvas) {
	                this.resizeCanvas(this.bgcanvas, this.orientation);
	            }
	            if (this.onbgcanvas) {
	                this.resizeCanvas(this.onbgcanvas, this.orientation);
	            }
	        }
	    }, {
	        key: 'resizeCanvas',
	        value: function resizeCanvas(canvas, orientation) {
	            if (!orientation) {
	                var w = window.innerWidth;
	                var h = window.innerHeight;

	                this.portViewWidth = this.portViewWidth;
	                this.portViewHeight = this.portViewHeight;

	                if (this.scaleUsed) {
	                    this.scale1 = Math.max(0.2, Math.min(Math.min(w, w) / this.screenWidth, Math.min(h, h) / this.screenHeight));

	                    var width = Math.min(Math.floor(this.screenWidth * this.scale1), w);
	                    var height = Math.min(Math.floor(this.screenHeight * this.scale1), h);

	                    canvas.style.width = width + "px";
	                    canvas.style.height = height + "px";

	                    if (!this.mobile.active) {
	                        canvas.style.position = 'absolute';
	                        canvas.style.left = '50%';
	                        canvas.style.marginLeft = -width / 2 + "px";
	                    }
	                } else {
	                    this.scale1 = 1;
	                    canvas.style.width = this.portViewWidth + "px";
	                    canvas.style.height = this.portViewHeight + "px";
	                    if (!this.mobile.active) {
	                        canvas.style.position = 'absolute';
	                        canvas.style.left = '50%';
	                        canvas.style.marginLeft = -this.screenWidth / 2 + "px";
	                    }
	                }
	            } else {
	                var _w = window.innerHeight;
	                var _h = window.innerWidth;

	                this.portViewWidth = this.portViewHeight;
	                this.portViewHeight = this.portViewWidth;

	                this.scale1 = Math.max(0.2, Math.min(_w / this.screenWidth, _h / this.screenHeight));

	                var _width = Math.floor(this.screenWidth * this.scale1);
	                var _height = Math.floor(this.screenHeight * this.scale1);

	                canvas.style.width = _height + "px";
	                canvas.style.height = _width + "px";
	            }
	        }
	    }, {
	        key: 'sortByIndex',
	        value: function sortByIndex() {
	            this.gameObjects.sort(function (obj1, obj2) {
	                if (!obj1.zIndex) {
	                    obj1.zIndex = 1;
	                }

	                if (obj1.zIndex > obj2.zIndex) return 1;else if (obj1.zIndex < obj2.zIndex) {
	                    return -1;
	                } else {
	                    return 0;
	                }
	            });
	        }
	    }, {
	        key: 'rand',
	        value: function rand(min, max) {
	            return Math.floor(Math.random() * (max - min + 1)) + min;
	        }
	    }, {
	        key: 'randF',
	        value: function randF(min, max) {
	            return Math.random() * (max - min + 1) + min;
	        }
	    }, {
	        key: 'saveData',
	        value: function saveData(name, data) {
	            localStorage.setItem(name, JSON.stringify(data));
	        }
	    }, {
	        key: 'saveDataAd',
	        value: function saveDataAd(name, data) {
	            var oldItems = this.loadData(name) || [];
	            oldItems.push(data);

	            localStorage.setItem(name, JSON.stringify(oldItems));
	        }
	    }, {
	        key: 'loadData',
	        value: function loadData(name) {
	            var data = localStorage.getItem(name);
	            //
	            if (data) {
	                return JSON.parse(data);
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'removeData',
	        value: function removeData(name) {
	            localStorage.removeItem(name);
	        }
	    }, {
	        key: 'shuffle',
	        value: function shuffle(arr) {
	            var counter = arr.length;
	            var tmp = void 0;
	            var index = void 0;
	            while (counter > 0) {
	                counter--;
	                index = Math.floor(Math.random() * counter);
	                //
	                tmp = arr[counter];
	                //
	                arr[counter] = arr[index];
	                //
	                arr[index] = tmp;
	            }
	            return arr;
	        }
	    }, {
	        key: 'clearCanvas',
	        value: function clearCanvas(context) {
	            context.clearRect(0, 0, this.width, this.height);
	        }
	    }, {
	        key: 'capturePreviousPositions',
	        value: function capturePreviousPositions(entities) {
	            for (var u = 0, uMax = entities.length; u < uMax; u++) {
	                var entityCapture = entities[u];
	                if (entityCapture.used && entityCapture.body && entityCapture.body.angle === 0) {
	                    entityCapture.previousX = entityCapture.x;
	                    entityCapture.previousY = entityCapture.y;
	                    if (entityCapture.body) {
	                        entityCapture.body.previousAngle = entityCapture.angle;
	                    }
	                }
	                entityCapture = null;
	            }
	        }
	    }, {
	        key: 'setPortView',
	        value: function setPortView(width, height) {
	            if (!this.orientation) {
	                this.portViewWidth = width;
	                this.portViewHeight = height;
	            } else {
	                this.portViewWidth = height;
	                this.portViewHeight = width;
	            }
	        }
	    }, {
	        key: 'loaded',
	        value: function loaded() {
	            return this.create(this);
	        }
	    }, {
	        key: 'fadeOut',
	        value: function fadeOut(time, key, callback) {
	            this.ctx.globalAlpha = 1;
	            this.timerFade = time;
	            this.currentTimerFade = time;
	            this.timerCallback = callback;
	            this.timerFadeOutActive = true;
	            this.timerFadeInActive = false;
	            if (this.mouse) {
	                this.mouse.used = false;
	            }
	        }
	    }, {
	        key: 'fadeIn',
	        value: function fadeIn(time, callback) {
	            this.timerFade = time;
	            this.currentTimerFade = 0;
	            this.timerCallback = callback;
	            this.timerFadeInActive = true;
	        }
	    }, {
	        key: 'fadeOutHandler',
	        value: function fadeOutHandler() {
	            if (this.timerFadeOutActive) {
	                this.currentTimerFade -= 1 / 60 * 1000;
	                this.ctx.globalAlpha = this.currentTimerFade / this.timerFade;

	                if (this.currentTimerFade <= 0) {
	                    this.ctx.globalAlpha = 0;
	                    this.timerFadeOutActive = false;
	                    if (typeof this.timerCallback === 'function') {
	                        return this.timerCallback.call();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'showFPS',
	        value: function showFPS() {
	            this.fpsmeter = new FPSMeter({ decimals: 0, graph: false, theme: 'dark', left: '5px' });
	            this.useFpsCounter = true;
	        }
	    }, {
	        key: 'fadeInHandler',
	        value: function fadeInHandler() {
	            if (this.timerFadeInActive) {
	                this.currentTimerFade += 1 / 60 * 1000;
	                this.ctx.globalAlpha = this.currentTimerFade / this.timerFade;
	                if (this.currentTimerFade > this.timerFade) {
	                    this.timerFadeInActive = false;
	                    this.ctx.globalAlpha = 1;
	                    if (this.mouse) {
	                        this.mouse.used = true;
	                    }
	                    if (typeof this.timerCallback === 'function') {
	                        return this.timerCallback.call();
	                    }
	                }
	            }
	        }
	    }]);

	    return Leya;
	}();

	;

	exports.default = Leya;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AssetManager = function () {
	    function AssetManager(placeholderDataUri) {
	        _classCallCheck(this, AssetManager);

	        this._assets = {};

	        if (placeholderDataUri) {
	            this._placeholder = new Image();
	            this._placeholder.src = placeholderDataUri;
	        }

	        this.sounds = true;
	    }

	    _createClass(AssetManager, [{
	        key: "load",
	        value: function load(images, onDone, onProgress) {
	            // Kolejka obrazków
	            var queue = [];
	            for (var im in images) {
	                queue.push({
	                    key: im,
	                    path: images[im]
	                });
	            }

	            if (queue.length === 0) {
	                onProgress && onProgress(0, 0, null, null, true);
	                onDone && onDone();
	                return;
	            }

	            var itemCounter = {
	                loaded: 0,
	                total: queue.length
	            };

	            for (var i = 0; i < queue.length; i++) {
	                this._loadItem(queue[i], itemCounter, onDone, onProgress);
	            }
	        }
	    }, {
	        key: "_loadItem",
	        value: function _loadItem(queueItem, itemCounter, onDone, onProgress) {
	            var _this = this;

	            if (queueItem.path.slice(-3) === "jpg" || queueItem.path.slice(-3) === "png" || queueItem.path.slice(-4) === "jpeg" || queueItem.path.slice(-3) === "gif" || queueItem.path.slice(-3) === "JPG" || queueItem.path.slice(-3) === "PNG" || queueItem.path.slice(-3) === "GIF") {

	                var img = new Image();

	                img.onload = function () {
	                    _this._assets[queueItem.key] = img;
	                    _this._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
	                };

	                img.onerror = function () {
	                    _this._assets[queueItem.key] = _this._placeholder ? _this._placeholder : null;
	                    _this._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
	                };

	                img.src = queueItem.path;
	            } else if (queueItem.path.slice(-3) === "mp3" || queueItem.path.slice(-3) === "ogg" || queueItem.path.slice(-3) === "wav") {
	                createjs.Sound.registerSound(queueItem.path, queueItem.key, 0);
	                this._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
	            } else {
	                console.error('plik ' + queueItem.path + ' nie zostal zaladowany!');
	            }
	        }
	    }, {
	        key: "_onItemLoaded",
	        value: function _onItemLoaded(queueItem, itemCounter, onDone, onProgress, success) {
	            itemCounter.loaded++;
	            onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
	            if (itemCounter.loaded == itemCounter.total) {
	                onDone && onDone();
	            }
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            return this._assets[key];
	        }
	    }, {
	        key: "getSrc",
	        value: function getSrc(key) {
	            return this._assets[key].src;
	        }
	    }, {
	        key: "play",
	        value: function play(key) {
	            if (this.sounds) {
	                createjs.Sound.play(key);
	            }
	        }
	    }, {
	        key: "stop",
	        value: function stop(key) {
	            this._assets[key].pause();
	            this._assets[key].currentTime = 0;
	            createjs.Sound.stop(key);
	        }
	    }, {
	        key: "useSounds",
	        value: function useSounds(bool) {
	            if (typeof bool !== 'boolean') {
	                return console.error('Metoda "useSounds" wymaga podania argumentu: True / False');
	            }

	            this.sounds = bool;
	            return this.sounds;
	        }
	    }, {
	        key: "preload",
	        value: function preload() {
	            this.canvas = document.createElement("canvas");
	            this.ctx = this.canvas.getContext("2d");
	            this.canvas.width = 500;
	            this.canvas.height = 300;
	            this.canvas.id = 'preload';

	            this.canvas.style.position = 'absolute';
	            this.canvas.style.left = '50%';
	            this.canvas.style.marginLeft = -this.canvas.width / 2 + "px";

	            document.body.style.overflow = 'hidden';

	            document.body.appendChild(this.canvas);
	        }
	    }, {
	        key: "preloadOnProgress",
	        value: function preloadOnProgress(loaded, total) {
	            if (this.canvas) {
	                var currentProgress = loaded / total * 400;
	                if (loaded === 1) {
	                    this.ctx.font = "30px Arial";
	                    this.ctx.fillStyle = 'orange';
	                    this.ctx.fillText("Ładowanie", 180, 60);
	                }
	                this.ctx.beginPath();
	                this.ctx.strokeStyle = 'orange';
	                this.ctx.rect(50, 80, 400, 30);
	                this.ctx.stroke();
	                this.ctx.closePath();

	                this.ctx.fillStyle = 'green';
	                this.ctx.fillRect(51, 81, currentProgress - 1, 28);
	                //

	                this.ctx.clearRect(200, 120, 500, 300);
	                this.ctx.font = "30px Arial";
	                this.ctx.fillStyle = 'orange';
	                this.ctx.fillText(Math.floor(currentProgress / 4) + "%", 230, 150);

	                if (loaded === total) {
	                    var child = document.getElementById("preload");
	                    document.body.removeChild(child);
	                }
	            }
	        }
	    }]);

	    return AssetManager;
	}();

	exports.default = new AssetManager();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mobile = function () {
	    function Mobile(game, mobile) {
	        _classCallCheck(this, Mobile);

	        this.game = game;
	        this.active = mobile;
	        this.platform = this.getMobileOperatingSystem();
	    }

	    _createClass(Mobile, [{
	        key: "getMobileOperatingSystem",
	        value: function getMobileOperatingSystem() {
	            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	            // Windows Phone must come first because its UA also contains "Android"
	            if (/windows phone/i.test(userAgent)) {
	                return "mobile"; // "Windows Phone";
	            }

	            if (/android/i.test(userAgent)) {
	                return "mobile"; // "Android";
	            }

	            // iOS detection from: http://stackoverflow.com/a/9039885/177710
	            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
	                return "mobile"; // "iOS";
	            }

	            return "desktop";
	        }
	    }]);

	    return Mobile;
	}();

	exports.default = Mobile;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameStateFactory = function () {
	    function GameStateFactory(game) {
	        _classCallCheck(this, GameStateFactory);

	        this.game = game;
	    }

	    _createClass(GameStateFactory, [{
	        key: 'add',
	        value: function add(key, stateObject) {
	            this.game.states[key] = stateObject;
	        }
	    }, {
	        key: 'start',
	        value: function start(key, options) {
	            var _this = this;

	            if (!options) {
	                options = {};
	            }
	            if (key === 'Logo') {
	                this.game.gameObjects.length = 0;
	                // this.game.gameObjectsStatic.length = 0;
	                // this.game.gameObjectsOnStatic.length = 0;
	                this.game.camera.xScroll = 0;
	                this.game.camera.yScroll = 0;
	                this.game.VAR = {};
	                this.game.ARR = {};
	                this.game.currentState = null;
	                this.game.currentState = new this.game.states[key](this.game, 'aaa');

	                if (this.game.currentState.create) {
	                    this.game.currentState.create.apply(this.game);
	                    if (this.game.bgctx) {
	                        this.game.renderStatic();
	                    }
	                    if (this.game.onbgctx) {
	                        this.game.renderOnStatic();
	                    }
	                    this.game.sortByIndex();
	                } else {
	                    throw "Brakuje metody create w scenie " + key;
	                }
	            } else {
	                this.game.fadeOut(options.fadeOut || 400, key, function () {
	                    _this.game.gameObjects.length = 0;
	                    // this.game.gameObjectStatic.length = 0;
	                    // this.game.gameObjectOnStatic.length = 0;
	                    _this.game.camera.xScroll = 0;
	                    _this.game.camera.yScroll = 0;
	                    _this.game.VAR = {};
	                    _this.game.ARR = {};
	                    _this.game.currentState = null;
	                    if (_this.game.states[key]) {
	                        _this.game.currentState = new _this.game.states[key](_this.game);
	                    } else {
	                        return console.error('Nie ma stanu o takiej nazwie: ' + key + '\nDostepne stany:\n' + _this.getAllStates());
	                    }

	                    if (_this.game.currentState.create) {
	                        // this.game.currentState.create.call(this.game, options.data);
	                        _this.game.currentState.create(options.data);
	                        if (_this.game.bgctx) {
	                            _this.game.renderStatic();
	                        }
	                        if (_this.game.onbgctx) {
	                            _this.game.renderOnStatic();
	                        }
	                        _this.game.sortByIndex();

	                        setTimeout(function () {
	                            if (!_this.game.timerFadeOutActive) {
	                                _this.game.fadeIn(options.fadeIn || 400, null);
	                            }
	                        }, 300);
	                    } else {
	                        throw "Brakuje metody create w scenie " + key;
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'getAllStates',
	        value: function getAllStates() {
	            return Object.keys(this.game.states);
	        }
	    }]);

	    return GameStateFactory;
	}();

	;

	exports.default = GameStateFactory;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	// import TileSprite from './TileSprite';

	// import DialogImg from './DialogImg';
	// import Particles from './Particles';
	// import ButtonImg from './ButtonImg';
	// import Grid from './Grid';
	// import Multiplayer from './Multiplayer';


	var _Sprite = __webpack_require__(6);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	var _Image = __webpack_require__(10);

	var _Image2 = _interopRequireDefault(_Image);

	var _Rect = __webpack_require__(11);

	var _Rect2 = _interopRequireDefault(_Rect);

	var _Text = __webpack_require__(12);

	var _Text2 = _interopRequireDefault(_Text);

	var _Button = __webpack_require__(13);

	var _Button2 = _interopRequireDefault(_Button);

	var _Bar = __webpack_require__(14);

	var _Bar2 = _interopRequireDefault(_Bar);

	var _Camera = __webpack_require__(15);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _Dialog = __webpack_require__(17);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _Group = __webpack_require__(18);

	var _Group2 = _interopRequireDefault(_Group);

	var _Map = __webpack_require__(20);

	var _Map2 = _interopRequireDefault(_Map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameObjectFactory = function () {
	    function GameObjectFactory(game) {
	        _classCallCheck(this, GameObjectFactory);

	        this.game = game;
	    }

	    _createClass(GameObjectFactory, [{
	        key: 'sprite',
	        value: function sprite(options) {
	            return new _Sprite2.default(this.game, options);
	        }
	    }, {
	        key: 'image',
	        value: function image(options) {
	            return new _Image2.default(this.game, options);
	        }
	    }, {
	        key: 'group',
	        value: function group(options) {
	            return new _Group2.default(this.game, options);
	        }

	        // tileSprite(context, x, y, key, w, h) {
	        //     return new TileSprite(this.game, false, context, x, y, key, w, h);
	        // }

	        // particles(x, y, options) {
	        //     return new Particles(this.game, x, y, options);
	        // }

	    }, {
	        key: 'button',
	        value: function button(options) {
	            return new _Button2.default(this.game, options);
	        }

	        // buttonImg(context, key, keyHover, x, y, width, height, action) {
	        //     return new ButtonImg(this.game, false, context, key, keyHover, x, y, width, height, action);
	        // }

	    }, {
	        key: 'rect',
	        value: function rect(options) {
	            return new _Rect2.default(this.game, options);
	        }
	    }, {
	        key: 'map',
	        value: function map(options) {
	            var _this = this;

	            return new Promise(function (resolve, reject) {
	                var map = new _Map2.default(_this.game, options);
	                map.getJson(map.jsonPath).then(function (mapa) {
	                    map.setMapData(mapa);
	                    var twoDimensionalLayers = map.generateTwoDimensionalLayers(mapa);
	                    map.mapTilesLayers = map.generateTilesAndEmptyArrays(twoDimensionalLayers);
	                    map.generateMapAsImage(map.mapTilesLayers);
	                    return resolve(map);
	                });
	            });
	        }

	        // grid(context, count, width) {
	        //     return new Grid(this.game, context, count, width);
	        // }

	        // multiplayer(ip) {
	        //     this.game.multiplayer = new Multiplayer(this.game, ip);
	        //     return this.game.multiplayer;
	        // }

	    }, {
	        key: 'text',
	        value: function text(options) {
	            return new _Text2.default(this.game, options);
	        }
	    }, {
	        key: 'bar',
	        value: function bar(options) {
	            return new _Bar2.default(this.game, options);
	        }
	    }, {
	        key: 'camera',
	        value: function camera(options) {
	            this.game.camera = new _Camera2.default(this.game, options);
	            return this.game.camera;
	        }
	    }, {
	        key: 'dialog',
	        value: function dialog(options) {
	            return new _Dialog2.default(this.game, options);
	        }

	        // dialogImg(x, y, width, height, key, close) {
	        //     return new DialogImg(this.game, x, y, width, height, key, close);
	        // }

	        // sounds(sounds) {
	        //     return this.game.sounds = sounds;
	        // }

	        // toMulti(obj) {
	        //     let o = {
	        //         x: obj.x,
	        //         y: obj.y,
	        //         vx: obj.body.velocity.x,
	        //         vy: obj.body.velocity.y,
	        //         key: obj.key,
	        //         w: obj.currentWidth,
	        //         h: obj.currentHeight,
	        //         states: obj.states,
	        //         state: obj.state,
	        //         type: obj.type,
	        //         oClass: obj.oClass,
	        //         angle: obj.body.angle,
	        //         arguments: obj._arguments
	        //     }
	        //     this.game.multiplayer.emit('add object', o, function (ID, sockID, room) {
	        //         obj.ID = ID;
	        //         obj.sockID = sockID;
	        //         obj.room = room;
	        //     });
	        // }

	    }]);

	    return GameObjectFactory;
	}();

	exports.default = GameObjectFactory;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	var _GameAnimationFactory = __webpack_require__(9);

	var _GameAnimationFactory2 = _interopRequireDefault(_GameAnimationFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sprite = function (_ObjectSettings2) {
	    _inherits(Sprite, _ObjectSettings2);

	    function Sprite(game, options) {
	        _classCallCheck(this, Sprite);

	        var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, game, options));

	        if (!_this.key) {
	            throw 'Musi podany byc klucz do obrazka przy tworzeniu: ' + _this.constructor.name;
	        }

	        _this.type = "sprite";

	        _this.body = new _Body2.default(_this.game, _this);

	        _this.animations = new _GameAnimationFactory2.default(_this);

	        _this.state = 'static';

	        _this.states = {
	            'static': {
	                frames: [{ sx: 0, sy: 0, fW: _this.width, fH: _this.height }]
	            }
	        };

	        _this.current_f = 0;

	        _this.change_f_delay = 0;

	        _this.f_max_delay = 4;

	        _this.playCallbackDelayCurrent = 0;
	        return _this;
	    }

	    // constructor(game, pooled, context, x, y, key, width, height) {
	    //     super();
	    //     this.initializeGlobalSettings({
	    //         game: game,
	    //         pooled: pooled || false,
	    //         context: context || 'main',
	    //         x: x || 1,
	    //         y: y || 1,
	    //         key: key || null,
	    //         width: width,
	    //         height: height
	    //     });
	    //     this.type = 'sprite';
	    //     this.zIndex = 3;

	    //     this.state = 'static';

	    //     this.states = {
	    //         'static': { sx: 0, sy: 0, fW: this.currentWidth, fH: this.currentHeight, f: [0] }
	    //     };

	    //     this.animations = new GameAnimationFactory(this);

	    //     this.body = new Body(this.game, this);

	    //     this.useRpgCollision = false;

	    //     this.body.tolerance = 0;

	    //     this.current_f = 0;
	    //     this.change_f_delay = 0;
	    //     this.f_max_delay = 4;
	    //     this.playCallbackDelayCurrent = 0;
	    // }

	    _createClass(Sprite, [{
	        key: 'draw',
	        value: function draw(dt) {
	            if (this.objAlfa !== 1 && this.game.ctx.globalAlpha === 1) {
	                this.game.ctx.save();
	                this.game.ctx.globalAlpha = this.objAlfa;
	            }

	            if (this.previousX) {
	                this.renderX = (this.x - this.previousX) * dt + this.previousX; //this.x + (this.body.velocity.x * dt);                 
	            } else {
	                this.renderX = this.x;
	            }
	            if (this.previousY) {
	                this.renderY = (this.y - this.previousY) * dt + this.previousY; //this.y + (this.body.velocity.y * dt);
	            } else {
	                this.renderY = this.y;
	            }

	            if (this.states[this.state].flip) {
	                this.game.ctx.save();
	                this.game.ctx.scale(-1, 1);
	            }

	            this.width = this.states[this.state].frames[this.current_f].fW;
	            this.height = this.states[this.state].frames[this.current_f].fH;

	            this.game.ctx.drawImage(this.image, this.states[this.state].frames[this.current_f].sx, //+ !this.states[this.state].horizontal ? this.states[this.state].frames[this.current_f] * this.states[this.state].fW : 0,
	            this.states[this.state].frames[this.current_f].sy, //+ this.states[this.state].horizontal ? this.states[this.state].frames[this.current_f] * this.states[this.state].fH : 0,
	            this.states[this.state].frames[this.current_f].fW, this.states[this.state].frames[this.current_f].fH,
	            // Math.floor(this.states[this.state].flip ? (-this.states[this.state].frames[this.current_f].fW - this.renderX + (!this.static ? this.game.camera.xScroll : 0)) : Math.floor(this.renderX - (!this.static ? this.game.camera.xScroll : 0))), // * this.scale
	            // Math.floor(this.renderY - (!this.static ? this.game.camera.yScroll : 0)),// * this.scale
	            this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.states[this.state].frames[this.current_f].fW * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.states[this.state].frames[this.current_f].fH * this.body.anchorY, this.states[this.state].frames[this.current_f].fW * this.scale, this.states[this.state].frames[this.current_f].fH * this.scale);

	            if (this.states[this.state].flip) {
	                this.game.ctx.restore();
	            }

	            if (this.objAlfa !== 1) {
	                this.game.ctx.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	            //this.frameUpdate(dt);
	        }

	        // redraw(dt) {
	        //     if (this.previousX) {
	        //         this.renderX = this.x + (this.body.velocity.x * dt);
	        //     } else {
	        //         this.renderX = this.x;
	        //     }
	        //     if (this.previousY) {
	        //         this.renderY = this.y + (this.body.velocity.y * dt);
	        //     } else {
	        //         this.renderY = this.y;
	        //     }

	        //     if (this.states[this.state].flip) {
	        //         this.game.ctx.save();
	        //         this.game.ctx.scale(-1, 1);
	        //     }

	        //     //this.context.clearRect(this.renderX, this.renderY, this.image.width, this.image.height);
	        //     this.frameUpdate();

	        //     this.context.drawImage(
	        //         this.image,
	        //         this.states[this.state].frames[this.current_f].sx + !this.states[this.state].horizontal ? this.states[this.state].frames[this.current_f] * this.states[this.state].fW : 0,
	        //         this.states[this.state].frames[this.current_f].sy + this.states[this.state].horizontal ? this.states[this.state].frames[this.current_f] * this.states[this.state].fH : 0,
	        //         this.states[this.state].frames[this.current_f].fW,
	        //         this.states[this.state].frames[this.current_f].fH,
	        //         Math.floor(this.states[this.state].flip ? (-this.states[this.state].frames[this.current_f].fW - this.renderX + (!this.static ? this.game.camera.xScroll : 0)) : Math.floor(this.renderX - (!this.static ? this.game.camera.xScroll : 0))), // * this.scale
	        //         Math.floor(this.renderY - (!this.static ? this.game.camera.yScroll : 0)),// * this.scale
	        //         this.states[this.state].frames[this.current_f].fW * this.scale,
	        //         this.states[this.state].frames[this.current_f].fH * this.scale
	        //     )

	        //     if (this.states[this.state].flip) {
	        //         this.game.ctx.restore();
	        //     }

	        //     if (this.useRpgCollision) {
	        //         this.rowAndColumn();
	        //     }
	        //     //this.frameUpdate();
	        // }

	    }, {
	        key: 'update',
	        value: function update(dt) {
	            //this.body.useGravity(this);

	            this.body.worldBounce();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();
	            this.useThereAndBack();
	            this.body.scaleUpDownHandler();
	            this.doInTimeHandler();
	            this.moveToPointLinearHandler();

	            if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
	                this.x += dt * this.body.velocity.x;
	                this.y += dt * this.body.velocity.y;
	            }

	            this.frameUpdate(dt);
	        }
	    }, {
	        key: 'updateWhenPositionChange',
	        value: function updateWhenPositionChange(callback) {
	            if (this.previousX !== this.x || this.previousY !== this.y) {
	                if (typeof _callback === 'function') {
	                    _callback(this);
	                }
	            }
	        }
	    }, {
	        key: 'multiUpdate',
	        value: function multiUpdate() {
	            if (this.body.angle !== this.previousAngle || (this.previousX !== this.x || this.previousY !== this.y) && this.ID) {
	                this.game.multiplayer.emit("update obj", { x: this.x, y: this.y, angle: this.body.angle, ID: this.ID, room: this.room });
	            }
	        }
	    }, {
	        key: 'frameUpdate',
	        value: function frameUpdate(dt) {
	            if (!this.once) {
	                if (this.change_f_delay < this.f_max_delay) {
	                    this.change_f_delay += 1 * (dt * 100);
	                } else {
	                    this.change_f_delay = 0;
	                    this.current_f = this.current_f + 1 >= this.states[this.state].frames.length ? 0 : this.current_f + 1;

	                    if (this.current_f === this.states[this.state].frames.length - 1 && typeof this.playCallback === 'function') {
	                        this.playCallbackDelayCurrent++;
	                        if (this.playCallbackDelay === this.playCallbackDelayCurrent) {
	                            this.playCallbackDelayCurrent = 0;
	                            this.playCallback.call(this.game, this);
	                        }
	                    }
	                }
	            } else {
	                if (this.change_f_delay < this.f_max_delay) {
	                    this.change_f_delay++;
	                } else {
	                    this.change_f_delay = 0;
	                    this.current_f = this.current_f + 1 >= this.states[this.state].frames.length ? this.states[this.state].frames.length - 1 : this.current_f + 1;

	                    if (this.current_f === this.states[this.state].frames.length - 1 && typeof this.onceCallback === 'function') {
	                        return this.onceCallback.call(this.game, this);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'rpgCollision',
	        value: function rpgCollision() {
	            this.useRpgCollision = this.useRpgCollision ? false : true;
	        }
	    }, {
	        key: 'moveByLineToEnd',
	        value: function moveByLineToEnd(_mouseX, _mouseY, _speed, _maxDistance, type, _callback) {
	            if (!_mouseX || !_mouseY) {
	                return false;
	            }

	            var dx = _mouseX - this.x - this.halfWidth;
	            var dy = _mouseY - this.y - this.halfHeight;
	            var distance = Math.sqrt(dx * dx + dy * dy);
	            var maxDistance = _maxDistance || 10;
	            var speed = _speed || 4;

	            if (distance > maxDistance) {
	                if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {
	                    if (type === 'up') {
	                        this.body.velocity.x = Math.cos(this.body.angle / (180 / Math.PI)) * speed;
	                        this.body.velocity.y = Math.sin(this.body.angle / (180 / Math.PI)) * speed;
	                    } else if (type === 'down') {
	                        this.body.velocity.x = Math.cos(this.body.angle - 180 / (180 / Math.PI)) * speed;
	                        this.body.velocity.y = Math.sin(this.body.angle - 180 / (180 / Math.PI)) * speed;
	                    }
	                    if (type === 'left') {
	                        this.body.velocity.x = Math.cos((this.body.angle - 90) / (180 / Math.PI)) * speed;
	                        this.body.velocity.y = Math.sin((this.body.angle - 90) / (180 / Math.PI)) * speed;
	                    } else if (type === 'right') {
	                        this.body.velocity.x = Math.cos((this.body.angle + 90) / (180 / Math.PI)) * speed;
	                        this.body.velocity.y = Math.sin((this.body.angle + 90) / (180 / Math.PI)) * speed;
	                    }
	                }
	            } else {
	                this.body.velocity.x = 0; //Math.cos(angle) * speed;
	                this.body.velocity.y = 0; //Math.sin(angle) * speed;w

	                if (typeof _callback === 'function') {
	                    this._callback.call(this.game, this);
	                }
	            }
	        }

	        // moveByLine(_mouseX, _mouseY, _speed, _maxDistance, _callback) {
	        //     if (!_mouseX || !_mouseY) {
	        //         return false;
	        //     }
	        //     let dx = (_mouseX - this.x - this.halfWidth);
	        //     let dy = (_mouseY - this.y - this.halfHeight);
	        //     let distance = Math.sqrt(dx * dx + dy * dy);
	        //     let maxDistance = _maxDistance || 4;
	        //     let speed = _speed || 4;

	        //     if (distance > maxDistance) {
	        //         if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {
	        //             let angle = Math.atan2(dy, dx);
	        //             this.body.rotate(angle * (180 / Math.PI));

	        //             this.body.velocity.x = Math.cos(angle) * speed;
	        //             this.body.velocity.y = Math.sin(angle) * speed;
	        //         }
	        //     } else {
	        //         this.body.velocity.x = 0;//Math.cos(angle) * speed;
	        //         this.body.velocity.y = 0;//Math.sin(angle) * speed;
	        //         if (typeof _callback === 'function') {
	        //             this._callback.call(this.game, this);
	        //         }
	        //     }
	        // }

	    }, {
	        key: 'moveToPointLinear',
	        value: function moveToPointLinear(x, y, speed, type, callback) {
	            this.positionToLinearMoveX = Math.floor(x);
	            this.positionToLinearMoveY = Math.floor(y);
	            this.linearSpeed = speed;
	            this.linearType = type;
	            this.moveLinearTo = true;
	            this.positionLinearCallback = callback;
	        }
	    }, {
	        key: 'moveToPointLinearHandler',
	        value: function moveToPointLinearHandler() {
	            if (this.moveLinearTo) {
	                if (this.linearType === 'down') {
	                    if (this.y <= this.positionToLinearMoveY) {
	                        this.body.velocity.y = +this.linearSpeed;
	                    } else {
	                        this.moveLinearTo = false;
	                        this.positionLinearCallback.call(this.game, this);
	                    }
	                } else if (this.linearType === 'up') {
	                    if (this.y >= this.positionToLinearMoveY) {
	                        this.body.velocity.y = -this.linearSpeed;
	                    } else {
	                        this.moveLinearTo = false;
	                        this.positionLinearCallback.call(this.game, this);
	                    }
	                } else if (this.linearType === 'right') {
	                    if (this.x <= this.positionToLinearMoveX) {
	                        this.body.velocity.x = +this.linearSpeed;
	                    } else {
	                        this.moveLinearTo = false;
	                        this.positionLinearCallback.call(this.game, this);
	                    }
	                } else if (this.linearType === 'left') {
	                    if (this.x >= this.positionToLinearMoveX) {
	                        this.body.velocity.x = -this.linearSpeed;
	                    } else {
	                        this.moveLinearTo = false;
	                        this.positionLinearCallback.call(this.game, this);
	                    }
	                }
	            }
	        }

	        // setAtributes(options) {
	        //     for (var i = 0; i < Object.keys(options).length; i++) {
	        //         this[Object.keys(options)[i]] = options[Object.keys(options)[i]];
	        //     }
	        // }

	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'width' || key === 'height' || key === 'scale' || key === 'playCallbackDelayCurrent') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Sprite;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Sprite;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AssetManager = __webpack_require__(2);

	var _AssetManager2 = _interopRequireDefault(_AssetManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ObjectSettings = function () {
	    function _ObjectSettings(game, options) {
	        _classCallCheck(this, _ObjectSettings);

	        if (!game) {
	            throw 'oczekiwano obiektu game jako pierwszy parametr!';
	        }
	        if (!options) {
	            throw 'oczekiwano obiektu jako parametr do: ' + this.constructor.name;
	        }

	        this.AssetManager = _AssetManager2.default;

	        this.game = game;

	        //this.pooled = options.pooled; 

	        this.contextType = options.context || 'main';

	        this.x = options.x === undefined ? 100 : options.x;

	        this.y = options.y === undefined ? 100 : options.y;

	        this.startX = options.x === undefined ? 100 : options.x;

	        this.startY = options.y === undefined ? 100 : options.y;

	        this.key = options.key || false;

	        this.isOutOfScreen = options.isOutOfScreen || false;

	        this.updateOfScreen = options.updateOfScreen === undefined || options.updateOfScreen === true ? true : false;

	        this.used = options.used === undefined ? true : false;

	        this.useCollision = options.useCollision === undefined || options.useCollision === true ? true : false;

	        this.static = options.static || false;

	        this.scale = options.scale || 1;

	        this.zIndex = options.zIndex || 3;

	        this.objAlfa = options.objAlfa || 1;

	        this.timeLocal = 0;

	        this.hovered = false;

	        this.touchActive = false;

	        this.playerControlled = true;

	        if (this.key) {
	            this.image = _AssetManager2.default.get(this.key) || this.key;
	        }

	        this.width = options.width || (this.image ? this.image.width : 150);
	        this.height = options.height || (this.image ? this.image.height : 150);

	        this.halfWidth = this.width / 2;
	        this.halfHeight = this.height / 2;

	        this.setContext(this.contextType);
	    }

	    _createClass(_ObjectSettings, [{
	        key: 'changeContext',
	        value: function changeContext(context, array) {
	            if (this.contextType != context) {
	                this.destroy(array);
	                this.setContext(context);
	            }
	            return this;
	        }
	    }, {
	        key: 'getCenter',
	        value: function getCenter() {
	            return {
	                x: this.x + this.halfWidth,
	                y: this.y + this.halfHeight
	            };
	        }
	    }, {
	        key: 'setContext',
	        value: function setContext(context) {
	            if (context) {
	                if (context === 'main') {
	                    this.context = this.game.ctx;
	                    this.contextType = context;
	                    var gameObjectLength = this.game.gameObjects.length;
	                    this.game.gameObjects[gameObjectLength] = this;
	                } else if (context === 'background') {
	                    this.context = this.game.bgctx;
	                    this.contextType = context;
	                    var gameObjectStaticLength = this.game.gameObjectsStatic.length;
	                    this.game.gameObjectsStatic[gameObjectStaticLength] = this;
	                    //this.redraw(); 
	                } else if (context === 'onbackground') {
	                    this.context = this.game.onbgctx;
	                    this.contextType = context;
	                    var gameObjectOnStaticLength = this.game.gameObjectsOnStatic.length;
	                    this.game.gameObjectsOnStatic[gameObjectOnStaticLength] = this;
	                    //this.redraw();
	                } else {
	                    return console.error("Niepoprawna nazwa Contextu. Dostępne nazwy to: \n1. background \n2. onbackground \n3. main");
	                }
	            }
	        }
	    }, {
	        key: 'setIndex',
	        value: function setIndex(index) {
	            this.zIndex = index;
	            return this;
	            // this.game.gameObjects.sort((obj1, obj2) => {
	            //     if (obj1.zIndex > obj2.zIndex)
	            //         return 1;
	            //     else if (obj1.zIndex < obj2.zIndex) {
	            //         return -1;
	            //     } else {
	            //         return 0;
	            //     }
	            // });
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy(array) {
	            if (Array.isArray(array)) {
	                array.splice(array.indexOf(this), 1);
	            }
	            this.x = -500;
	            this.y = -500;
	            return this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
	        }
	    }, {
	        key: 'kill',
	        value: function kill(array) {
	            if (Array.isArray(array)) {
	                array.splice(array.indexOf(this), 1);
	            }
	        }
	    }, {
	        key: 'doInTime',
	        value: function doInTime(time, callback) {
	            this.timeLocal = 0;
	            this.timeMax = time;
	            this.timeCallback = callback;
	            this.inTime = true;
	        }
	    }, {
	        key: 'doInTimeHandler',
	        value: function doInTimeHandler() {
	            if (this.inTime) {
	                this.timeLocal += 1 / 60 * 1000;

	                if (this.timeLocal > this.timeMax) {
	                    this.timeLocal = 0;
	                    this.inTime = false;
	                    this.timeCallback.call(this, this);
	                }
	            }
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.inTime = false;
	        }
	    }, {
	        key: 'fadeOut',
	        value: function fadeOut(time, callback) {
	            this.timerFade = time;
	            this.currentTimerFade = time;
	            this.timerFadeMin = 0;
	            this.timerCallback = callback;
	            this.timerFadeInActive = false;
	            this.timerFadeOutActive = true;
	        }
	    }, {
	        key: 'fadeIn',
	        value: function fadeIn(time, callback) {
	            this.timerFade = time;
	            this.currentTimerFade = 0;
	            this.timerFadeMin = 0;
	            this.timerCallback = callback;
	            this.timerFadeOutActive = false;
	            this.timerFadeInActive = true;
	        }
	    }, {
	        key: 'fadeOutHandler',
	        value: function fadeOutHandler() {
	            if (this.timerFadeOutActive) {

	                this.currentTimerFade -= 1 / 60 * 1000;
	                this.objAlfa = this.currentTimerFade / this.timerFade;

	                if (this.currentTimerFade <= 0) {
	                    this.objAlfa = 0;
	                    this.timerFadeOutActive = false;
	                    if (typeof this.timerCallback === 'function') {
	                        return this.timerCallback.call();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'fadeInHandler',
	        value: function fadeInHandler() {
	            if (this.timerFadeInActive && this.objAlfa !== 1) {

	                this.currentTimerFade += 1 / 60 * 1000;
	                this.objAlfa = this.currentTimerFade / this.timerFade;

	                if (this.currentTimerFade >= this.timerFade) {
	                    this.timerFadeInActive = false;
	                    this.objAlfa = 1;

	                    if (typeof this.timerCallback === 'function') {
	                        return this.timerCallback.call();
	                    }
	                }
	            } else {
	                this.timerFadeInActive = false;
	            }
	        }
	    }, {
	        key: 'thereAndBack',
	        value: function thereAndBack(options) {
	            if (!options.distance || !options.direction || !options.speed) {
	                throw "Wymagany obiekt jako argument z wlasciowsciami \n distance: INT \n direction: String ('left, right, up, down') \n speed: INT";
	            }
	            if (options.direction !== 'left' && options.direction !== 'right' && options.direction !== 'down' && options.direction !== 'up') {
	                throw "Wybrano niedostepny kierunek! dostepne direction: ('left, right, up, down') ";
	            }
	            this.thereAndBack_startX = this.x;
	            this.thereAndBack_startY = this.y;
	            if (options.direction === 'right' || options.direction === 'left') {
	                this.thereAndBack_dis = options.direction === 'right' ? this.x + options.distance : this.x - options.distance;
	            } else {
	                this.thereAndBack_dis = options.direction === 'down' ? this.y + options.distance : this.y - options.distance;
	            }

	            this.thereAndBack_dir = options.direction;
	            this.thereAndBack_speed = options.speed;
	            this.thereAndBack_site = true;
	            this.thereAndBackUsed = true;
	            return this;
	        }
	    }, {
	        key: 'useThereAndBack',
	        value: function useThereAndBack() {
	            if (this.thereAndBackUsed) {
	                if (this.thereAndBack_dir === 'right') {
	                    if (this.x < this.thereAndBack_dis && this.thereAndBack_site) {
	                        this.body.velocity.x = this.thereAndBack_speed;
	                    } else if (this.x > this.thereAndBack_startX) {
	                        this.thereAndBack_site = false;
	                        this.body.velocity.x = -this.thereAndBack_speed;
	                    } else {
	                        this.thereAndBack_site = true;
	                        this.body.velocity.x = this.body.velocity.x * -1;
	                    }
	                } else if (this.thereAndBack_dir === 'left') {
	                    if (this.x > this.thereAndBack_dis && this.thereAndBack_site) {
	                        this.body.velocity.x = -this.thereAndBack_speed;
	                    } else if (this.x < this.thereAndBack_startX) {
	                        this.thereAndBack_site = false;
	                        this.body.velocity.x = this.thereAndBack_speed;
	                    } else {
	                        this.thereAndBack_site = true;
	                        this.body.velocity.x = this.body.velocity.x * -1;
	                    }
	                } else if (this.thereAndBack_dir === 'up') {
	                    if (this.y > this.thereAndBack_dis && this.thereAndBack_site) {
	                        this.body.velocity.y = -this.thereAndBack_speed;
	                    } else if (this.y < this.thereAndBack_startY) {
	                        this.thereAndBack_site = false;
	                        this.body.velocity.y = this.thereAndBack_speed;
	                    } else {
	                        this.thereAndBack_site = true;
	                        this.body.velocity.y = this.body.velocity.y * -1;
	                    }
	                } else if (this.thereAndBack_dir === 'down') {
	                    if (this.y < this.thereAndBack_dis && this.thereAndBack_site) {
	                        this.body.velocity.y = this.thereAndBack_speed;
	                    } else if (this.y > this.thereAndBack_startY) {
	                        this.thereAndBack_site = false;
	                        this.body.velocity.y = -this.thereAndBack_speed;
	                    } else {
	                        this.thereAndBack_site = true;
	                        this.body.velocity.y = this.body.velocity.y * -1;
	                    }
	                }
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'moveToPoint',
	        value: function moveToPoint(options) {
	            if (!options) {
	                throw "Wymagany obiekt jako argument! \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) \n anchor: boolean (opcjonalnie) \n rotation: boolean (opcjonalnie) tilt: INT (opcjonalnie)";
	            }
	            if (!options.x && !options.y && !options.speed) {
	                throw "Niepoprawne parametry! \n Wymagane: \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) \n anchor: boolean (opcjonalnie) \n rotation: boolean (opcjonalnie) tilt: INT (opcjonalnie)";
	            }

	            this.positionToMoveX = Math.floor(options.x);
	            this.positionToMoveY = Math.floor(options.y);
	            this.positionSpeed = options.speed;
	            this.positionRotation = options.rotation || false;
	            this.positionAnchor = options.anchor || false;
	            this.positionTilt = options.tilt || 0;
	            this.oldVelocityX = this.body.velocity.x;
	            this.oldVelocityY = this.body.velocity.y;
	            this.oldUseCollision = this.useCollision;
	            this.useCollision = options.collision || true;
	            this.moveTo = true;
	            this.positionCallback = options.callback;
	        }
	    }, {
	        key: 'moveToPointHandler',
	        value: function moveToPointHandler() {
	            if (this.moveTo) {
	                var dx = this.positionToMoveX - this.x - (this.positionAnchor ? this.halfWidth : 0);
	                var dy = this.positionToMoveY - this.y - (this.positionAnchor ? this.halfHeight : 0);

	                var distance = Math.sqrt(dx * dx + dy * dy);
	                //console.log(distance)
	                if (distance > 3) {
	                    if (this.positionRotation) {
	                        var tilt = this.positionTilt * Math.PI / 180;
	                        this.body.angle = Math.atan2(dy, dx) - tilt;
	                    }
	                    this.body.velocity.x = dx / distance * this.positionSpeed;
	                    this.body.velocity.y = dy / distance * this.positionSpeed;
	                } else {
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    this.useCollision = this.oldUseCollision;
	                    this.moveTo = false;
	                    if (typeof this.positionCallback === 'function') {
	                        this.positionCallback.call(this.game, this);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'moveToPointEasing',
	        value: function moveToPointEasing(options) {
	            if (!options) {
	                throw "Wymagany obiekt jako argument! \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) ";
	            }
	            if (!options.x && !options.y && !options.speed) {
	                throw "Niepoprawne parametry! \n Wymagane: \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) ";
	            }

	            this.positionEasingToMoveX = Math.floor(options.x);
	            this.positionEasingToMoveY = Math.floor(options.y);
	            this.positionEasingSpeed = options.speed;
	            this.oldVelocityX = this.body.velocity.x;
	            this.oldVelocityY = this.body.velocity.y;
	            this.oldUseCollision = this.useCollision;
	            this.useCollision = false;
	            this.moveToEasing = true;

	            this.positionEasingCallback = options.callback;
	        }
	    }, {
	        key: 'moveToPointEasingHandler',
	        value: function moveToPointEasingHandler() {
	            if (this.moveToEasing) {
	                this.myX = Math.floor(this.x);
	                this.myY = Math.floor(this.y);

	                if (this.moveToEasing && this.myX != this.positionEasingToMoveX && this.myY != this.positionEasingToMoveY) {
	                    this.x -= (this.myX - this.positionEasingToMoveX) / this.positionEasingSpeed;
	                    this.y -= (this.myY - this.positionEasingToMoveY) / this.positionEasingSpeed;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                } else if (this.moveToEasing) {
	                    this.body.velocity.x = this.oldVelocityX;
	                    this.body.velocity.y = this.oldVelocityY;
	                    this.useCollision = this.oldUseCollision;
	                    this.x = Math.floor(this.x);
	                    this.y = Math.floor(this.y);
	                    this.moveToEasing = false;
	                    if (typeof this.positionEasingCallback === 'function') {
	                        this.positionEasingCallback.call(this.game, this);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'topShooter',
	        value: function topShooter(blockWidth, callback) {
	            //if(this.game.keyboard.use['W'].pressed){
	            if (Math.abs(this.body.velocity.x) > 0 || Math.abs(this.body.velocity.y) > 0) {
	                this.column = Math.round(this.x / blockWidth);
	                this.row = Math.round(this.y / blockWidth);

	                this.next_columnRight = Math.round((this.x + blockWidth) / blockWidth);
	                this.next_columnLeft = Math.round((this.x - blockWidth) / blockWidth);

	                this.next_rowBottom = Math.floor((this.y + this.height) / blockWidth);
	                this.next_rowTop = Math.floor(this.y / blockWidth);
	                //
	                if (this.game.map.b[this.next_rowBottom][this.column].type != 'empty') {
	                    this.y = this.row * blockWidth;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    return callback('bottom');
	                }
	                if (this.game.map.b[this.next_rowTop][this.column].type != 'empty') {
	                    this.y = this.row * blockWidth;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    return callback('top');
	                }
	                if (this.game.map.b[this.row][this.next_columnRight].type != 'empty') {
	                    this.x = this.column * blockWidth;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    return callback('');
	                }
	                if (this.game.map.b[this.row][this.next_columnLeft].type != 'empty') {
	                    this.x = this.column * blockWidth;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    return callback('');
	                }
	            }
	            return false;
	            // }
	        }
	    }, {
	        key: 'setClone',
	        value: function setClone(x, y, w, h) {
	            this.clone = this.game.ctx.getImageData(x, y, w, h);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.renderX = 0;
	            this.renderY = 0;
	            this.previousX = 0;
	            this.previousY = 0;
	            this.x = 0;
	            this.y = 0;
	            this.used = false;
	            this.once = false;
	            return this;
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.used = true;

	            return this;
	        }
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            this.used = !this.used;
	        }
	    }, {
	        key: 'getProps',
	        value: function getProps(superProps) {
	            var props = {};

	            for (var key in this) {
	                if (key !== 'game' && key !== 'AssetManager' && key !== 'body' && key !== 'context' && key !== 'startX' && key !== 'startY' && key !== 'contextType' && key !== 'timeLocal' && key !== 'halfHeight' && key !== 'halfWidth' && key !== 'hovered' && key !== 'isOutOfScreen' && key !== 'touchActive' && key !== 'type' && key !== 'playerControlled' && key !== 'image' && key !== 'animations' && key !== 'f_max_delay' && key !== 'change_f_delay' && key !== 'states' && key !== 'state' && key !== 'current_f' && key !== 'once' && key !== 'playCallback' && key !== 'playCallbackDellayCurrent' && key !== 'currentStatusX' && key !== 'statusX' && key !== 'textSize' && key !== 'cloneText' && key !== 'axis' && key !== 'viewportRect' && key !== 'worldRect' && key !== 'wView' && key !== 'hView' && key !== 'xDeadZone' && key !== 'yDeadZone' && key !== 'xScroll' && key !== 'yScroll') {
	                    props[key] = this[key];
	                }
	            }

	            if (!superProps) {
	                console.log(props);
	                return this;
	            } else {
	                return props;
	            }
	        }
	    }]);

	    return _ObjectSettings;
	}();

	exports.default = _ObjectSettings;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Body = function () {
	    function Body(game, sprite) {
	        _classCallCheck(this, Body);

	        this.game = game;
	        this.sprite = sprite;

	        this.velocity = {
	            x: 0,
	            y: 0
	        };
	        this.gravity = {
	            x: 0,
	            y: 0
	            //
	        };this.scale = 1;
	        this.angle = 0;
	        this.anchorX = 0;
	        this.anchorY = 0;
	        this.pushed = false;
	        //
	        this.colideWorldSide = false;
	        this.colideWorldSideLeft = true;
	        this.colideWorldSideRight = true;
	        this.colideWorldSideBottom = true;
	        this.colideWorldSideTop = true;

	        this.isGround = false;

	        this.worldBounds = false;
	        this.isOutOfScreen = false;
	    }

	    _createClass(Body, [{
	        key: 'setWorldBounds',
	        value: function setWorldBounds(bool) {
	            this.worldBounds = bool;
	            return this.sprite;
	        }
	    }, {
	        key: 'setWorldColider',
	        value: function setWorldColider(bool) {
	            this.colideWorldSide = bool;
	            return this.sprite;
	        }
	    }, {
	        key: 'worldBounce',
	        value: function worldBounce() {
	            if (this.colideWorldSide) {
	                if (this.colideWorldSideBottom && this.sprite.y + this.sprite.height * this.scale >= this.game.portViewHeight) {
	                    this.velocity.y = this.worldBounds ? this.velocity.y * -1 : 0;
	                    this.sprite.y = this.game.portViewHeight - this.sprite.height * this.scale;
	                } else if (this.colideWorldSideTop && this.sprite.y * this.scale <= 0) {
	                    this.velocity.y = this.worldBounds ? this.velocity.y * -1 : 0;
	                    this.sprite.y = 0;
	                }
	                if (this.colideWorldSideRight && this.sprite.x + this.sprite.width * this.scale >= this.game.portViewWidth) {
	                    this.velocity.x = this.worldBounds ? this.velocity.x * -1 : 0;
	                    this.sprite.x = this.game.portViewWidth - this.sprite.width * this.scale;
	                } else if (this.colideWorldSideLeft && this.sprite.x * this.scale <= 0) {
	                    this.velocity.x = this.worldBounds ? this.velocity.x * -1 : 0;
	                    this.sprite.x = 0;
	                }
	            }
	        }
	    }, {
	        key: 'setScale',
	        value: function setScale(scale) {
	            this.scale = scale;
	        }
	    }, {
	        key: 'scaleUp',
	        value: function scaleUp(too, speed, callback) {
	            this.scaleUpTrig = true;
	            this.scaleSpeed = speed;
	            this.scaleToo = too;
	            this.scallUpCallback = callback;
	        }
	    }, {
	        key: 'scaleDown',
	        value: function scaleDown(too, speed, callback) {
	            this.scaleDownTrig = true;
	            this.scaleSpeed = speed;
	            this.scaleToo = too;
	            this.scallDownCallback = callback;
	        }
	    }, {
	        key: 'scaleUpDownHandler',
	        value: function scaleUpDownHandler() {
	            if (this.scaleUpTrig) {
	                if (this.scale < this.scaleToo) {
	                    this.scale += this.scaleSpeed;
	                    if (this.scale > this.scaleToo) {
	                        this.scale = this.scaleToo;
	                    }
	                } else {
	                    this.scaleUpTrig = false;
	                    if (typeof this.scallUpCallback === 'function') {
	                        this.scallUpCallback();
	                    }
	                }
	            } else if (this.scaleDownTrig) {
	                if (this.scale > this.scaleToo) {
	                    this.scale -= this.scaleSpeed;
	                } else {
	                    this.scaleDownTrig = false;
	                    this.scale = 1;
	                    if (typeof this.scallDownCallback === 'function') {
	                        this.scallDownCallback();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'useGravity',
	        value: function useGravity(obj) {
	            // !obj.body.isGround && 
	            if (obj.y + obj.states[obj.state].fH < obj.game.canvas.height && !obj.body.ground) {
	                obj.body.velocity.y += obj.body.gravity.y / 1000;
	            } else {
	                obj.body.velocity.y = 0;
	                obj.body.ground = false;
	            }
	        }
	    }, {
	        key: 'addAngle',
	        value: function addAngle(val) {
	            if (this.angle * 180 / Math.PI >= 360) {
	                this.angle = 0;
	            }
	            this.angle += val * Math.PI / 180;
	        }
	    }, {
	        key: 'remAngle',
	        value: function remAngle(val) {
	            if (this.angle * 180 / Math.PI <= -360) {
	                this.angle = 0;
	            }
	            this.angle -= val * Math.PI / 180;
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate(val) {
	            this.angle = val || 0;
	            return this.sprite;
	        }
	    }, {
	        key: 'setVelocity',
	        value: function setVelocity(x, y) {
	            if (!x || !y) {
	                console.log("wymagane podanie parametrów: 'x' i 'y' ");
	            } else {
	                this.velocity.x = x;
	                this.velocity.y = y;
	            }
	            return this.sprite;
	        }
	    }, {
	        key: 'setAnchor',
	        value: function setAnchor(x, y) {
	            this.anchorX = x;
	            this.anchorY = y;

	            return this.sprite;
	        }
	    }, {
	        key: 'rotateByMouse',
	        value: function rotateByMouse(spritePosition, easing) {
	            var easingSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.06;


	            if (spritePosition === undefined) {
	                throw "Wymagane jest podanie poczatkowego nachylenia obrazka, jako INT.\n Opcjonalnie można użyć dwóch pozostałych parametrów do easingu. \n easing: Boolean i easingSpeed: Float";
	            }

	            var dx = this.game.mouse.mouseX + this.game.camera.xScroll - this.sprite.x - this.sprite.width * this.anchorX;
	            var dy = this.game.mouse.mouseY + this.game.camera.yScroll - this.sprite.y - this.sprite.height * this.anchorY;

	            if (easing) {
	                var toAngle = Math.atan2(dy, dx) - spritePosition * Math.PI / 180;

	                var radDiff = toAngle - this.angle;
	                if (radDiff > Math.PI) {
	                    this.angle += 2 * Math.PI;
	                } else if (radDiff < -Math.PI) {
	                    this.angle -= 2 * Math.PI;
	                }

	                var targetVel = radDiff * easingSpeed;
	                this.rotSpeed = this.clip(targetVel, this.rotSpeed - 0.01, this.rotSpeed + 0.01);

	                this.angle += this.rotSpeed;
	            } else {
	                var disX = Math.abs(dx);
	                var disY = Math.abs(dx);

	                if (disX > 3 || disY > 3) {
	                    this.angle = Math.atan2(dy, dx) - spritePosition * Math.PI / 180;
	                }
	            }
	        }
	    }, {
	        key: 'rotateAndMoveByMouse',
	        value: function rotateAndMoveByMouse(spritePosition, speed, easing) {
	            var easingSpeed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.06;

	            if (spritePosition === undefined || speed === undefined) {
	                throw "Wymagane jest podanie poczatkowego nachylenia obrazka, jako INT i predkości jako INT.\n Opcjonalnie można użyć dwóch pozostałych parametrów do easingu. \n easing: Boolean i easingSpeed: Float";
	            }

	            var dx = this.game.mouse.mouseX - this.sprite.x - this.sprite.halfWidth;
	            var dy = this.game.mouse.mouseY - this.sprite.y - this.sprite.halfHeight;
	            var tilt = spritePosition * Math.PI / 180;

	            if (easing) {
	                var toAngle = Math.atan2(dy, dx) - tilt;
	                var toPos = this.angle + tilt;
	                var pi2 = 2 * Math.PI;

	                var radDiff = toAngle - this.angle;
	                if (radDiff > Math.PI) {
	                    this.angle += pi2;
	                } else if (radDiff < -Math.PI) {
	                    this.angle -= pi2;
	                }

	                var targetVel = radDiff * easingSpeed;
	                this.rotSpeed = this.clip(targetVel, this.rotSpeed - 0.04, this.rotSpeed + 0.04);
	                this.angle += this.rotSpeed;

	                this.velocity.x = Math.cos(toPos) * speed;
	                this.velocity.y = Math.sin(toPos) * speed;
	            } else {
	                var disX = Math.abs(dx);
	                var disY = Math.abs(dy);

	                if (disX > 20 || disY > 20) {
	                    var distance = Math.sqrt(dx * dx + dy * dy);
	                    this.angle = Math.atan2(dy, dx) - tilt;
	                    this.velocity.x = dx / distance * speed;
	                    this.velocity.y = dy / distance * speed;
	                }
	            }
	        }

	        // moveToPoint(x, y, speed) {
	        //     const dx = x - this.sprite.x;
	        //     const dy = y - this.sprite.y;

	        //     const distance = Math.sqrt(dx * dx + dy * dy);

	        //     if (distance > 1) {
	        //         this.velocity.x = dx / distance * speed;
	        //         this.velocity.y = dy / distance * speed;
	        //     } else {
	        //         this.velocity.x = 0;
	        //         this.velocity.y = 0;
	        //     }
	        // }

	        // moveToPointRotate(x, y, speed) {
	        //     const tilt = 90 * Math.PI / 180;
	        //     const dx = x - this.sprite.x;
	        //     const dy = y - this.sprite.y;

	        //     const distance = Math.sqrt(dx * dx + dy * dy);

	        //     if (distance > 1) {
	        //         this.angle = Math.atan2(dy, dx) - tilt;
	        //         this.velocity.x = dx / distance * speed;
	        //         this.velocity.y = dy / distance * speed;
	        //     } else {
	        //         this.velocity.x = 0;
	        //         this.velocity.y = 0;
	        //     }
	        // }

	    }, {
	        key: 'clip',
	        value: function clip(x, min, max) {
	            return x < min ? min : x > max ? max : x;
	        }
	    }]);

	    return Body;
	}();

	exports.default = Body;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameAnimationFactory = function () {
	    function GameAnimationFactory(sprite) {
	        _classCallCheck(this, GameAnimationFactory);

	        this.sprite = sprite;
	    }

	    _createClass(GameAnimationFactory, [{
	        key: 'add',
	        value: function add(options) {
	            if (!options) {
	                throw 'oczekiwano obiektu jako argument przy tworzeniu animacji do: ' + this.sprite.constructor.name;
	            }

	            if (!options.key) {
	                throw 'oczekiwano wlasciwosci `key` w przekazanym obiekcie';
	            }

	            if (!options.frames) {
	                throw 'oczekiwano tablicy obiektów `frames` w przekazanym obiekcie';
	            }

	            this.chceckFrames(options.frames);

	            this.sprite.states[options.key] = options;
	            return this.sprite;
	        }
	    }, {
	        key: 'chceckFrames',
	        value: function chceckFrames(frames) {
	            if (frames.length === 0) {
	                throw "W przekazanej tablicy frames jest błąd. Wymagane parametry to obiekt z kluczami: \n 'sx' \n 'sy' \n 'fW' \n 'fH' \n przy czym 'fW' i 'fH' muszą być większe od 0!";
	            }
	            for (var i = 0; i < frames.length; i++) {
	                var frame = frames[i];
	                if (!frame.sx && frame.sx !== 0 || !frame.sy && frame.sy !== 0 || !frame.fW || !frame.fH) {
	                    throw "W przekazanej tablicy frames jest błąd. Wymagane parametry to obiekt z kluczami: \n 'sx' \n 'sy' \n 'fW' \n 'fH' \n przy czym 'fW' i 'fH' muszą być większe od 0!";
	                }
	            }
	        }
	    }, {
	        key: 'play',
	        value: function play(options) {

	            if (!options) {
	                throw "Metoda play wymaga obiektu jako parametr";
	            }

	            if (!options.key) {
	                throw "W momencie wywolania metody play wymagany jest 'key' nazwanej animacji";
	            }

	            if (options.key != this.sprite.state) {
	                this.sprite.current_f = 0;
	                this.sprite.once = false;
	                this.sprite.state = options.key;
	                this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW * this.sprite.scale;
	                this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH * this.sprite.scale;
	                this.sprite.halfWidth = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW / 2 * this.sprite.scale;
	                this.sprite.halfHeight = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH / 2 * this.sprite.scale;
	                this.sprite.f_max_delay = options.delay || 10;
	                if (typeof options.action === 'function') {
	                    this.sprite.playCallback = options.action;
	                    this.sprite.playCallbackDelay = options.actionDelay || 1;
	                } else {
	                    this.sprite.playCallback = null;
	                }
	            }

	            return this.sprite;
	        }
	    }, {
	        key: 'playOnce',
	        value: function playOnce(options) {

	            if (!options) {
	                throw "Metoda play wymaga obiektu jako parametr";
	            }

	            if (!options.key) {
	                throw "W momencie wywolania metody play wymagany jest 'key' obrazka";
	            }

	            if (options.key != this.sprite.state) {
	                this.sprite.once = true;
	                this.sprite.current_f = 0;
	                this.sprite.state = options.key;
	                this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW * this.sprite.scale;
	                this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH * this.sprite.scale;
	                this.sprite.halfWidth = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW / 2 * this.sprite.scale;
	                this.sprite.halfHeight = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH / 2 * this.sprite.scale;
	                this.sprite.f_max_delay = options.delay || 10;
	                if (typeof options.callback === 'function') {
	                    this.sprite.onceCallback = options.callback;
	                } else {
	                    this.sprite.onceCallback = null;
	                }
	            }
	        }
	    }, {
	        key: 'setImage',
	        value: function setImage(image) {
	            this.sprite.image = this.sprite.loader.assetManager.get(image);
	            this.sprite.current_f = 0;
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            return this.sprite.state;
	        }
	    }]);

	    return GameAnimationFactory;
	}();

	;

	exports.default = GameAnimationFactory;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Image = function (_ObjectSettings2) {
	    _inherits(Image, _ObjectSettings2);

	    function Image(game, options) {
	        _classCallCheck(this, Image);

	        var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, game, options));

	        if (!_this.key) {
	            var _ret;

	            return _ret = console.error('Musi podany byc klucz do obrazka przy tworzeniu Classy: ' + _this.constructor.name), _possibleConstructorReturn(_this, _ret);
	        }

	        _this.type = "image";
	        _this.body = new _Body2.default(_this.game, _this);
	        return _this;
	    }

	    _createClass(Image, [{
	        key: 'draw',
	        value: function draw(lag) {
	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.body.angle === 0) {
	                if (this.previousX) {
	                    this.renderX = (this.x - this.previousX) * lag + this.previousX;
	                } else {
	                    this.renderX = this.x;
	                }
	                if (this.previousY) {
	                    this.renderY = (this.y - this.previousY) * lag + this.previousY;
	                } else {
	                    this.renderY = this.y;
	                }
	            }

	            this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) * this.body.scale : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) * this.body.scale : -this.height * this.body.anchorY, this.width * this.body.scale, this.height * this.body.scale);

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            this.body.worldBounce();
	            this.useThereAndBack();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();

	            if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
	                this.x += dt * this.body.velocity.x;
	                this.y += dt * this.body.velocity.y;
	            }
	        }
	    }, {
	        key: 'updateWhenPositionChange',
	        value: function updateWhenPositionChange(x, y, callback) {
	            if (this.previousX !== this.x || this.previousY !== this.y) {
	                if (typeof _callback === 'function') {
	                    _callback(this);
	                }
	            }
	        }
	    }, {
	        key: 'multiUpdate',
	        value: function multiUpdate() {
	            if ((this.previousX !== this.x || this.previousY !== this.y) && this.ID) {
	                this.game.multiplayer.emit("update obj", { x: this.x, y: this.y, ID: this.ID, room: this.room });
	            }
	        }

	        // moveByLine(_mouseX, _mouseY, _speed, _maxDistance, _callback) {
	        //     if (!_mouseX || !_mouseY) {
	        //         return false;
	        //     }
	        //     let dx = (_mouseX - this.x - this.currentHalfWidth);
	        //     let dy = (_mouseY - this.y - this.currentHalfHeight);
	        //     let distance = Math.sqrt(dx * dx + dy * dy);
	        //     let maxDistance = _maxDistance || 10;
	        //     let speed = _speed || 4;

	        //     if (distance > maxDistance) {
	        //         if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {
	        //             let angle = Math.atan2(dy, dx);
	        //             this.body.rotate(angle * (180 / Math.PI));

	        //             this.body.velocity.x = Math.cos(angle) * speed;
	        //             this.body.velocity.y = Math.sin(angle) * speed;
	        //         }
	        //     } else {
	        //         this.body.velocity.x = 0;
	        //         this.body.velocity.y = 0;
	        //         if (typeof _callback === 'function') {
	        //             this._callback.call(this.game, this);
	        //         }
	        //     }
	        // }

	    }]);

	    return Image;
	}(_ObjectSettings4.default);

	exports.default = Image;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rect = function (_ObjectSettings2) {
	    _inherits(Rect, _ObjectSettings2);

	    function Rect(game, options) {
	        _classCallCheck(this, Rect);

	        var _this = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, game, options));

	        _this.strokeColor = options.strokeColor || null;

	        _this.fill = options.fill || 'red';

	        _this.borderWidth = options.borderWidth || 1;

	        _this.type = "rect";

	        _this.body = new _Body2.default(_this.game, _this);
	        return _this;
	    }

	    _createClass(Rect, [{
	        key: 'draw',
	        value: function draw(lag) {
	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.previousX) {
	                this.renderX = (this.x - this.previousX) * lag + this.previousX;
	            } else {
	                this.renderX = this.x;
	            }
	            if (this.previousY) {
	                this.renderY = (this.y - this.previousY) * lag + this.previousY;
	            } else {
	                this.renderY = this.y;
	            }

	            this.context.strokeStyle = this.strokeColor;
	            this.context.lineWidth = this.borderWidth;
	            this.context.fillStyle = this.fill;

	            if (this.strokeColor === null) {
	                this.context.fillRect(this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY, this.width * this.scale, this.height * this.scale);
	            } else if (this.fill === null) {
	                this.context.beginPath();
	                this.context.rect(this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY, this.width * this.scale, this.height * this.scale);
	                this.context.stroke();
	                this.context.closePath();
	            } else {
	                this.context.beginPath();
	                this.context.rect(this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY, this.width * this.scale, this.height * this.scale);
	                this.context.stroke();
	                this.context.fill();
	                this.context.closePath();
	            }

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            this.body.worldBounce();
	            this.body.scaleUpDownHandler();
	            this.useThereAndBack();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();

	            this.x = this.x + dt * this.body.velocity.x;
	            this.y = this.y + dt * this.body.velocity.y;
	        }
	    }, {
	        key: 'setBorderWidth',
	        value: function setBorderWidth(width) {
	            this.borderWidth = width;
	        }

	        // moveByLine(_mouseX, _mouseY, _speed, _maxDistance, _callback) {
	        //     if (!_mouseX || !_mouseY) {
	        //         return false;
	        //     }
	        //     let dx = (_mouseX - this.x - this.halfWidth);
	        //     let dy = (_mouseY - this.y - this.halfHeight);
	        //     let distance = Math.sqrt(dx * dx + dy * dy);
	        //     let maxDistance = _maxDistance || 4;
	        //     let speed = _speed || 4;
	        //     this.body.angle = Math.atan2(dy, dx) * (180 / Math.PI);
	        //     //this.body.rotate(this.body.angle / (180 / Math.PI));

	        //     if (distance > maxDistance) {
	        //         // if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {

	        //         this.body.velocity.x = Math.cos(this.body.angle / (180 / Math.PI)) * speed;
	        //         this.body.velocity.y = Math.sin(this.body.angle / (180 / Math.PI)) * speed;
	        //         //}
	        //     } else {
	        //         this.body.velocity.x = 0;//Math.cos(angle) * speed;
	        //         this.body.velocity.y = 0;//Math.sin(angle) * speed;
	        //         if (typeof _callback === 'function') {
	        //             this._callback.call(this.game, this);
	        //         }
	        //     }
	        // }

	        // moveToPoint(x, y, speed, callback) {
	        //     //if(!this.moveTo){
	        //     this.positionToMoveX = Math.floor(x);
	        //     this.positionToMoveY = Math.floor(y);
	        //     this.positionSpeed = speed;
	        //     this.oldVelocityX = this.body.velocity.x;
	        //     this.oldVelocityY = this.body.velocity.y;
	        //     this.oldUseCollision = this.useCollision;
	        //     this.useCollision = false;
	        //     this.moveTo = true;

	        //     this.positionCallback = callback;
	        //     //}
	        // }

	        // moveToPointHandler() {
	        //     if (this.moveTo) {
	        //         this.myX = Math.floor(this.x);
	        //         this.myY = Math.floor(this.y);

	        //         if (this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY)) {
	        //             this.x -= (((this.myX - this.positionToMoveX) / this.positionSpeed));
	        //             this.y -= (((this.myY - this.positionToMoveY) / this.positionSpeed));
	        //             this.body.velocity.x = 0;
	        //             this.body.velocity.y = 0;

	        //         } else if (this.moveTo) {
	        //             this.body.velocity.x = this.oldVelocityX;
	        //             this.body.velocity.y = this.oldVelocityY;
	        //             this.useCollision = this.oldUseCollision;
	        //             this.x = Math.floor(this.x)
	        //             this.y = Math.floor(this.y)
	        //             this.moveTo = false;

	        //             if (typeof this.positionCallback === 'function') {
	        //                 this.positionCallback.call(this.game, this);
	        //             }
	        //         }
	        //     }
	        // }

	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Rect;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Rect;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Text = function (_ObjectSettings2) {
	    _inherits(Text, _ObjectSettings2);

	    function Text(game, options) {
	        _classCallCheck(this, Text);

	        var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, game, options));

	        _this.type = "text";

	        _this.body = new _Body2.default(_this.game, _this);

	        _this.fontSize = options.fontSize || 36;

	        _this.color = options.color || 'black';

	        _this.text = options.text || 'Text';

	        _this.fontType = options.fontType || "Forte";

	        _this.useCollision = options.useCollision === undefined || !options.useCollision ? false : true;

	        _this.asImage = options.asImage || false;

	        _this.context.font = _this.fontSize + "px " + _this.fontType;

	        _this.textSize = _this.context.measureText(_this.text);

	        _this.width = _this.textSize.width;

	        _this.height = _this.fontSize;

	        _this.halfWidth = _this.textSize.width / 2;

	        _this.halfHeight = _this.fontSize / 2;

	        _this.useStroke = options.useStroke || false;

	        _this.strokeColor = options.strokeColor || '#333';

	        _this.strokeWidth = options.strokeWidth || 2;

	        if (_this.asImage) {
	            _this.generate();
	        }
	        return _this;
	    }

	    _createClass(Text, [{
	        key: 'generate',
	        value: function generate() {
	            var ctx = document.createElement("canvas").getContext("2d");
	            ctx.canvas.width = this.width;
	            ctx.canvas.height = this.height;

	            ctx.font = this.fontSize + "px " + this.fontType;
	            ctx.fillStyle = this.color;
	            ctx.fillText(this.text, 0, this.height / 1.27);

	            if (this.useStroke) {
	                ctx.lineWidth = this.strokeWidth;
	                ctx.strokeStyle = this.strokeColor;
	                ctx.strokeText(this.text, 0, this.height / 1.27);
	            }

	            this.cloneText = ctx.canvas;
	            ctx = null;
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            this.useThereAndBack();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();
	            // this.doInTimeHandler();
	        }
	    }, {
	        key: 'draw',
	        value: function draw(dt) {
	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.previousX) {
	                this.renderX = (this.x - this.previousX) * dt + this.previousX;
	            } else {
	                this.renderX = this.x;
	            }
	            if (this.previousY) {
	                this.renderY = (this.y - this.previousY) * dt + this.previousY;
	            } else {
	                this.renderY = this.y;
	            }

	            if (this.asImage) {
	                this.context.drawImage(this.cloneText, 0, //Math.floor(this.renderX), // + (this.game.camera.lerpAmount * dt)
	                0, //Math.floor(this.renderY), // + (this.game.camera.lerpAmount * dt)
	                this.width, this.height, this.renderX - (!this.static ? this.game.camera.xScroll : 0) * this.body.scale, this.renderY - (!this.static ? this.game.camera.yScroll : 0) * this.body.scale, this.width * this.body.scale, this.height * this.body.scale);
	            } else {
	                this.context.font = this.fontSize + "px " + this.fontType;
	                this.context.fillStyle = this.color;
	                this.context.fillText(this.text, this.x, this.y);
	                if (this.useStroke) {
	                    this.context.lineWidth = this.strokeWidth;
	                    this.context.strokeStyle = this.strokeColor;
	                    this.context.strokeText(this.text, this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0));
	                }
	            }

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	        }
	    }, {
	        key: 'redraw',
	        value: function redraw() {
	            this.context.fillStyle = this.color;
	            this.context.font = this.fontSize + "px " + this.fontType;
	            this.context.fillText(this.text, this.x, this.y);
	        }
	    }, {
	        key: 'add',
	        value: function add(count) {
	            this.text += count;
	        }
	    }, {
	        key: 'rem',
	        value: function rem(count) {
	            this.text -= count;
	        }
	    }, {
	        key: 'use',
	        value: function use(count) {
	            this.text = count;
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            return this.text;
	        }
	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'height' || key === 'width' || key === 'key' || key === 'scale') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Text;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Text;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Button = function (_ObjectSettings2) {
	    _inherits(Button, _ObjectSettings2);

	    function Button(game, options) {
	        _classCallCheck(this, Button);

	        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, game, options));

	        _this.type = "button";

	        _this.fontSize = options.fontSize || 42;
	        _this.fillStyle = options.fillStyle || 'black';
	        _this.fillStyleHover = options.fillStyleHover || '#666';
	        _this.strokeStyle = options.strokeStyle || null;
	        _this.strokeStyleHover = options.strokeStyleHover || null;
	        _this.textColor = options.textColor || 'white';
	        _this.textColorHover = options.textColorHover || 'white';
	        _this.borderWidth = options.borderWidth || 2;

	        _this.textMarginX = options.textMarginX || 0;
	        _this.textMarginY = options.textMarginY || 0;

	        _this.clickHold = options.clickHold || false;

	        _this.useCollision = options.useCollision || false;

	        _this.updateOfScreen = options.updateOfScreen || false;

	        _this.text = options.text || 'button';
	        _this.action = options.action || _this.defaultClick;
	        return _this;
	    }

	    _createClass(Button, [{
	        key: 'defaultClick',
	        value: function defaultClick() {
	            console.error("Do wlasciwosci 'action' przypisz funkcje jaka ma sie wykonac po kliknieciu");
	        }

	        // constructor(game, text, x, y, width, height, background, backgroundHover, strokeStyle, strokeStyleHover, textColor, action) {
	        //     super();

	        //     this.initializeGlobalSettings({
	        //         game: game,
	        //         pooled: false,
	        //         context: 'main',
	        //         x: x || 1,
	        //         y: y || 1,
	        //         key: null,
	        //         width: width,
	        //         height: height
	        //     });

	        //     this.fontSize = 42;
	        //     this.fillStyle = background;
	        //     this.fillStyleHover = backgroundHover;
	        //     this.strokeStyle = strokeStyle;
	        //     this.strokeStyleHover = strokeStyleHover;
	        //     this.textColor = textColor;
	        //     this.borderWidth = 2;

	        //     this.textMarginX = 0;
	        //     this.textMarginY = 0

	        //     this.clickHold = false;

	        //     this.text = text;
	        //     this.action = action;
	        //     this.zIndex = 5;

	        //     this.colors = ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"];
	        // }

	    }, {
	        key: 'update',
	        value: function update() {
	            var _this2 = this;

	            this.game.mouse.trigger(this, !this.static ? false : true, function () {
	                if (typeof _this2.action === 'function') {
	                    _this2.action.call(_this2.game, _this2);
	                }
	            }, this.clickHold);

	            this.game.mouse.onHover(this, !this.static ? false : true, null);
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.hovered) {
	                this.context.fillStyle = this.backgroundHover;
	                this.fillCol = this.fillStyleHover ? this.fillStyleHover : 'transparent';
	                this.strokeCol = this.strokeStyleHover;
	                this.textCol = this.textColorHover;
	            } else {
	                this.context.fillStyle = this.background;
	                this.fillCol = this.fillStyle ? this.fillStyle : 'transparent';
	                this.strokeCol = this.strokeStyle;
	                this.textCol = this.textColor;
	            }

	            //draw button
	            this.context.strokeStyle = this.strokeCol;
	            this.context.fillStyle = this.fillCol;

	            if (this.strokeStyle === null) {
	                this.context.fillRect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
	            } else if (this.fillStyle === null && this.fillStyleHover === null) {
	                this.context.beginPath();
	                this.context.rect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
	                this.context.lineWidth = this.borderWidth;
	                this.context.stroke();
	                this.context.closePath();
	            } else {
	                this.context.beginPath();
	                this.context.rect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
	                this.context.lineWidth = this.borderWidth;
	                this.context.stroke();
	                this.context.fill();
	                this.context.closePath();
	            }
	            //text options
	            this.context.fillStyle = this.textCol;
	            this.context.font = this.fontSize + "px Forte";
	            this.textSize = this.context.measureText(this.text);
	            //text position
	            var textX = this.x - (!this.static ? this.game.camera.xScroll : 0) + this.width / 2 - this.textSize.width / 2;
	            var textY = this.y - (!this.static ? this.game.camera.yScroll : 0) + this.height - this.height / 4;

	            //draw the text
	            this.context.fillText(this.text, textX + this.textMarginX, textY + this.textMarginY);
	            // this.context.fillText(this.text, textX - this.game.camera.xScroll, textY - this.game.camera.yScroll);
	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	        }
	    }, {
	        key: 'add',
	        value: function add(count) {
	            this.text += count;
	        }
	    }, {
	        key: 'rem',
	        value: function rem(count) {
	            this.text -= count;
	        }
	    }, {
	        key: 'use',
	        value: function use(count) {
	            this.text = count;
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            return this.text;
	        }
	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale' || key === 'clickHold') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Button;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Button;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bar = function (_ObjectSettings2) {
	    _inherits(Bar, _ObjectSettings2);

	    function Bar(game, options) {
	        _classCallCheck(this, Bar);

	        var _this = _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, game, options));

	        if (options.max === undefined || options.min === undefined) {
	            throw "Wymagane wlasciwości to 'min' i 'max'! dla Classy: " + _this.constructor.name;
	        }

	        _this.type = "bar";

	        _this.max = options.max;
	        _this.min = options.min > _this.max ? _this.error() : options.min;

	        _this.currentStatusX = _this.min;

	        _this.statusX = _this.currentStatusX / _this.max * _this.width;

	        _this.lineWidth = 1;

	        _this.strokeStyle = options.stroke || 'black';
	        _this.fillStyle = options.fill || 'green';

	        _this.useCollision = options.useCollision || false;
	        return _this;
	    }

	    _createClass(Bar, [{
	        key: "draw",
	        value: function draw(lag) {
	            if (this.objAlfa !== 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.previousX) {
	                this.renderX = (this.x - this.previousX) * lag + this.previousX;
	            } else {
	                this.renderX = this.x;
	            }
	            if (this.previousY) {
	                this.renderY = (this.y - this.previousY) * lag + this.previousY;
	            } else {
	                this.renderY = this.y;
	            }

	            this.context.fillStyle = this.fillStyle;

	            if (this.strokeStyle) {
	                this.context.beginPath();
	                this.context.strokeStyle = this.strokeStyle;
	                this.context.lineWidth = this.lineWidth;

	                this.context.rect(this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
	                this.context.stroke();
	                //this.context.fill();
	                this.context.closePath();
	            }
	            if (this.fillStyle) {
	                this.context.fillRect(this.renderX + this.lineWidth - (!this.static ? this.game.camera.xScroll : 0), this.renderY + this.lineWidth - (!this.static ? this.game.camera.yScroll : 0), this.statusX - this.lineWidth * 2 <= 0 ? 0 : this.statusX - this.lineWidth * 2, this.height - this.lineWidth * 2);
	            }

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }
	        }
	    }, {
	        key: "add",
	        value: function add(count) {
	            if (this.currentStatusX + count < this.max) {
	                this.currentStatusX = this.currentStatusX + count;
	            } else {
	                this.currentStatusX = this.max;
	            }

	            this.setStatusX(this.currentStatusX);
	        }
	    }, {
	        key: "rem",
	        value: function rem(count) {
	            if (this.currentStatusX - count > 0) {
	                this.currentStatusX = this.currentStatusX - count;
	            } else {
	                this.currentStatusX = 0;
	            }

	            this.setStatusX(this.currentStatusX);
	        }
	    }, {
	        key: "setStatusX",
	        value: function setStatusX(statusX) {
	            this.statusX = statusX / this.max * this.width;
	        }
	    }, {
	        key: "error",
	        value: function error() {
	            throw "Minimalna wartosc nie moze byc wieksza od maksymalnej";
	        }
	    }, {
	        key: "getProps",
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Bar;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Bar;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Rectangle = __webpack_require__(16);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Camera = function (_ObjectSettings2) {
	    _inherits(Camera, _ObjectSettings2);

	    function Camera(game, options) {
	        _classCallCheck(this, Camera);

	        var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, game, options));

	        if (!options.followed) {
	            throw "Wymagane wlasciwosci przy tworzeniu: " + _this.constructor.name + " to: \n'followed' -> obiekt śledzony \n";
	        }

	        _this.type = "camera";

	        _this.static = true;

	        _this.xScroll = options.xView || 0;
	        _this.yScroll = options.yView || 0;

	        _this.xDeadZone = 0; // min distance to horizontal borders
	        _this.yDeadZone = 0; // min distance to vertical borders

	        _this.wView = _this.game.width;
	        _this.hView = _this.game.height;

	        _this.axis = Camera.AXIS.BOTH;

	        _this.followed = options.followed;

	        _this.worldWidth = _this.game.width;

	        _this.worldHeight = _this.game.height;

	        _this.follow(_this.followed);

	        _this.viewportRect = new _Rectangle2.default(_this.xScroll, _this.yScroll, _this.wView, _this.hView);

	        _this.worldRect = new _Rectangle2.default(0, 0, _this.worldWidth, _this.worldHeight);
	        return _this;
	    }

	    _createClass(Camera, [{
	        key: 'update',
	        value: function update(dt) {
	            this.moveToPointHandler();
	            if (this.followed != null) {
	                if (this.axis === Camera.AXIS.HORIZONTAL || this.axis === Camera.AXIS.BOTH) {
	                    // moves camera on horizontal axis based on followed object position
	                    if (this.followed.renderX - this.xScroll + this.xDeadZone > this.wView) this.xScroll = this.followed.x - (this.wView - this.xDeadZone);else if (this.followed.renderX - this.xDeadZone < this.xScroll) this.xScroll = this.followed.x - this.xDeadZone;
	                }

	                if (this.axis === Camera.AXIS.VERTICAL || this.axis === Camera.AXIS.BOTH) {
	                    // moves camera on vertical axis based on followed object position
	                    if (this.followed.renderY - this.yScroll + this.yDeadZone > this.hView) this.yScroll = this.followed.y + this.followed.halfHeight - (this.hView - this.yDeadZone);else if (this.followed.renderY - this.yDeadZone < this.yScroll) this.yScroll = this.followed.y + this.followed.halfHeight - this.yDeadZone;
	                }
	            }

	            this.viewportRect.set(this.xScroll, this.yScroll);

	            if (!this.viewportRect.within(this.worldRect)) {
	                if (this.viewportRect.left < this.worldRect.left) this.xScroll = this.worldRect.left;
	                // if(this.viewportRect.top < this.worldRect.top)					
	                //     this.yScroll = this.worldRect.top;
	                if (this.xScroll >= this.game.portViewWidth - this.game.width) this.xScroll = this.game.portViewWidth - this.game.width;
	                if (this.yScroll < 0) this.yScroll = 0;
	                if (this.yScroll > this.game.portViewHeight - this.game.height) this.yScroll = this.game.portViewHeight - this.game.height;
	            }
	            this.game.physic.outOfScreen(this.game.gameObjects);
	        }
	    }, {
	        key: 'follow',
	        value: function follow(sprite, xDeadZone, yDeadZone) {
	            this.followed = sprite;
	            this.xDeadZone = xDeadZone === undefined ? this.game.width / 2 : xDeadZone;
	            this.yDeadZone = yDeadZone === undefined ? this.game.height / 2 : yDeadZone;
	        }
	    }, {
	        key: 'moveToPoint',
	        value: function moveToPoint(x, y, speed, callback) {
	            this.positionToMoveX = Math.floor(x);
	            this.positionToMoveY = Math.floor(y);
	            this.positionSpeed = speed;
	            this.followed = null;
	            this.moveTo = true;

	            this.positionCallback = callback;
	        }
	    }, {
	        key: 'moveToPointHandler',
	        value: function moveToPointHandler() {
	            if (this.moveTo) {
	                this.myX = Math.floor(this.xScroll + this.wView / 2);
	                this.myY = Math.floor(this.yScroll + this.hView / 2);

	                if (this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY)) {
	                    this.xScroll -= (this.myX - this.positionToMoveX) / this.positionSpeed;
	                    this.yScroll -= (this.myY - this.positionToMoveY) / this.positionSpeed;
	                } else if (this.moveTo) {
	                    this.xScroll = Math.floor(this.xScroll);
	                    this.yScroll = Math.floor(this.yScroll);
	                    this.moveTo = false;

	                    if (typeof this.positionCallback === 'function') {
	                        this.positionCallback.call(this.game, this);
	                    }
	                }

	                if (!this.viewportRect.within(this.worldRect)) {
	                    if (this.xScroll <= 0) this.positionToMoveX = this.myX;
	                    // if(this.viewportRect.top < this.worldRect.top)					
	                    //     this.yScroll = this.worldRect.top;
	                    // if(this.xScroll >= this.game.portViewWidth-this.game.width )
	                    //      this.positionToMoveX = this.myX
	                    if (this.yScroll < 0) this.positionToMoveY = this.myY;
	                    if (this.yScroll > this.game.portViewHeight - this.game.height) this.positionToMoveY = this.myY;
	                }
	            }
	        }
	    }]);

	    return Camera;
	}(_ObjectSettings4.default);

	Camera.AXIS = {
	    NONE: "none",
	    HORIZONTAL: "horizontal",
	    VERTICAL: "vertical",
	    BOTH: "both"
	};
	;

	exports.default = Camera;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Rectangle = function () {
	    function Rectangle(game, left, top, width, height) {
	        _classCallCheck(this, Rectangle);

	        this.left = left || 0;
	        this.top = top || 0;
	        this.width = width || 0;
	        this.height = height || 0;
	        this.right = this.left + this.width;
	        this.bottom = this.top + this.height;
	    }

	    _createClass(Rectangle, [{
	        key: "set",
	        value: function set(left, top, /*optional*/width, /*optional*/height) {
	            this.left = left;
	            this.top = top;
	            this.width = width || this.width;
	            this.height = height || this.height;
	            this.right = this.left + this.width;
	            this.bottom = this.top + this.height;
	        }
	    }, {
	        key: "within",
	        value: function within(r) {
	            return r.left <= this.left && r.right >= this.right && r.top <= this.top && r.bottom >= this.bottom;
	        }
	    }, {
	        key: "overlaps",
	        value: function overlaps(r) {
	            return this.left < r.right && r.left < this.right && this.top < r.bottom && r.top < this.bottom;
	        }
	    }]);

	    return Rectangle;
	}();

	;

	exports.default = Rectangle;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dialog = function (_ObjectSettings2) {
	    _inherits(Dialog, _ObjectSettings2);

	    function Dialog(game, options) {
	        _classCallCheck(this, Dialog);

	        var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, game, options));

	        _this.onClose = function () {
	            _this.objs.reverse().forEach(function (obj) {
	                obj.fadeOut(_this.toggleTime, function () {
	                    obj.destroy();
	                    console.log(_this.game.gameObjects);
	                });
	            });
	        };

	        if (!options.x || !options.y || !options.fill || !options.width || !options.height) {
	            throw "Wymagane jest podanie: \n 'x'\n 'y'\n 'fill'\n 'width'\n 'height'\n przy tworzeniu: " + _this.constructor.name;
	        }

	        _this.close = options.close || false;

	        _this.objs = [];

	        _this.type = "dialog";

	        _this.toggleTime = 400;

	        _this.objs.push(_this);

	        _this.objs.push(_this.game.add.rect(options));

	        if (_this.close) {
	            _this.objs.push(_this.game.add.button({
	                x: _this.x + _this.width - 50,
	                y: _this.y,
	                width: 50,
	                height: 50,
	                text: 'X',
	                textColor: 'black',
	                textColorHover: 'red',
	                fillStyle: 'transparent',
	                fillStyleHover: 'transparent',
	                action: _this.onClose,
	                static: _this.static
	            }));
	        }
	        return _this;
	    }

	    _createClass(Dialog, [{
	        key: "draw",
	        value: function draw(dt) {
	            if (this.objAlfa !== 1 && this.game.ctx.globalAlpha === 1) {
	                this.game.ctx.save();
	                this.game.ctx.globalAlpha = this.objAlfa;
	            }

	            if (this.objAlfa !== 1) {
	                this.game.ctx.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	        }
	    }, {
	        key: "add",
	        value: function add(type) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            options.x = this.x + (options.x || 0);
	            options.y = this.y + (options.y || 0);

	            this.objs.push(this.game.add[type](options));

	            return this;
	        }
	    }, {
	        key: "getProps",
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale' || key === 'onClose' || key === 'objs') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Dialog;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;
	// constructor(game, context, x, y, width, height, strokeColor, fillColor) {
	//     super();

	//     this.initializeGlobalSettings({
	//         game: game,
	//         pooled: false,
	//         context: context || 'main',
	//         x: x || 1,
	//         y: y || 1,
	//         key: null,
	//         width: width,
	//         height: height
	//     });

	//     this.objAlfa = 0;
	//     this.toggleTime = 1000;

	//     this.obj = [];

	//     this.zIndex = 10;
	//     this.strokeColor = strokeColor;
	//     this.fillColor = fillColor;

	//     this.border = this.game.add.rect('main', this.x, this.y, this.currentWidth, this.currentHeight, this.strokeColor, this.fillColor);
	//     this.border.static = true;
	//     this.border.objAlfa = 0;
	//     this.border.zIndex = 10;

	//     this.button1 = this.game.add.button('Menu', this.x + 110, this.y + this.currentHeight - 80, 180, 60, null, null, 'black', 'green', '#333', () => this.buttonDefaultAction());
	//     this.button1.static = true;
	//     this.button1.objAlfa = 0;
	//     this.button1.zIndex = 11;

	//     this.button2 = this.game.add.button('Ok', this.x + this.currentWidth - 290, this.y + this.currentHeight - 80, 180, 60, null, null, 'black', 'green', '#333', () => this.buttonDefaultAction());
	//     this.button2.static = true;
	//     this.button2.objAlfa = 0;
	//     this.button2.zIndex = 11;

	//     this.headline = this.game.add.text('main', 'Jestem tytułem', this.x + 200, this.y + 60, 44, '#333', null);
	//     this.headline.static = true;
	//     this.headline.objAlfa = 0;
	//     this.headline.zIndex = 11;
	// }

	// draw(dt) {
	//     if (this.objAlfa < 1.1 && this.game.ctx.globalAlpha === 1) {
	//         this.border.objAlfa = this.objAlfa;
	//         this.button1.objAlfa = this.objAlfa;
	//         this.button2.objAlfa = this.objAlfa;
	//         this.headline.objAlfa = this.objAlfa;
	//         if (this.closeButton) {
	//             this.closeButton.objAlfa = this.objAlfa;
	//         }
	//         for (var i = 0; i < this.obj.length; i++) {
	//             this.obj[i].objAlfa = this.objAlfa;
	//         }
	//         this.objAlfa = 1.1

	//         this.fadeInHandler();
	//     }

	//     this.fadeOutHandler();
	// }

	// toggle(bool) {
	//     if (!bool) {
	//         this.border.used = false;
	//         this.button1.used = false;
	//         this.button2.used = false;
	//     } else {
	//         this.border.used = true;
	//         this.button1.used = true;
	//         this.button2.used = true;
	//     }
	// }

	// buttonDefaultAction() {
	//     alert('dodaj akcje do tego przycisku przy konfiguracji. action: function')
	// }

	// configure(options = {}) {
	//     this.toggleTime = options.toggleTime || 400;


	//     //let alfa = options.alfa || 1;
	//     let borderWidth = options.borderWidth || 1;
	//     this.used = options.used === false ? false : true;
	//     this.toggle(this.used);
	//     this.main = options.main || null;


	//     if (options.close) {
	//         this.closeButton = this.game.add.button('X', this.x + this.currentWidth - 45, this.y, 45, 45, null, 'red', 'black', 'black', '#333', () => this.close());
	//         this.closeButton.static = true;
	//         this.closeButton.objAlfa = 0;
	//         this.closeButton.zIndex = 11;

	//     }

	//     this.fadeIn(this.toggleTime, () => {

	//     })

	//     if (options.button1) {
	//         this.button1.text = options.button1.text || 'Menu';
	//         this.button1.currentWidth = options.button1.width || 180;
	//         this.button1.currentHeight = options.button1.height || 60;
	//         this.button1.strokeStyle = options.button1.strokeColor || '#333';
	//         this.button1.strokeStyleHover = options.button1.strokeColorHover || 'green';
	//         this.button1.fillStyle = options.button1.fillColor || null;
	//         this.button1.fillStyleHover = options.button1.fillColorHover || null;
	//         this.button1.textColor = options.button1.textColor || '#333';
	//         this.button1.borderWidth = options.button1.borderWidth || 2;
	//         this.button1.action = options.button1.action || this.buttonDefaultAction;
	//         this.button1.used = options.button1.used === false ? false : true;
	//     }
	//     if (options.button2) {
	//         this.button2.text = options.button2.text || 'Menu';
	//         this.button2.currentWidth = options.button2.width || 180;
	//         this.button2.currentHeight = options.button2.height || 60;
	//         this.button2.strokeStyle = options.button2.strokeColor || '#333';
	//         this.button2.strokeStyleHover = options.button2.strokeColorHover || 'green';
	//         this.button2.fillStyle = options.button2.fillColor || null;
	//         this.button2.fillStyleHover = options.button2.fillColorHover || null;
	//         this.button2.textColor = options.button2.textColor || '#333';
	//         this.button2.borderWidth = options.button2.borderWidth || 2;
	//         this.button2.action = options.button2.action || this.buttonDefaultAction;
	//         this.button2.used = options.button2.used === false ? false : true;
	//     }
	//     if (options.headline) {
	//         this.headline.text = options.headline.text || 'Jestem tytułem';
	//         this.headline.x = this.x + options.headline.x || this.x + 200;
	//         this.headline.y = this.y + options.headline.y || this.y + 60;
	//         this.headline.size = options.headline.size || 42;
	//         this.headline.color = options.headline.color || '#333';
	//     }
	//     this.border.setBorderWidth(borderWidth);
	//     //this.border.setAlfa(alfa);

	//     if (this.main) {
	//         this.main.call(this, this);
	//     }
	// }

	// add(obj) {
	//     if (typeof obj !== 'object') {
	//         return console.error('oczekiwano obiektu!');
	//     } else {
	//         this.obj.push(obj);
	//     }
	// }

	// close() {
	//     this.fadeOut(this.toggleTime, () => {
	//         this.destroy();
	//         this.border.destroy();
	//         this.button1.destroy();
	//         this.button2.destroy();
	//         if (this.closeButton) {
	//             this.closeButton.destroy();
	//         }
	//         this.headline.destroy();

	//         for (var i = 0; i < this.obj.length; i++) {
	//             this.obj[i].destroy();
	//         }
	//         this.obj = [];
	//     })
	// }

	exports.default = Dialog;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DoublyLinkedList = __webpack_require__(19);

	var _DoublyLinkedList2 = _interopRequireDefault(_DoublyLinkedList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Group = function () {
	    function Group(game) {
	        _classCallCheck(this, Group);

	        this.game = game;
	        this.entities = [];
	        this.indexes = new _DoublyLinkedList2.default();
	    }

	    _createClass(Group, [{
	        key: 'add',
	        value: function add(object, hide) {
	            this.entities.push(object);
	            this.indexes.append(this.entities.length - 1);

	            object.groupIndex = this.entities.length - 1;

	            if (hide) {
	                object.hide();
	            }
	        }
	    }, {
	        key: 'spawn',
	        value: function spawn() {
	            if (this.indexes.view() !== 'list is empty') {
	                var index = this.indexes.viewAt(0);
	                var entity = this.entities[index];

	                if (entity) {
	                    entity.show();

	                    this.indexes.removeAt(0);
	                    return entity;
	                } else {
	                    return false;
	                }
	            }
	        }
	    }, {
	        key: 'recycle',
	        value: function recycle(object) {
	            object.hide();
	            this.indexes.append(object.groupIndex);
	        }
	    }]);

	    return Group;
	}();

	;

	exports.default = Group;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DoublyLinkedList = function () {
	    function DoublyLinkedList() {
	        _classCallCheck(this, DoublyLinkedList);

	        this.size = 0;
	        this.head = null;
	        this.tail = null;
	    }

	    _createClass(DoublyLinkedList, [{
	        key: 'node',
	        value: function node(element) {
	            this.element = element;
	            this.next = null;
	            this.prev = null;
	        }
	    }, {
	        key: 'view',
	        value: function view() {
	            var current = this.head;
	            var string = '';

	            while (current) {
	                string += current.element + ", ";
	                current = current.next;
	            }
	            if (string === '') {
	                return "list is empty";
	            } else {
	                return string;
	            }
	        }
	    }, {
	        key: 'append',
	        value: function append(element) {
	            var node = new this.node(element);

	            if (this.size === 0) {
	                this.head = node;
	                this.tail = node;
	            } else {
	                this.tail.next = node;
	                node.prev = this.tail;
	                this.tail = node;
	            }
	            this.size++;
	        }
	    }, {
	        key: 'viewAt',
	        value: function viewAt(position) {
	            if (position >= 0 && position <= this.size) {
	                var current = this.head;
	                var index = 0;
	                while (position > index) {
	                    current = current.next;
	                    index++;
	                }
	                return current.element;
	            } else {
	                return "no such position on list";
	            }
	        }
	    }, {
	        key: 'insertAt',
	        value: function insertAt(position, element) {
	            var node = new this.node(element);
	            var current = this.head;
	            var index = 0;
	            var previous = void 0;
	            if (position >= 0 && position <= this.size) {
	                if (position === 0) {
	                    if (this.size === 0) {
	                        this.head = node;
	                        this.tail = node;
	                    } else {
	                        node.next = this.head;
	                        this.head.prev = node;
	                        this.head = node;
	                    }
	                } else if (position === this.size) {
	                    this.tail.next = node;
	                    node.prev = this.tail;
	                    this.tail = node;
	                } else {
	                    while (index < position) {
	                        previous = current;
	                        current = current.next;
	                        index++;
	                    }
	                    node.next = current;
	                    previous.next = node;
	                    node.prev = previous;
	                    current.prev = node;
	                }
	                this.size++;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'removeAt',
	        value: function removeAt(position) {
	            if (position >= 0 && position <= this.size) {
	                var current = this.head;
	                var index = 0;
	                var previous = void 0;
	                if (position === 0) {
	                    if (this.size === 1) {
	                        this.head = null;
	                        this.tail = null;
	                    } else {
	                        this.head = current.next;
	                        this.head.prev = null;
	                    }
	                } else if (position === this.size - 1) {
	                    current = this.tail;
	                    this.tail = current.prev;
	                    this.tail.next = null;
	                } else {
	                    while (index < position) {
	                        previous = current;
	                        current = current.next;
	                        index++;
	                    }
	                    previous.next = current.next;
	                    current.next.prev = previous;
	                }
	                this.size--;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'viewReverse',
	        value: function viewReverse() {
	            var current = this.tail;
	            var returnString = '';
	            if (this.size != 0) {
	                while (current) {
	                    returnString += current.element + ", ";
	                    current = current.prev;
	                }
	                return returnString;
	            } else {
	                return "this list is empty";
	            }
	        }
	    }]);

	    return DoublyLinkedList;
	}();

	;

	exports.default = DoublyLinkedList;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AssetManager = __webpack_require__(2);

	var _AssetManager2 = _interopRequireDefault(_AssetManager);

	var _MapDrawLayers = __webpack_require__(21);

	var _MapDrawLayers2 = _interopRequireDefault(_MapDrawLayers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Map = function () {
	    function Map(game, options) {
	        _classCallCheck(this, Map);

	        if (!options || !options.json || !options.key) {
	            throw "Przy tworzeniu mapy wymagane jest podanie klucza 'json' z adresem do pliku json i klucza 'key' z nazwa zaimportowanego obrazka";
	        }
	        this.game = game;
	        this.jsonPath = options.json;
	        this.image = _AssetManager2.default.get(options.key);
	        this.used = true;
	        this.type = 'map';
	        this.zIndex = 1;
	    }

	    _createClass(Map, [{
	        key: 'getJson',
	        value: function getJson(jsonPath) {
	            return fetch(jsonPath).then(function (map) {
	                return map.json();
	            }).then(function (map) {
	                return map;
	            });
	        }
	    }, {
	        key: 'generateTwoDimensionalLayers',
	        value: function generateTwoDimensionalLayers(mapData) {
	            var twoDimensionalLayers = [];

	            mapData.layers.forEach(function (layer) {
	                var twoDimensional = [];
	                var mapDataLayers = layer.data;
	                var k = -1;

	                for (var i = 0; i < mapDataLayers.length; i++) {
	                    if (i % mapData.width === 0) {
	                        k++;
	                        twoDimensional[k] = [];
	                    }
	                    twoDimensional[k].push(mapDataLayers[i]);
	                }
	                twoDimensionalLayers.push({ layer: twoDimensional });
	            });

	            return twoDimensionalLayers;
	        }
	    }, {
	        key: 'generateTilesAndEmptyArrays',
	        value: function generateTilesAndEmptyArrays(layers) {
	            var tilesLayers = [];
	            var emptySpacesLayers = [];

	            var mapData = this.getMapData();
	            var mapDataTiles = mapData.tilesets[0].tiles || [];

	            layers.forEach(function (layer) {
	                var tilesArray = [];
	                var emptySpaces = [];

	                for (var i = 0; i < layer.layer.length; i++) {
	                    tilesArray[i] = [];
	                    for (var j = 0; j < layer.layer[i].length; j++) {

	                        var tile = {};
	                        tile.row = j;
	                        tile.column = i;
	                        tile.x = j * mapData.tileheight;
	                        tile.y = i * mapData.tilewidth;
	                        tile.tileX = (layer.layer[i][j] - 1) % mapData.tilesets[0].columns * mapData.tilewidth;
	                        tile.tileY = Math.floor((layer.layer[i][j] - 1) / mapData.tilesets[0].columns) * mapData.tileheight;
	                        tile.type = !mapDataTiles[layer.layer[i][j] - 1] ? 'empty' : mapDataTiles[layer.layer[i][j] - 1].type;
	                        tile.id = layer.layer[i][j] - 1;
	                        tile.width = mapData.tilewidth;
	                        tile.height = mapData.tileheight;

	                        if (tile.type === 'empty') {
	                            emptySpaces.push(tile);
	                        }
	                        tilesArray[i].push(tile);
	                    }
	                }
	                tilesLayers.push({ tilesLayer: tilesArray, emptySpacesLayer: emptySpaces });
	            });

	            return tilesLayers;
	        }
	    }, {
	        key: 'generateMapAsImage',
	        value: function generateMapAsImage(mapTilesLayers) {
	            var _this = this;

	            this.mapImages = [];
	            var mapData = this.getMapData();
	            var zIndex = 0;

	            mapTilesLayers.forEach(function (map, index) {
	                zIndex = 2;
	                var ctx = document.createElement("canvas").getContext("2d");
	                ctx.canvas.width = mapData.tilewidth * mapData.width;
	                ctx.canvas.height = mapData.tileheight * mapData.height;

	                for (var i = 0; i < map.tilesLayer.length; i++) {
	                    // 
	                    for (var j = 0; j < map.tilesLayer[i].length; j++) {
	                        // 
	                        ctx.drawImage(_this.image, map.tilesLayer[i][j].tileX, map.tilesLayer[i][j].tileY, mapData.tilewidth, mapData.tileheight, j * map.tilesLayer[i][j].height, i * map.tilesLayer[i][j].width, mapData.tilewidth, mapData.tileheight);
	                    }
	                }
	                if (mapData.layers[index].properties) {
	                    zIndex = mapData.layers[index].properties['zIndex'] || 2;
	                }

	                _this.mapImages.push({ map: ctx.canvas, zIndex: zIndex });
	                ctx = null;
	            });
	            this.mapImages.forEach(function (image) {
	                new _MapDrawLayers2.default(_this.game, {
	                    mapImages: image.map,
	                    zIndex: image.zIndex
	                });
	            });
	        }
	    }, {
	        key: 'getPoint',
	        value: function getPoint(centerX, centerY, width, height, angle) {
	            /// get distance from center to point

	            var diffX = width - centerX;
	            var diffY = height - centerY;
	            var dist = Math.sqrt(diffX * diffX + diffY * diffY);
	            // const ca = Math.atan2(diffY, diffX) * 180 / Math.PI;
	            // const na = ((ca + angle * 180 / Math.PI) % 360) * Math.PI / 180;

	            /// find angle from pivot to corner
	            var ca = Math.atan2(diffY, diffX);

	            /// get new angle based on old + current delta angle
	            var na = ca + angle;

	            /// get new x and y and round it off to integer
	            var x = centerX + dist * Math.cos(na) + 0.5 | 0;
	            var y = centerY + dist * Math.sin(na) + 0.5 | 0;

	            return { x: x, y: y };
	        }

	        // draw(dt) {
	        //     if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	        //         this.context.save();
	        //         this.context.globalAlpha = this.objAlfa;
	        //     }

	        //     this.mapImages.forEach((image) => {
	        //         this.context.drawImage(
	        //             image.map,
	        //             this.game.camera.xScroll || 0,
	        //             this.game.camera.yScroll || 0,
	        //             this.game.width,
	        //             this.game.height,
	        //             0,
	        //             0,
	        //             this.game.width,
	        //             this.game.height,
	        //         )
	        //     })


	        //     if (this.objAlfa !== 1) {
	        //         this.context.restore();
	        //     }
	        // }

	    }, {
	        key: 'getPosition',
	        value: function getPosition(sprite) {
	            var mapData = this.getMapData();
	            var row = Math.floor(sprite.x / mapData.tilewidth);
	            var column = Math.floor(sprite.y / mapData.tileheight);
	            return this.getTile(row, column);
	        }
	    }, {
	        key: 'getNextPosition',
	        value: function getNextPosition(skeleton) {
	            var _this2 = this;

	            var mapData = this.getMapData();
	            //
	            var sk = Object.keys(skeleton).map(function (key) {
	                var rowMiddle = Math.floor(skeleton[key].x / mapData.tilewidth);
	                var columnMiddle = Math.floor(skeleton[key].y / mapData.tileheight);
	                return _this2.getTile(rowMiddle, columnMiddle);
	            });
	            for (var j = 0; j < sk.length; j++) {
	                for (var i = 0; i < sk[j].length; i++) {
	                    if (!sk[j][i]) {
	                        return false;
	                    } else if (sk[j][i].type === 'solid') {
	                        return false;
	                    }
	                }
	            }
	            return true;
	        }
	    }, {
	        key: 'getTile',
	        value: function getTile(row, column) {
	            var tiles = this.mapTilesLayers.map(function (map) {
	                if (map.tilesLayer[column] && map.tilesLayer[column][row]) {
	                    return map.tilesLayer[column][row];
	                } else {
	                    return false;
	                }
	            });

	            return tiles;
	        }
	    }, {
	        key: 'replaceGrid',
	        value: function replaceGrid() {}
	    }, {
	        key: 'getImageMap',
	        value: function getImageMap() {
	            return this.imageMap;
	        }
	    }, {
	        key: 'getMapData',
	        value: function getMapData() {
	            return this.mapData;
	        }
	    }, {
	        key: 'setMapData',
	        value: function setMapData(map) {
	            this.mapData = map;
	        }

	        // for (let j = 0; j < this.mapData.layers[0].data[i].length; j++) {
	        //     console.log(arr[i][j])
	        //     // let tile = {};
	        //     // tile.x = ((arr[i][j] - 1) % 13) * 72;
	        //     // tile.y = (Math.floor((arr[i][j] - 1) / 13)) * 72;

	        //     // if (this.tiles[arr[i][j] - 1]) {
	        //     //     tile.type = !this.tiles[arr[i][j] - 1].type ? 'empty' : this.tiles[arr[i][j] - 1].type;
	        //     // } else {
	        //     //     tile.type = 'empty';
	        //     // }
	        //     // this.tilesMap[i].push(tile);
	        // }

	        // generate() {
	        //     let ctx = document.createElement("canvas").getContext("2d");
	        //     console.log(this.mapData)
	        //     ctx.canvas.width = this.mapData.width * this.mapData.tilewidth;
	        //     ctx.canvas.height = this.mapData.height * this.mapData.tileheight;

	        //     for (let i = 0; i < this.tilesMap.length; i++) {
	        //         // 
	        //         for (let j = 0; j < this.tilesMap[i].length; j++) {
	        //             // 
	        //             ctx.drawImage(
	        //                 this.image,
	        //                 this.tilesMap[i][j].x,
	        //                 this.tilesMap[i][j].y,
	        //                 this.w,
	        //                 this.h,
	        //                 Math.floor((j * (this.currentWidth)) - (this.game.camera.xScroll ? this.game.camera.xScroll : 0)),
	        //                 Math.floor((i * (this.currentHeight)) - (this.game.camera.yScroll ? this.game.camera.yScroll : 0)),
	        //                 (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.tilesMap[i].length)),
	        //                 (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.tilesMap.length))
	        //             );
	        //         }
	        //     }

	        //     // this.cloneText = ctx.canvas;
	        //     // ctx = null;
	        // }

	        // generate() {
	        //     let ctx = document.createElement("canvas").getContext("2d");
	        //     ctx.canvas.width = this.tilesMap[0].length * 70;
	        //     ctx.canvas.height = this.tilesMap.length * 70;

	        //     for (let i = 0; i < this.tilesMap.length; i++) {
	        //         // 
	        //         for (let j = 0; j < this.tilesMap[i].length; j++) {
	        //             // 
	        //             ctx.drawImage(
	        //                 this.image,
	        //                 this.tilesMap[i][j].x,
	        //                 this.tilesMap[i][j].y,
	        //                 this.w,
	        //                 this.h,
	        //                 Math.floor((j * (this.currentWidth)) - (this.game.camera.xScroll ? this.game.camera.xScroll : 0)),
	        //                 Math.floor((i * (this.currentHeight)) - (this.game.camera.yScroll ? this.game.camera.yScroll : 0)),
	        //                 (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.tilesMap[i].length)),
	        //                 (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.tilesMap.length))
	        //             );
	        //         }
	        //     }

	        //     this.imageMap = new Image();
	        //     this.imageMap.src = ctx.canvas.toDataURL("image/png");

	        //     ctx = null;
	        // }

	    }]);

	    return Map;
	}();

	exports.default = Map;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MapDrawLayers = function (_ObjectSettings2) {
	    _inherits(MapDrawLayers, _ObjectSettings2);

	    function MapDrawLayers(game, options) {
	        _classCallCheck(this, MapDrawLayers);

	        var _this = _possibleConstructorReturn(this, (MapDrawLayers.__proto__ || Object.getPrototypeOf(MapDrawLayers)).call(this, game, options));

	        _this.game = game;
	        _this.mapImages = options.mapImages;
	        _this.zIndex = options.zIndex;
	        _this.type = 'layers';
	        _this.static = true;

	        return _this;
	    }

	    _createClass(MapDrawLayers, [{
	        key: 'draw',
	        value: function draw(dt) {

	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            this.context.drawImage(this.mapImages, this.game.camera.xScroll || 0, this.game.camera.yScroll || 0, this.game.width, this.game.height, 0, 0, this.game.width, this.game.height);

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }
	        }
	    }]);

	    return MapDrawLayers;
	}(_ObjectSettings4.default);

	;

	exports.default = MapDrawLayers;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Physic = function () {
	    function Physic(game) {
	        _classCallCheck(this, Physic);

	        this.game = game;
	    }

	    _createClass(Physic, [{
	        key: 'outOfScreen',
	        value: function outOfScreen(item, callback) {
	            if (Array.isArray(item)) {
	                for (var i = 0, max = item.length; i < max; i++) {
	                    if (item[i] && item[i].used && !item[i].static) {
	                        this.outOfScreenHandler(item[i], callback);
	                    }
	                }
	            } else {
	                this.outOfScreenHandler(item, callback);
	            }
	        }
	        // Poprawic by dzialaly poprawnie wszystkie kierunki

	    }, {
	        key: 'outOfScreenHandler',
	        value: function outOfScreenHandler(item, callback) {
	            if (item) {
	                if (item.type === 'CAMERA') {
	                    return false;
	                }
	                if (!item.isOutOfScreen) {
	                    if (item.y >= this.game.height + this.game.camera.yScroll || item.y + item.height <= 0 + this.game.camera.yScroll) {
	                        item.isOutOfScreen = true;

	                        if (typeof callback === 'function') {
	                            return callback.call(this, item);
	                        }
	                    } else if (item.x >= this.game.width + this.game.camera.xScroll || item.x + item.width <= 0 + this.game.camera.xScroll) {
	                        item.isOutOfScreen = true;
	                        if (typeof callback === 'function') {
	                            return callback.call(this, item);
	                        }
	                    }
	                } else if (item.isOutOfScreen) {
	                    if (item.x < this.game.width + this.game.camera.xScroll && item.x + item.width > 0 + this.game.camera.xScroll && item.y < this.game.height + this.game.camera.yScroll && item.y + item.height > 0 + this.game.camera.yScroll) {
	                        return item.isOutOfScreen = false;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'overlap',
	        value: function overlap(obj1, obj2, margin, callback, bounds) {
	            if (!obj1 || !obj2 || Array.isArray(obj1) && obj1.length <= 0 || Array.isArray(obj2) && obj2.length <= 0) {
	                return false;
	            }
	            if (!Array.isArray(obj1) && Array.isArray(obj2)) {
	                if ((typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) === 'object') {
	                    for (var i = 0, max = obj2.length; i < max; i++) {
	                        if (obj2[i] !== null && obj1 !== null && obj1 !== obj2[i]) {
	                            this.collectedHandler(obj1, obj2[i], margin, callback, bounds);
	                        }
	                    }
	                } else {
	                    throw 'overlap(): oczekiwano obiektu jako pierwszy parametr';
	                }
	            }
	            if (Array.isArray(obj1) && !Array.isArray(obj2)) {
	                if ((typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) === 'object') {
	                    for (var _i = 0, _max = obj1.length; _i < _max; _i++) {
	                        this.collectedHandler(obj1[_i], obj2, margin, callback, bounds);
	                    }
	                } else {
	                    throw 'overlap(): oczekiwano obiektu jako drugi parametr';
	                }
	            }
	            if (Array.isArray(obj1) && Array.isArray(obj2)) {
	                for (var _i2 = 0, _max2 = obj1.length; _i2 < _max2; _i2++) {
	                    if (obj1[_i2]) {
	                        obj1[_i2].checked = false;
	                    } else {
	                        return false;
	                    }
	                    for (var j = 0, max1 = obj2.length; j < max1; j++) {
	                        if (obj2[j]) {
	                            obj2[j].checked = false;
	                            this.collectedHandler(obj1[_i2], obj2[j], margin, callback, bounds);
	                        } else {
	                            return false;
	                        }
	                    }
	                }
	            }
	            if (!Array.isArray(obj1) && !Array.isArray(obj2)) {
	                obj1.checked = false;
	                obj2.checked = false;
	                this.collectedHandler(obj1, obj2, margin, callback, bounds);
	            }
	        }
	    }, {
	        key: 'collectedHandler',
	        value: function collectedHandler(entity1, entity2, margin, callback, bounds) {
	            if (entity1 != entity2 && entity1 && entity2) {
	                if (entity1.useCollision && entity2.useCollision) {
	                    var vX = entity1.x + (entity1.halfWidth - margin) - (entity2.x + (entity2.halfWidth - margin)),
	                        vY = entity1.y + (entity1.halfHeight - margin) - (entity2.y + (entity2.halfHeight - margin)),
	                        hWidths = entity1.halfWidth - margin + (entity2.halfWidth - margin),
	                        hHeights = entity1.halfHeight - margin + (entity2.halfHeight - margin),
	                        colDir = null;

	                    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
	                        if (typeof callback === 'function') {
	                            return callback.call(this, this, entity1, entity2, colDir);
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'collide',
	        value: function collide(obj1, obj2, callback, bounds) {
	            if (!obj1 || !obj2 || Array.isArray(obj1) && obj1.length <= 0 || Array.isArray(obj2) && obj2.length <= 0) {
	                return false;
	            }
	            if (!Array.isArray(obj1) && Array.isArray(obj2)) {
	                if ((typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) === 'object') {
	                    for (var i = 0, max = obj2.length; i < max; i++) {
	                        if (obj2[i] !== null && obj2[i].used) this.collideHandler(obj1, obj2[i], callback, bounds);
	                    }
	                } else {
	                    throw 'oczekiwano obiektu jako pierwszy parametr';
	                }
	            }
	            if (Array.isArray(obj1) && !Array.isArray(obj2)) {
	                if ((typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) === 'object') {
	                    for (var _i3 = 0, _max3 = obj1.length; _i3 < _max3; _i3++) {
	                        this.collideHandler(obj1[_i3], obj2, callback, bounds);
	                    }
	                } else {
	                    throw 'oczekiwano obiektu jako drugi parametr';
	                }
	            }
	            if (Array.isArray(obj1) && Array.isArray(obj2)) {
	                for (var _i4 = 0, _max4 = obj1.length; _i4 < _max4; _i4++) {
	                    if (obj1[_i4] && obj1[_i4].used) {
	                        obj1[_i4].checked = false;
	                    }
	                    for (var j = 0, max1 = obj2.length; j < max1; j++) {
	                        if (obj2[j] && obj2[j].used) {
	                            obj2[j].checked = false;

	                            this.collideHandler(obj1[_i4], obj2[j], callback, bounds);
	                        }
	                    }
	                }
	            }
	            if (!Array.isArray(obj1) && !Array.isArray(obj2)) {
	                obj1.checked = false;
	                obj2.checked = false;
	                this.collideHandler(obj1, obj2, callback, bounds);
	            }
	        }
	    }, {
	        key: 'collideHandler',
	        value: function collideHandler(entity1, entity2, callback, bounds) {
	            if (entity1 && entity2 && entity1 != entity2) {
	                //if(!entity1.checked && !entity2.checked && entity1.useCollision && entity2.useCollision){
	                if (entity1.useCollision && entity2.useCollision) {

	                    var vX = entity1.x + entity1.halfWidth - (entity2.x + entity2.halfWidth),
	                        vY = entity1.y + entity1.halfHeight - (entity2.y + entity2.halfHeight),
	                        hWidths = entity1.halfWidth + entity2.halfWidth,
	                        hHeights = entity1.halfHeight + entity2.halfHeight,
	                        colDir = null;

	                    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
	                        var oX = hWidths - Math.abs(vX),
	                            oY = hHeights - Math.abs(vY);

	                        if (oX >= oY) {
	                            if (vY > 0) {
	                                colDir = "t";
	                                entity1.y += entity1.body.immoveable ? oY : 0;
	                                entity2.y -= entity2.body.immoveable ? oY : 0;

	                                entity1.body.velocity.y = bounds ? entity1.body.velocity.y * -1 : entity1.body.velocity.y;
	                                entity2.body.velocity.y = bounds ? entity2.body.velocity.y * -1 : entity2.body.velocity.y;
	                            } else {
	                                colDir = "b";
	                                entity1.y -= entity1.body.immoveable ? oY : 0;
	                                entity2.y += entity2.body.immoveable ? oY : 0;

	                                //entity1.body.falling = false;
	                                //entity1.body.jumping = false;
	                                entity1.body.velocity.y = bounds ? entity1.body.velocity.y * -1 : 0;
	                                entity2.body.velocity.y = bounds ? entity2.body.velocity.y * -1 : entity2.body.velocity.y;
	                            }
	                        } else {
	                            if (vX > 0) {
	                                colDir = "l";
	                                entity1.x += entity1.body.immoveable ? oX : 0;
	                                entity2.x -= entity2.body.immoveable ? oX : 0;
	                                entity2.body.pushedLeft = !entity2.body.pushedLeft ? true : false;
	                                entity1.body.velocity.x = bounds ? entity1.body.velocity.x * -1 : entity1.body.velocity.x;
	                                entity2.body.velocity.x = bounds ? entity2.body.velocity.x * -1 : entity2.body.velocity.x;
	                            } else {
	                                colDir = "r";
	                                entity1.x -= entity1.body.immoveable ? oX : 0;
	                                entity2.x += entity2.body.immoveable ? oX : 0;
	                                entity2.body.pushedRight = !entity2.body.pushedRight ? true : false;
	                                entity1.body.velocity.x = bounds ? entity1.body.velocity.x * -1 : entity1.body.velocity.x;
	                                entity2.body.velocity.x = bounds ? entity2.body.velocity.x * -1 : entity2.body.velocity.x;
	                            }
	                        }
	                        if (colDir != null) {
	                            entity1.checked = true;
	                            entity2.checked = true;

	                            if (typeof callback === 'function') {
	                                return callback.call(this, entity1, entity2, colDir, oY, oX);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'inRange',
	        value: function inRange(circle, rect, radius, callback) {
	            if (Array.isArray(rect)) {
	                for (var i = 0, max = rect.length; i < max; i++) {
	                    this.rectCircleColliding(circle, rect[i], radius, callback);
	                }
	            } else {
	                this.rectCircleColliding(circle, rect, radius, callback);
	            }
	        }
	    }, {
	        key: 'rectCircleColliding',
	        value: function rectCircleColliding(circle, rect, radius, callback) {
	            var distX = Math.abs(circle.x + circle.halfWidth - rect.x - rect.halfWidth);
	            var distY = Math.abs(circle.y + circle.halfHeight - rect.y - rect.halfHeight);
	            var dx = void 0;
	            var dy = void 0;
	            if (distX > rect.halfWidth + radius) {
	                return rect.used = false;
	            }
	            if (distY > rect.halfHeight + radius) {
	                return rect.used = false;
	            }

	            if (!rect.used) {
	                if (distX <= rect.halfWidth) {
	                    return true;
	                }
	                if (distY <= rect.halfHeight) {
	                    return true;
	                }

	                dx = distX - rect.halfWidth;
	                dy = distY - rect.halfHeight;

	                if (typeof callback === 'function') {
	                    rect.used = true;
	                    return callback.call(Leya, circle, rect);
	                } else {
	                    return false;
	                }
	            }
	        }
	    }]);

	    return Physic;
	}();

	;

	exports.default = Physic;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mouse = function () {
	    function Mouse(game) {
	        _classCallCheck(this, Mouse);

	        this.game = game;
	        //
	        this.platform = this.game.mobile.platform;
	        this.used = true;
	        this.click = false;
	        this.hover = false;
	        this.down = false;
	        this.trig = false;
	        this.sellectedObj = false;
	        this.mouseX = null;
	        this.mouseY = null;
	        this.currentTouches = [];
	        this.touchesIntersects = [];
	        this.currentTouchesActive = [];
	    }

	    _createClass(Mouse, [{
	        key: "initialize",
	        value: function initialize() {
	            var _this = this;

	            this.game.canvas.addEventListener("mousemove", function (e) {
	                _this.mouseMove(e);
	            }, false);
	            this.game.canvas.addEventListener("mousedown", function (e) {
	                _this.mouseDown(e);
	            }, false);
	            this.game.canvas.addEventListener("touchstart", function (e) {
	                _this.touchStart(e);
	            }, false);
	            this.game.canvas.addEventListener("touchmove", function (e) {
	                _this.touchMove(e);
	            }, false);
	            this.game.canvas.addEventListener("touchend", function (e) {
	                _this.touchEnded(e);
	            }, false);
	            this.game.canvas.addEventListener("mouseup", function (e) {
	                _this.mouseUp(e);
	            }, false);
	        }
	    }, {
	        key: "findCurrentActiveTouchIndex",
	        value: function findCurrentActiveTouchIndex(id) {
	            for (var i = 0; i < this.currentTouchesActive.length; i++) {
	                if (this.currentTouchesActive[i].id === id) {
	                    return i;
	                }
	            }
	            // Touch not found! Return -1.
	            return -1;
	        }
	    }, {
	        key: "findCurrentTouchIndex",
	        value: function findCurrentTouchIndex(id) {
	            for (var i = 0; i < this.currentTouches.length; i++) {
	                if (this.currentTouches[i].id === id) {
	                    return i;
	                }
	            }
	            // Touch not found! Return -1.
	            return -1;
	        }
	    }, {
	        key: "mouseMove",
	        value: function mouseMove(e) {
	            e.preventDefault();
	            this.mouseX = e.offsetX / this.game.scale1;
	            this.mouseY = e.offsetY / this.game.scale1;
	            if (this.dragged) {
	                this.dragged.x = this.mouseX - this.dragged.halfWidth;
	                this.dragged.y = this.mouseY - this.dragged.halfHeight;
	            }
	        }
	    }, {
	        key: "touchMove",
	        value: function touchMove(e) {
	            e.preventDefault();
	            var touches = e.changedTouches;
	            if (this.dragged) {
	                for (var i = 0; i < touches.length; i++) {
	                    var touch = touches[i];
	                    var index = this.findCurrentTouchIndex(touch.identifier);

	                    if (!this.currentTouches[index].hold) {
	                        this.currentTouches[index].hold = true;
	                    }

	                    this.currentTouches[index].pageX = touch.pageX / this.game.scale1;
	                    this.currentTouches[index].pageY = touch.pageY / this.game.scale1;
	                    if (this.dragged) {
	                        this.dragged.x = this.currentTouches[index].pageX - this.dragged.halfWidth;
	                        this.dragged.y = this.currentTouches[index].pageY - this.dragged.halfHeight;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "touchStart",
	        value: function touchStart(e) {
	            e.preventDefault();
	            var touches = e.changedTouches;
	            // let touch = e.changedTouches[0];
	            this.click = this.used ? true : false;

	            for (var i = 0; i < touches.length; i++) {
	                var touch = touches[i];

	                this.currentTouches.push({
	                    id: touch.identifier,
	                    pageX: touch.pageX / this.game.scale1,
	                    pageY: touch.pageY / this.game.scale1,
	                    interactive: false,
	                    hold: false,
	                    obj: null
	                });
	            }
	        }
	    }, {
	        key: "touchEnded",
	        value: function touchEnded(e) {
	            var touches = e.changedTouches;
	            this.down = false;
	            this.click = false;
	            if (this.dragged) {
	                this.draggedAction(this, this.dragged);

	                this.dragged = false;
	            }
	            for (var i = 0; i < touches.length; i++) {
	                var touch = touches[i];

	                var currentTouchActiveIndex = this.findCurrentActiveTouchIndex(touch.identifier);

	                if (currentTouchActiveIndex >= 0) {
	                    var currentActiveTouch = this.currentTouchesActive[currentTouchActiveIndex];
	                    if (currentActiveTouch.obj) {
	                        currentActiveTouch.obj.touchActive = false;
	                        currentActiveTouch.obj.hovered = false;
	                    }

	                    this.currentTouchesActive.splice(currentTouchActiveIndex, 1);
	                } else {
	                    // console.log('Touch active was not found!');
	                }

	                var currentTouchIndex = this.findCurrentTouchIndex(touch.identifier);

	                if (currentTouchIndex >= 0) {
	                    var currentTouch = this.currentTouches[currentTouchIndex];

	                    this.currentTouches.splice(currentTouchIndex, 1);
	                } else {
	                    //console.log('Touch was not found!');
	                }
	            }
	        }
	    }, {
	        key: "mouseDown",
	        value: function mouseDown(e) {
	            e.preventDefault();
	            //
	            this.mouseX = e.offsetX / this.game.scale1;
	            this.mouseY = e.offsetY / this.game.scale1;
	            this.click = this.used ? true : false;
	            this.down = true;
	            this.trig = false;
	        }
	    }, {
	        key: "mouseUp",
	        value: function mouseUp(e) {
	            e.preventDefault();
	            //
	            this.down = false;
	            this.click = false;
	            if (this.dragged) {
	                this.draggedAction(this, this.dragged);

	                this.dragged = false;
	            }
	        }
	    }, {
	        key: "intersects",
	        value: function intersects(obj, immovable) {
	            var t = 2; //tolerance
	            var tempMouseY = this.mouseY;
	            var tempMouseX = this.mouseX;
	            var xIntersect = void 0;
	            var yIntersect = void 0;

	            if (this.platform === 'desktop') {
	                if (!immovable) {
	                    tempMouseX = tempMouseX + this.game.camera.xScroll;
	                    tempMouseY = tempMouseY + this.game.camera.yScroll;
	                }

	                xIntersect = tempMouseX + t >= obj.x && tempMouseX + t <= obj.x + obj.width;
	                yIntersect = tempMouseY + t >= obj.y && tempMouseY - t <= obj.y + obj.height;
	            } else if (this.platform === 'mobile') {
	                for (var i = 0; i < this.currentTouches.length; i++) {
	                    tempMouseY = this.currentTouches[i].pageY;
	                    tempMouseX = this.currentTouches[i].pageX - this.game.canvas.offsetLeft;

	                    if (!immovable) {
	                        tempMouseX = tempMouseX + this.game.camera.xScroll;
	                        tempMouseY = tempMouseY + this.game.camera.yScroll;
	                    }

	                    xIntersect = tempMouseX + t >= obj.x && tempMouseX + t <= obj.x + obj.width;
	                    yIntersect = tempMouseY + t >= obj.y && tempMouseY - t <= obj.y + obj.height;
	                }
	            }
	            return xIntersect && yIntersect;
	        }

	        // touchIntersects(obj, immovable, callback) {
	        //     const t = 2; //tolerance

	        //     if (Array.isArray(obj)) {
	        //         for (let i = 0; i < this.currentTouches.length; i++) {
	        //             for (let j = 0; j < obj.length; j++) {

	        //                 if (!obj[j].touchActive && !obj[j].hovered) {
	        //                     let tempMouseY = this.currentTouches[i].pageY / this.game.scale1;
	        //                     let tempMouseX = (this.currentTouches[i].pageX - this.game.canvas.offsetLeft) / this.game.scale1;

	        //                     if (!immovable) {
	        //                         tempMouseX = tempMouseX + (this.game.camera.xScroll);
	        //                         tempMouseY = tempMouseY + (this.game.camera.yScroll);
	        //                     }

	        //                     let xIntersect = (tempMouseX + t) >= obj[j].x && (tempMouseX + t) <= obj[j].x + obj[j].width;
	        //                     let yIntersect = (tempMouseY + t) >= obj[j].y && (tempMouseY - t) <= obj[j].y + obj[j].height;

	        //                     this.currentTouches[i].interactive = xIntersect && yIntersect;

	        //                     if (this.currentTouches[i].interactive) {
	        //                         obj[j].touchActive = true;
	        //                         obj[j].hovered = true;

	        //                         this.currentTouchesActive.push({
	        //                             id: this.currentTouches[i].id,
	        //                             obj: obj[j]
	        //                         });

	        //                         callback.call(this, obj[j]);
	        //                     }
	        //                 }
	        //             }
	        //         }
	        //     } else {
	        //         for (let i = 0; i < this.currentTouches.length; i++) {

	        //             if (!obj.touchActive && !obj.hovered) {
	        //                 let tempMouseY = this.currentTouches[i].pageY / this.game.scale1;
	        //                 let tempMouseX = (this.currentTouches[i].pageX - this.game.canvas.offsetLeft) / this.game.scale1;

	        //                 if (!immovable) {
	        //                     tempMouseX = tempMouseX + (this.game.camera.xScroll);
	        //                     tempMouseY = tempMouseY + (this.game.camera.yScroll);
	        //                 }

	        //                 let xIntersect = (tempMouseX + t) >= obj.x && (tempMouseX + t) <= obj.x + obj.width;
	        //                 let yIntersect = (tempMouseY + t) >= obj.y && (tempMouseY - t) <= obj.y + obj.height;

	        //                 this.currentTouches[i].interactive = xIntersect && yIntersect;

	        //                 if (this.currentTouches[i].interactive) {

	        //                     obj.touchActive = true;
	        //                     obj.hovered = true;
	        //                     if (this.sellectedObj) {
	        //                         this.sellectedObj.sellected = false;
	        //                     }
	        //                     this.sellectedObj = obj;
	        //                     this.sellectedObj.sellected = true;

	        //                     this.currentTouchesActive.push({
	        //                         id: this.currentTouches[i].id,
	        //                         obj: obj
	        //                     });

	        //                     this.currentTouches.splice(i, 1);
	        //                     if (typeof callback === 'function') {
	        //                         callback.call(this, obj);
	        //                     }

	        //                     //return false; 
	        //                 }
	        //             }
	        //         }
	        //     }
	        // }

	        // intersectsSprite(obj, immovable) {
	        //     const t = 2; //tolerance

	        //     const xIntersect = (this.mouseX + t) >= obj.x && (this.mouseX + t) <= obj.x + obj.states[obj.state].fW;
	        //     const yIntersect = (this.mouseY + t) >= obj.y && (this.mouseY - t) <= obj.y + obj.states[obj.state].fH;

	        //     return xIntersect && yIntersect;
	        // }

	    }, {
	        key: "updateHoverStats",
	        value: function updateHoverStats(obj, immovable) {
	            if (this.intersects(obj, immovable)) {
	                obj.hovered = true;
	                return true;
	            } else {
	                obj.hovered = false;
	            }
	        }
	    }, {
	        key: "updateStats",
	        value: function updateStats(obj, immovable, hold) {
	            if (this.intersects(obj, immovable)) {
	                obj.hovered = true;

	                obj.hovered = true;
	                if (!hold) {
	                    this.click = false;
	                    obj.touchActive = true;
	                }
	                return true;
	            } else {
	                obj.hovered = false;
	                return false;
	            }
	        }

	        // touchtrigger(obj, immovable, callback, hold) {
	        //     if (this.click ) {
	        //         //  console.log('aaa')
	        //         if (!this.trig) {
	        //             this.trig = hold ? true : false;

	        //             if (Array.isArray(obj)) {
	        //                 for (let u = obj.length - 1; u >= 0; u--) {
	        //                     if (this.updateTouchStats(obj[u], immovable, hold)[u]) {
	        //                         callback.call(this, obj[u]);
	        //                     }
	        //                 }
	        //                 this.trig = false;
	        //                 return false
	        //             }
	        //             else if (typeof obj === 'object' && obj != null) {
	        //                 let tab = this.updateTouchStats(obj, immovable, hold);

	        //                 for (let i = 0; i < tab.length; i++) {
	        //                     if (tab[i]) {
	        //                         callback.call(this, obj);
	        //                     }
	        //                 }
	        //                 this.trig = false;
	        //                 return false
	        //             }
	        //             else if (obj === null) {
	        //                 if (typeof callback === 'function') {
	        //                     this.click = false;
	        //                     this.trig = false;
	        //                     this.down = false;
	        //                     callback.call(this);
	        //                 }
	        //             }
	        //         }
	        //     }
	        // }

	    }, {
	        key: "drag",
	        value: function drag(obj, immovable, callback) {

	            if (this.click || this.currentTouches.length > 0) {

	                if (!this.trig && !this.dragged) {
	                    if (Array.isArray(obj)) {
	                        for (var u = obj.length - 1; u >= 0; u--) {
	                            if (this.updateStats(obj[u], immovable, false)) {
	                                if (!this.dragged) {
	                                    this.dragged = obj[u];
	                                    this.draggedAction = callback;
	                                }
	                            }
	                        }
	                    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj != null) {
	                        if (this.updateStats(obj, immovable, true)) {
	                            if (!this.dragged) {
	                                this.dragged = obj;
	                                this.draggedAction = callback;
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: "trigger",
	        value: function trigger(obj, immovable, callback, hold) {
	            if (this.click) {
	                if (!this.trig) {

	                    this.trig = hold ? true : false;

	                    if (Array.isArray(obj)) {
	                        for (var u = obj.length - 1; u >= 0; u--) {
	                            if (this.updateStats(obj[u], immovable, hold)) {
	                                callback.call(this, this, obj[u]);
	                            }
	                        }
	                        this.trig = false;
	                    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj != null) {
	                        if (this.updateStats(obj, immovable, hold)) {
	                            callback.call(this, this, obj);
	                        }
	                        this.trig = false;
	                    } else if (obj === null) {
	                        if (!hold) {
	                            this.click = false;
	                        }
	                        if (typeof callback === 'function') {

	                            this.trig = false;
	                            this.down = false;
	                            callback.call(this, this);
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: "sellect",
	        value: function sellect(obj, immovable, callback, hold) {
	            if (this.click || this.currentTouches.length > 0) {
	                if (!this.trig) {

	                    this.trig = hold ? true : false;
	                    if (this.sellectedObj === obj) {
	                        // console.log('a')
	                        return;
	                    }
	                    if (Array.isArray(obj)) {
	                        for (var u = obj.length - 1; u >= 0; u--) {
	                            if (this.updateStats(obj[u], immovable, hold)) {
	                                if (this.sellectedObj) {
	                                    this.sellectedObj.sellectedObj = false;
	                                }
	                                this.sellectedObj = obj;
	                                this.sellectedObj.sellected = true;
	                                if (typeof callback === 'function') {
	                                    callback.call(this, obj[u]);
	                                }
	                            }
	                        }
	                        this.trig = false;
	                    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj != null) {
	                        if (this.updateStats(obj, immovable, hold)) {
	                            if (this.sellectedObj) {
	                                this.sellectedObj.sellected = false;
	                            }
	                            this.sellectedObj = obj;
	                            this.sellectedObj.sellected = true;
	                            if (typeof callback === 'function') {
	                                callback.call(this, obj);
	                            }
	                        }
	                        this.trig = false;
	                    } else if (obj === null) {
	                        if (typeof callback === 'function') {
	                            this.click = false;
	                            this.trig = false;
	                            this.down = false;
	                            if (this.sellectedObj) {
	                                this.sellectedObj.sellected = false;
	                            }
	                            this.sellectedObj = obj;
	                            this.sellectedObj.sellected = true;
	                            if (typeof callback === 'function') {
	                                callback.call(this);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: "onHover",
	        value: function onHover(obj, immovable, callback) {
	            if (Array.isArray(obj)) {
	                for (var u = 0, uMax = obj.length; u < uMax; u++) {
	                    if (this.updateHoverStats(obj[u], immovable)) {
	                        if (typeof callback === 'function') {
	                            return callback.call(this, obj[u]);
	                        }
	                    }
	                }
	            } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj != null) {
	                if (this.updateHoverStats(obj, immovable)) {
	                    if (typeof callback === 'function') {
	                        return callback.call(this, obj);
	                    }
	                }
	            } else if (!obj) {
	                return false;
	            }
	        }
	    }]);

	    return Mouse;
	}();

	exports.default = Mouse;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Keyboard = function () {
	    function Keyboard(game) {
	        _classCallCheck(this, Keyboard);

	        this.game = game;

	        this.use = {
	            'left': {
	                hold: false,
	                pressed: false,
	                name: "left"
	            },
	            'up': {
	                hold: false,
	                pressed: false,
	                name: "up"
	            },
	            'down': {
	                hold: false,
	                pressed: false,
	                name: "down"
	            },
	            'right': {
	                hold: false,
	                pressed: false,
	                name: "right"
	            },
	            'W': {
	                hold: false,
	                pressed: false,
	                name: "W"
	            },
	            'S': {
	                hold: false,
	                pressed: false,
	                name: "S"
	            },
	            'A': {
	                hold: false,
	                pressed: false,
	                name: "A"
	            },
	            'D': {
	                hold: false,
	                pressed: false,
	                name: "D"
	            },
	            '1': {
	                hold: false,
	                pressed: false,
	                name: "1"
	            },

	            'SPACE': {
	                hold: false,
	                pressed: false,
	                name: "SPACE"
	            }
	        };

	        this.lastKeyCode = null;

	        this.keys = {
	            '37': 'left',
	            '38': 'up',
	            '40': 'down',
	            '39': 'right',
	            '87': 'W',
	            '83': 'S',
	            '65': 'A',
	            '68': 'D',
	            '49': '1',

	            '32': 'SPACE'
	        };
	        this.hold = false;
	    }

	    _createClass(Keyboard, [{
	        key: 'initialize',
	        value: function initialize() {
	            var _this = this;

	            window.document.addEventListener("keydown", function (e) {
	                return _this.keyDown(e);
	            });
	            window.document.addEventListener("keyup", function (e) {
	                return _this.keyUp(e);
	            });
	        }
	    }, {
	        key: 'trigger',
	        value: function trigger(keyName) {
	            if (this.use[keyName].pressed) {
	                return true;
	            }
	        }
	    }, {
	        key: 'keyDown',
	        value: function keyDown(e) {
	            var code = e.which || e.keyCode;
	            var key = this.getKeyByCode(e, code);

	            if (!this.use[key]) {
	                return false;
	            }

	            if (this.lastKeyCode === code) {
	                this.use[key].hold = true;
	                return;
	            }

	            this.lastKeyCode = code;
	            this.use[key].pressed = true;
	        }
	    }, {
	        key: 'keyUp',
	        value: function keyUp(e) {
	            var code = e.which || e.keyCode;
	            var key = this.getKeyByCode(e, code);
	            this.hold = false;
	            this.lastKeyCode = null;

	            if (this.use[key] && (this.use[key].pressed || this.use[key].hold)) {
	                this.use[key].pressed = false;
	                this.use[key].hold = false;
	            }
	        }
	    }, {
	        key: 'getKeyByCode',
	        value: function getKeyByCode(e, code) {
	            if (this.keys[code]) {
	                e.preventDefault();
	                return this.keys[code];
	            } else {
	                return;
	            }
	        }
	    }]);

	    return Keyboard;
	}();

	;

	exports.default = Keyboard;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tank = __webpack_require__(26);

	var _Tank2 = _interopRequireDefault(_Tank);

	var _Tank3 = __webpack_require__(35);

	var _Tank4 = _interopRequireDefault(_Tank3);

	var _EnemyTank = __webpack_require__(42);

	var _EnemyTank2 = _interopRequireDefault(_EnemyTank);

	var _Hud = __webpack_require__(40);

	var _Hud2 = _interopRequireDefault(_Hud);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Menu = function () {
	    function Menu(game) {
	        _classCallCheck(this, Menu);

	        this.game = game;
	    }

	    _createClass(Menu, [{
	        key: 'create',
	        value: function create() {
	            var _this = this;

	            this.game.add.map({
	                json: '../../jsons/mapa3.json',
	                key: 'rpg'
	            }).then(function (map) {
	                _this.game.VAR.map = map;
	                //
	                // this.game.VAR.tank = new Tank1(this.game);
	                _this.game.VAR.tank = new _Tank2.default(_this.game);
	                new _Tank4.default(_this.game);
	                var enemy = new _EnemyTank2.default(_this.game);
	                //
	                _this.game.setPortView(2560, 2560);
	                //
	                _this.game.add.camera({
	                    followed: enemy
	                });
	                //
	                _this.game.sortByIndex();

	                _this.game.VAR.hud = new _Hud2.default(_this.game);
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {}
	    }]);

	    return Menu;
	}();

	;

	exports.default = Menu;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tank = __webpack_require__(27);

	var _Tank2 = _interopRequireDefault(_Tank);

	var _Barrel = __webpack_require__(28);

	var _Barrel2 = _interopRequireDefault(_Barrel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tank = function (_AbstractTank) {
	    _inherits(Tank, _AbstractTank);

	    function Tank(game) {
	        _classCallCheck(this, Tank);

	        var _this = _possibleConstructorReturn(this, (Tank.__proto__ || Object.getPrototypeOf(Tank)).call(this, game, {
	            key: 'tank32',
	            x: 64 * 6,
	            y: 64 * 6
	        }));

	        _this.newSettings();

	        _this.barrel = new _Barrel2.default(_this.game, {
	            key: 'barrel32',
	            x: _this.x,
	            y: _this.y,
	            marginX: 8,
	            marginY: 1
	        });
	        return _this;
	    }

	    _createClass(Tank, [{
	        key: 'newSettings',
	        value: function newSettings() {
	            // this.speed = 0;
	            // this.maxSpeed = 120;
	            // this.maxBackSpeed = -50;
	            // this.acc = 0.5;
	            // this.frictale = 2;
	        }
	    }]);

	    return Tank;
	}(_Tank2.default);

	;

	exports.default = Tank;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Image2 = __webpack_require__(10);

	var _Image3 = _interopRequireDefault(_Image2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tank = function (_Image) {
	    _inherits(Tank, _Image);

	    function Tank(game, options) {
	        _classCallCheck(this, Tank);

	        var _this = _possibleConstructorReturn(this, (Tank.__proto__ || Object.getPrototypeOf(Tank)).call(this, game, options));

	        _this.create();
	        return _this;
	    }

	    _createClass(Tank, [{
	        key: 'create',
	        value: function create() {
	            this.body.setAnchor(0.5, 0.5);
	            this.speed = 0;
	            this.maxSpeed = 120;
	            this.maxBackSpeed = -50;
	            this.acc = 0.5;
	            this.frictale = 2;
	        }

	        // draw(dt) {
	        //     // superDraw.call(this, dt);
	        // }

	    }, {
	        key: 'update',
	        value: function update(dt) {
	            superUpdate.call(this, dt);

	            this.move();
	        }
	    }, {
	        key: 'move',
	        value: function move() {
	            var centerX = this.getCenter().x;
	            var centerY = this.getCenter().y;

	            var skeletonFront = {
	                bottom: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY, this.body.angle),
	                bottomLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY + this.halfHeight - 4, this.body.angle),
	                bottomRight: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, this.y + 4, this.body.angle)
	            };

	            var skeletonBack = {
	                topRight: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, centerY, this.body.angle),
	                topLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, centerY + this.halfHeight - 4, this.body.angle),
	                top: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, this.y + 4, this.body.angle)
	            };

	            if (this.game.keyboard.trigger('W')) {
	                if (this.game.VAR.map.getNextPosition(skeletonFront)) {
	                    if (this.speed <= this.maxSpeed) {
	                        this.speed += this.acc;
	                    }
	                } else {
	                    this.speed = 0;
	                }
	            } else if (this.game.keyboard.trigger('S')) {
	                if (this.game.VAR.map.getNextPosition(skeletonBack)) {
	                    if (this.speed >= this.maxBackSpeed) {
	                        this.speed -= this.acc;
	                    }
	                } else {
	                    this.speed = 0;
	                }
	            } else if (this.speed > 0 || this.speed < 0) {
	                this.speed -= this.frictale * this.speed < 0 ? -1 : 1;

	                if (this.speed === 0 || this.speed === 0.5) {
	                    this.speed = 0;
	                }
	            }

	            if (this.game.keyboard.trigger('A')) {

	                if (this.game.VAR.map.getNextPosition(skeletonFront)) {
	                    this.body.remAngle(1);
	                } else {
	                    this.speed = 0;
	                }
	            } else if (this.game.keyboard.trigger('D')) {
	                if (this.game.VAR.map.getNextPosition(skeletonFront)) {
	                    this.body.addAngle(1);
	                } else {
	                    this.speed = 0;
	                }
	            }

	            this.body.velocity.x = Math.cos(this.body.angle) * this.speed;
	            this.body.velocity.y = Math.sin(this.body.angle) * this.speed;

	            if (this.barrel) {
	                this.barrel.x = this.x + this.barrel.marginX;
	                this.barrel.y = this.y + this.barrel.marginY;
	            }
	        }
	    }]);

	    return Tank;
	}(_Image3.default);

	;

	var superUpdate = _Image3.default.prototype.update;
	var superDraw = _Image3.default.prototype.draw;

	exports.default = Tank;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Barrel = __webpack_require__(29);

	var _Barrel2 = _interopRequireDefault(_Barrel);

	var _Bullet = __webpack_require__(30);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	var _Discharge = __webpack_require__(32);

	var _Discharge2 = _interopRequireDefault(_Discharge);

	var _Explosion = __webpack_require__(34);

	var _Explosion2 = _interopRequireDefault(_Explosion);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Barrel = function (_AbstractBarrel) {
	        _inherits(Barrel, _AbstractBarrel);

	        function Barrel(game, options) {
	                _classCallCheck(this, Barrel);

	                var _this = _possibleConstructorReturn(this, (Barrel.__proto__ || Object.getPrototypeOf(Barrel)).call(this, game, options));

	                _this.newSettings();

	                _this.discharge = new _Discharge2.default(_this.game);

	                _this.preAllocateBullets(500, _Bullet2.default);

	                _this.preAllocateExplosion(500, _Explosion2.default);
	                return _this;
	        }

	        //  SĄ TO DOMYŚLNE USTAWIENIA, TUTAJ MOŻNA JE NADPISAĆ


	        _createClass(Barrel, [{
	                key: 'newSettings',
	                value: function newSettings() {
	                        // this.barrelLength = 35; // zasieg lufy
	                        // this.currentTimeToShot = 150; // obecny czas do wystrzalu
	                        // this.shotTime = 150; // czas potrzebny by wystrzelic
	                        // this.shotTimeAcc = 1; // predkosc ladowania pocisku

	                        // this.body.setAnchor(0.3, 0.5);
	                }
	        }]);

	        return Barrel;
	}(_Barrel2.default);

	;

	exports.default = Barrel;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Image2 = __webpack_require__(10);

	var _Image3 = _interopRequireDefault(_Image2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var superUpdate = _Image3.default.prototype.update;
	//const superDraw = Image.prototype.draw;

	var Barrel = function (_Image) {
	    _inherits(Barrel, _Image);

	    function Barrel(game, options) {
	        _classCallCheck(this, Barrel);

	        var _this = _possibleConstructorReturn(this, (Barrel.__proto__ || Object.getPrototypeOf(Barrel)).call(this, game, options));

	        _this.shot = function () {
	            if (_this.currentTimeToShot >= _this.shotTime) {
	                _this.discharge.use(_this);

	                var bullet = _this.game.ARR.bulletGroup.spawn();

	                if (bullet) {
	                    bullet.move(_this);
	                }
	                _this.currentTimeToShot = 0;
	            }
	        };

	        _this.marginX = options.marginX || 0;
	        _this.marginY = options.marginY || 0;
	        _this.create();
	        return _this;
	    }

	    _createClass(Barrel, [{
	        key: "create",
	        value: function create() {
	            this.barrelLength = 35; // zasieg lufy
	            this.currentTimeToShot = 150; // obecny czas do wystrzalu
	            this.shotTime = 150; // czas potrzebny by wystrzelic
	            this.shotTimeAcc = 1; // predkosc ladowania pocisku

	            this.body.setAnchor(0.3, 0.5);

	            this.setIndex(10);

	            //this.createDischarge();

	            // this.preAllocateBullets(500);
	            // this.preAllocateExplosion(500);
	        }
	    }, {
	        key: "update",
	        value: function update(dt) {
	            superUpdate.call(this, dt);

	            this.body.rotateByMouse(0, true, 0.02);

	            this.game.mouse.trigger(null, false, this.shot, true);

	            this.reChargeShot();
	        }
	    }, {
	        key: "reChargeShot",
	        value: function reChargeShot() {
	            if (this.currentTimeToShot < this.shotTime) {
	                this.currentTimeToShot += this.shotTimeAcc;
	            }
	        }
	    }, {
	        key: "preAllocateBullets",
	        value: function preAllocateBullets(count, ClassName) {
	            if (!ClassName) {
	                throw "Podaj drugi argument, Trzeba przekazac Classe jaka chce sie utworzyc";
	            }

	            this.game.ARR.bulletGroup = this.game.add.group();

	            for (var i = 0; i < count; i++) {
	                var bullet = new ClassName(this.game);

	                this.game.ARR.bulletGroup.add(bullet, true);
	            }
	        }
	    }, {
	        key: "preAllocateExplosion",
	        value: function preAllocateExplosion(count, ClassName) {
	            this.game.ARR.explosionGroup = this.game.add.group();

	            for (var i = 0; i < count; i++) {
	                var explosion = new ClassName(this.game);

	                this.game.ARR.explosionGroup.add(explosion, true);
	            }
	        }
	    }]);

	    return Barrel;
	}(_Image3.default);

	;

	exports.default = Barrel;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Bullet = __webpack_require__(31);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bullet = function (_AbstractBullet) {
	    _inherits(Bullet, _AbstractBullet);

	    function Bullet(game) {
	        _classCallCheck(this, Bullet);

	        return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, game, {
	            key: 'bullet',
	            marginX: 11,
	            marginY: 12
	        }));
	    }

	    return Bullet;
	}(_Bullet2.default);

	;

	exports.default = Bullet;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Image2 = __webpack_require__(10);

	var _Image3 = _interopRequireDefault(_Image2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bullet = function (_Image) {
	    _inherits(Bullet, _Image);

	    function Bullet(game, options) {
	        _classCallCheck(this, Bullet);

	        var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, game, options));

	        _this.marginX = options.marginX || 0;
	        _this.marginY = options.marginY || 0;

	        _this.body.setAnchor(0.5, 0.5);
	        _this.create();
	        return _this;
	    }

	    _createClass(Bullet, [{
	        key: 'create',
	        value: function create() {
	            this.zIndex = 8;
	            this.startLifeTime = 17;
	            this.speed = 1700;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(dt) {
	            superDraw.call(this, dt);
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            superUpdate.call(this, dt);

	            var centerX = this.getCenter().x;
	            var centerY = this.getCenter().y;

	            var skeleton = {
	                front: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY, this.body.angle)
	            };

	            if (!this.game.VAR.map.getNextPosition(skeleton)) {
	                this.spawExplosion();
	                this.game.ARR.bulletGroup.recycle(this);
	            }

	            this.lifeTime--;

	            if (this.lifeTime <= 0) {
	                this.spawExplosion();
	                this.game.ARR.bulletGroup.recycle(this);
	            }

	            // this.rect.x = skeleton.front.x;
	            // this.rect.y = skeleton.front.y;
	        }
	    }, {
	        key: 'move',
	        value: function move(barrel) {
	            this.lifeTime = this.startLifeTime;
	            this.body.angle = barrel.body.angle;
	            this.x = barrel.x + this.marginX + Math.cos(this.body.angle) * barrel.barrelLength;
	            this.y = barrel.y + this.marginY + Math.sin(this.body.angle) * barrel.barrelLength;
	            this.body.setVelocity(Math.cos(this.body.angle) * this.speed, Math.sin(this.body.angle) * this.speed);
	        }
	    }, {
	        key: 'spawExplosion',
	        value: function spawExplosion() {
	            var explosion = this.game.ARR.explosionGroup.spawn();

	            if (explosion) {
	                explosion.x = this.x - this.marginX;
	                explosion.y = this.y - this.marginY;
	                explosion.body.angle = this.body.angle;
	            }
	        }
	    }]);

	    return Bullet;
	}(_Image3.default);

	;

	var superUpdate = _Image3.default.prototype.update;
	var superDraw = _Image3.default.prototype.draw;

	exports.default = Bullet;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Discharge = __webpack_require__(33);

	var _Discharge2 = _interopRequireDefault(_Discharge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Discharge = function (_AbstractDischarge) {
	    _inherits(Discharge, _AbstractDischarge);

	    function Discharge(game) {
	        _classCallCheck(this, Discharge);

	        return _possibleConstructorReturn(this, (Discharge.__proto__ || Object.getPrototypeOf(Discharge)).call(this, game, {
	            key: 'fireShot32'
	        }));
	    }

	    return Discharge;
	}(_Discharge2.default);

	;

	exports.default = Discharge;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Image2 = __webpack_require__(10);

	var _Image3 = _interopRequireDefault(_Image2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Discharge = function (_Image) {
	    _inherits(Discharge, _Image);

	    function Discharge(game, options) {
	        _classCallCheck(this, Discharge);

	        var _this = _possibleConstructorReturn(this, (Discharge.__proto__ || Object.getPrototypeOf(Discharge)).call(this, game, options));

	        _this.create();
	        return _this;
	    }

	    _createClass(Discharge, [{
	        key: 'create',
	        value: function create() {
	            this.body.setAnchor(0.3, 0.5);
	            this.dischargeLength = 30;
	            this.zIndex = 9;
	            this.hide();
	        }
	    }, {
	        key: 'use',
	        value: function use(barrel) {
	            var _this2 = this;

	            this.body.angle = barrel.body.angle;
	            this.x = barrel.x + 7 + Math.cos(barrel.body.angle) * this.dischargeLength;
	            this.y = barrel.y + barrel.halfHeight - 6 + Math.sin(barrel.body.angle) * this.dischargeLength;
	            this.show();

	            setTimeout(function () {
	                _this2.hide();
	            }, 30);
	        }
	    }]);

	    return Discharge;
	}(_Image3.default);

	;

	exports.default = Discharge;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Sprite2 = __webpack_require__(6);

	var _Sprite3 = _interopRequireDefault(_Sprite2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Explosion = function (_Sprite) {
	    _inherits(Explosion, _Sprite);

	    function Explosion(game, options) {
	        _classCallCheck(this, Explosion);

	        var _this = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, game, {
	            key: 'explo',
	            x: 400,
	            y: 400
	        }));

	        _this.create();
	        return _this;
	    }

	    _createClass(Explosion, [{
	        key: 'create',
	        value: function create() {
	            var _this2 = this;

	            this.zIndex = 18;
	            this.body.setAnchor(0.5, 0.5);

	            this.animations.add({
	                key: 'destroy',
	                frames: [{ 'sx': 0, 'sy': 0, 'fW': 32, 'fH': 30 }, { 'sx': 32, 'sy': 0, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 2, 'sy': 0, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 3, 'sy': 0, 'fW': 32, 'fH': 30 }, { 'sx': 0, 'sy': 32, 'fW': 32, 'fH': 30 }, { 'sx': 32, 'sy': 32, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 2, 'sy': 32, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 3, 'sy': 32, 'fW': 32, 'fH': 30 }, { 'sx': 0, 'sy': 32 * 2, 'fW': 32, 'fH': 30 }, { 'sx': 32, 'sy': 32 * 2, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 2, 'sy': 32 * 2, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 3, 'sy': 32 * 2, 'fW': 32, 'fH': 30 }, { 'sx': 0, 'sy': 32 * 3, 'fW': 32, 'fH': 30 }, { 'sx': 32, 'sy': 32 * 3, 'fW': 32, 'fH': 30 }]
	            });

	            this.animations.play({
	                key: 'destroy',
	                delay: 4,
	                action: function action() {
	                    _this2.game.ARR.explosionGroup.recycle(_this2);
	                }
	            });
	        }
	    }]);

	    return Explosion;
	}(_Sprite3.default);

	;

	exports.default = Explosion;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tank = __webpack_require__(27);

	var _Tank2 = _interopRequireDefault(_Tank);

	var _Barrel = __webpack_require__(36);

	var _Barrel2 = _interopRequireDefault(_Barrel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tank = function (_AbstractTank) {
	    _inherits(Tank, _AbstractTank);

	    function Tank(game) {
	        _classCallCheck(this, Tank);

	        var _this = _possibleConstructorReturn(this, (Tank.__proto__ || Object.getPrototypeOf(Tank)).call(this, game, {
	            key: 'tank128',
	            x: 64 * 6,
	            y: 64 * 7
	        }));

	        _this.newSettings();

	        _this.barrel = new _Barrel2.default(_this.game, {
	            key: 'barrel128',
	            x: _this.x,
	            y: _this.y,
	            marginX: 8,
	            marginY: -4
	        });
	        return _this;
	    }

	    _createClass(Tank, [{
	        key: 'newSettings',
	        value: function newSettings() {
	            // this.body.setAnchor(0.5, 0.5);
	            // this.speed = 0;
	            // this.maxSpeed = 120;
	            // this.maxBackSpeed = -50;
	            // this.acc = 0.5;
	            // this.frictale = 2;
	        }
	    }]);

	    return Tank;
	}(_Tank2.default);

	;

	exports.default = Tank;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Barrel = __webpack_require__(29);

	var _Barrel2 = _interopRequireDefault(_Barrel);

	var _Bullet = __webpack_require__(37);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	var _Discharge = __webpack_require__(38);

	var _Discharge2 = _interopRequireDefault(_Discharge);

	var _Explosion = __webpack_require__(39);

	var _Explosion2 = _interopRequireDefault(_Explosion);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Barrel = function (_AbstractBarrel) {
	        _inherits(Barrel, _AbstractBarrel);

	        function Barrel(game, options) {
	                _classCallCheck(this, Barrel);

	                var _this = _possibleConstructorReturn(this, (Barrel.__proto__ || Object.getPrototypeOf(Barrel)).call(this, game, options));

	                _this.newSettings();

	                _this.discharge = new _Discharge2.default(_this.game);

	                _this.preAllocateBullets(500, _Bullet2.default);

	                _this.preAllocateExplosion(500, _Explosion2.default);
	                return _this;
	        }

	        //  SĄ TO DOMYŚLNE USTAWIENIA, TUTAJ MOŻNA JE NADPISAĆ


	        _createClass(Barrel, [{
	                key: 'newSettings',
	                value: function newSettings() {
	                        // this.barrelLength = 35; // zasieg lufy
	                        // this.currentTimeToShot = 150; // obecny czas do wystrzalu
	                        // this.shotTime = 150; // czas potrzebny by wystrzelic
	                        // this.shotTimeAcc = 1; // predkosc ladowania pocisku

	                        // this.body.setAnchor(0.3, 0.5);
	                }
	        }]);

	        return Barrel;
	}(_Barrel2.default);

	;

	exports.default = Barrel;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Bullet = __webpack_require__(31);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bullet = function (_AbstractBullet) {
	    _inherits(Bullet, _AbstractBullet);

	    function Bullet(game) {
	        _classCallCheck(this, Bullet);

	        return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, game, {
	            key: 'bullet',
	            marginX: 11,
	            marginY: 12
	        }));
	    }

	    return Bullet;
	}(_Bullet2.default);

	;

	exports.default = Bullet;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Discharge = __webpack_require__(33);

	var _Discharge2 = _interopRequireDefault(_Discharge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Discharge = function (_AbstractDischarge) {
	    _inherits(Discharge, _AbstractDischarge);

	    function Discharge(game) {
	        _classCallCheck(this, Discharge);

	        return _possibleConstructorReturn(this, (Discharge.__proto__ || Object.getPrototypeOf(Discharge)).call(this, game, {
	            key: 'fireShot32'
	        }));
	    }

	    return Discharge;
	}(_Discharge2.default);

	;

	exports.default = Discharge;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Sprite2 = __webpack_require__(6);

	var _Sprite3 = _interopRequireDefault(_Sprite2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Explosion = function (_Sprite) {
	    _inherits(Explosion, _Sprite);

	    function Explosion(game, options) {
	        _classCallCheck(this, Explosion);

	        var _this = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, game, {
	            key: 'explo',
	            x: 400,
	            y: 400
	        }));

	        _this.create();
	        return _this;
	    }

	    _createClass(Explosion, [{
	        key: 'create',
	        value: function create() {
	            var _this2 = this;

	            this.zIndex = 18;
	            this.body.setAnchor(0.5, 0.5);

	            this.animations.add({
	                key: 'destroy',
	                frames: [{ 'sx': 0, 'sy': 0, 'fW': 32, 'fH': 30 }, { 'sx': 32, 'sy': 0, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 2, 'sy': 0, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 3, 'sy': 0, 'fW': 32, 'fH': 30 }, { 'sx': 0, 'sy': 32, 'fW': 32, 'fH': 30 }, { 'sx': 32, 'sy': 32, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 2, 'sy': 32, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 3, 'sy': 32, 'fW': 32, 'fH': 30 }, { 'sx': 0, 'sy': 32 * 2, 'fW': 32, 'fH': 30 }, { 'sx': 32, 'sy': 32 * 2, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 2, 'sy': 32 * 2, 'fW': 32, 'fH': 30 }, { 'sx': 32 * 3, 'sy': 32 * 2, 'fW': 32, 'fH': 30 }, { 'sx': 0, 'sy': 32 * 3, 'fW': 32, 'fH': 30 }, { 'sx': 32, 'sy': 32 * 3, 'fW': 32, 'fH': 30 }]
	            });

	            this.animations.play({
	                key: 'destroy',
	                delay: 4,
	                action: function action() {
	                    _this2.game.ARR.explosionGroup.recycle(_this2);
	                }
	            });
	        }
	    }]);

	    return Explosion;
	}(_Sprite3.default);

	;

	exports.default = Explosion;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChargeShotBar = __webpack_require__(41);

	var _ChargeShotBar2 = _interopRequireDefault(_ChargeShotBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Hud = function () {
	    function Hud(game) {
	        _classCallCheck(this, Hud);

	        this.game = game;
	        this.create();
	    }

	    _createClass(Hud, [{
	        key: 'create',
	        value: function create() {
	            new _ChargeShotBar2.default(this.game, {
	                min: this.game.VAR.tank.barrel.currentTimeToShot,
	                max: this.game.VAR.tank.barrel.shotTime,
	                width: 150,
	                height: 25,
	                x: this.game.width - 200,
	                y: 680,
	                static: true,
	                fill: 'red'
	            });
	        }
	    }]);

	    return Hud;
	}();

	;

	exports.default = Hud;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Bar2 = __webpack_require__(14);

	var _Bar3 = _interopRequireDefault(_Bar2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ChargeShotBar = function (_Bar) {
	    _inherits(ChargeShotBar, _Bar);

	    function ChargeShotBar(game, options) {
	        _classCallCheck(this, ChargeShotBar);

	        return _possibleConstructorReturn(this, (ChargeShotBar.__proto__ || Object.getPrototypeOf(ChargeShotBar)).call(this, game, options));
	    }

	    _createClass(ChargeShotBar, [{
	        key: 'draw',
	        value: function draw(dt) {
	            superDraw.call(this, dt);
	            this.setStatusX(this.game.VAR.tank.barrel.currentTimeToShot);
	        }
	    }]);

	    return ChargeShotBar;
	}(_Bar3.default);

	;

	var superDraw = _Bar3.default.prototype.draw;
	exports.default = ChargeShotBar;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tank = __webpack_require__(43);

	var _Tank2 = _interopRequireDefault(_Tank);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tank = function (_AbstractTank) {
	    _inherits(Tank, _AbstractTank);

	    function Tank(game) {
	        _classCallCheck(this, Tank);

	        var _this = _possibleConstructorReturn(this, (Tank.__proto__ || Object.getPrototypeOf(Tank)).call(this, game, {
	            key: 'tank_enemy32',
	            x: 64 * 4,
	            y: 64 * 6
	        }));

	        _this.newSettings();

	        // this.barrel = new Barrel(this.game, {
	        //     key: 'barrel32',
	        //     x: this.x,
	        //     y: this.y,
	        //     marginX: 8,
	        //     marginY: 1
	        // })
	        return _this;
	    }

	    _createClass(Tank, [{
	        key: 'newSettings',
	        value: function newSettings() {
	            // this.speed = 0;
	            // this.maxSpeed = 120;
	            // this.maxBackSpeed = -50;
	            // this.acc = 0.5;
	            // this.frictale = 2;
	        }
	    }]);

	    return Tank;
	}(_Tank2.default);

	;

	exports.default = Tank;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Image2 = __webpack_require__(10);

	var _Image3 = _interopRequireDefault(_Image2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tank = function (_Image) {
	    _inherits(Tank, _Image);

	    function Tank(game, options) {
	        _classCallCheck(this, Tank);

	        var _this = _possibleConstructorReturn(this, (Tank.__proto__ || Object.getPrototypeOf(Tank)).call(this, game, options));

	        _this.create();
	        return _this;
	    }

	    _createClass(Tank, [{
	        key: 'create',
	        value: function create() {
	            this.body.setAnchor(0.5, 0.5);
	            this.speed = 0;
	            this.maxSpeed = 120;
	            this.maxBackSpeed = -50;
	            this.acc = 0.5;
	            this.frictale = 2;

	            this.directions = {
	                forward: true,
	                back: false
	            };

	            this.directionsTimes = {
	                back: 75
	            };

	            this.rotateAngle = {
	                dist: 80,
	                current: 0,
	                direction: false
	            };
	        }

	        // draw(dt) {
	        //     // superDraw.call(this, dt);
	        // }

	    }, {
	        key: 'update',
	        value: function update(dt) {
	            superUpdate.call(this, dt);

	            this.move();
	        }
	    }, {
	        key: 'move',
	        value: function move() {
	            var centerX = this.getCenter().x;
	            var centerY = this.getCenter().y;

	            var skeletonFront = {
	                bottom: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, centerY, this.body.angle),
	                bottomLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, centerY + this.halfHeight - 4, this.body.angle),
	                bottomRight: this.game.VAR.map.getPoint(centerX, centerY, centerX + this.width * 3, this.y + 4, this.body.angle)
	            };

	            var skeletonBack = {
	                topRight: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, centerY, this.body.angle),
	                topLeft: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, centerY + this.halfHeight - 4, this.body.angle),
	                top: this.game.VAR.map.getPoint(centerX, centerY, centerX - this.halfWidth, this.y + 4, this.body.angle)
	            };

	            if (this.game.VAR.map.getNextPosition(skeletonFront) && this.directions.forward) {
	                if (this.speed <= this.maxSpeed) {
	                    this.speed += this.acc;
	                }
	            } else if (!this.rotateAngle.direction) {
	                var dirs = ['left', 'right'];
	                var rand = this.game.rand(0, 1);
	                this.rotateAngle.direction = dirs[rand];
	                this.directions.forward = false;
	            }
	            if (this.rotateAngle.current <= this.rotateAngle.dist && this.rotateAngle.direction) {
	                if (this.rotateAngle.direction === 'left') {
	                    this.body.addAngle(1);
	                } else {
	                    this.body.remAngle(1);
	                }

	                this.rotateAngle.current++;
	            } else {
	                this.directions.forward = true;
	                this.rotateAngle.current = 0;
	                this.rotateAngle.direction = false;
	            }
	            // if (this.game.VAR.map.getNextPosition(skeletonFront) && this.directions.forward) {
	            //     if (this.speed <= this.maxSpeed) {
	            //         this.speed += this.acc;
	            //     }
	            // } else if (!this.directions.back) {
	            //     this.directions.forward = false;
	            //     this.directions.back = true;

	            //     this.speed = 0;
	            // }

	            // if (this.directions.back) {
	            //     if (this.speed >= this.maxBackSpeed) {
	            //         this.speed -= this.acc;
	            //     }
	            //     if (this.directionsTimes.back > 0) {
	            //         this.directionsTimes.back--;
	            //     } else {
	            //         this.directions.back = false;
	            //         this.directionsTimes.back = 75;
	            //         const dirs = ['left', 'right'];
	            //         const rand = this.game.rand(0, 1);
	            //         this.rotateAngle[dirs[rand]] = true;
	            //     }
	            // }

	            // if (this.rotateAngle.current <= this.rotateAngle.dist && this.rotateAngle.left) {
	            //     this.body.addAngle(1);
	            //     this.rotateAngle.current++;
	            // } else if (this.rotateAngle.current <= this.rotateAngle.dist && this.rotateAngle.right) {
	            //     this.body.remAngle(1);
	            //     this.rotateAngle.current++;
	            // }
	            // else {
	            //     this.directions.forward = true;
	            //     this.rotateAngle.current = 0;
	            //     this.rotateAngle.left = false;
	            //     this.rotateAngle.right = false;
	            // }


	            this.body.velocity.x = Math.cos(this.body.angle) * this.speed;
	            this.body.velocity.y = Math.sin(this.body.angle) * this.speed;
	            // if (this.game.keyboard.trigger('W')) {
	            //     if (this.game.VAR.map.getNextPosition(skeletonFront)) {
	            //         if (this.speed <= this.maxSpeed) {
	            //             this.speed += this.acc;
	            //         }
	            //     } else {
	            //         this.speed = 0;
	            //     }
	            // } else if (this.game.keyboard.trigger('S')) {
	            //     if (this.game.VAR.map.getNextPosition(skeletonBack)) {
	            //         if (this.speed >= this.maxBackSpeed) {
	            //             this.speed -= this.acc;
	            //         }
	            //     } else {
	            //         this.speed = 0;
	            //     }
	            // }
	            // else if (this.speed > 0 || this.speed < 0) {
	            //     this.speed -= this.frictale * this.speed < 0 ? -1 : 1;

	            //     if (this.speed === 0 || this.speed === 0.5) {
	            //         this.speed = 0;
	            //     }
	            // }

	            // if (this.game.keyboard.trigger('A')) {

	            //     if (this.game.VAR.map.getNextPosition(skeletonFront)) {
	            //         this.body.remAngle(1);
	            //     }
	            //     else {
	            //         this.speed = 0;
	            //     }
	            // }
	            // else if (this.game.keyboard.trigger('D')) {
	            //     if (this.game.VAR.map.getNextPosition(skeletonFront)) {
	            //         this.body.addAngle(1);
	            //     }
	            //     else {
	            //         this.speed = 0;
	            //     }
	            // }

	            // this.body.velocity.x = Math.cos((this.body.angle)) * this.speed;
	            // this.body.velocity.y = Math.sin((this.body.angle)) * this.speed;

	            // if (this.barrel) {
	            //     this.barrel.x = this.x + this.barrel.marginX;
	            //     this.barrel.y = this.y + this.barrel.marginY;
	            // }
	        }
	    }]);

	    return Tank;
	}(_Image3.default);

	;

	var superUpdate = _Image3.default.prototype.update;
	var superDraw = _Image3.default.prototype.draw;

	exports.default = Tank;

/***/ })
/******/ ]);