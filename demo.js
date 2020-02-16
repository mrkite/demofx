var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DemoFX = (function () {
    function DemoFX() {
        this.effects = {};
        this.runningEl = null;
        this.running = null;
    }
    DemoFX.prototype.register = function (name, effect) {
        if (this.effects[name] != undefined) {
            throw new Error("Effect '" + name + "' is already registered.");
        }
        this.effects[name] = { effect: effect, ctx: null };
    };
    DemoFX.prototype.loadImage = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var img = document.createElement("img");
                        img.onload = function () {
                            var width = img.width;
                            var height = img.height;
                            var canvas = document.createElement("canvas");
                            canvas.width = width;
                            canvas.height = height;
                            document.body.appendChild(canvas);
                            var ctx = canvas.getContext("2d");
                            if (ctx != null) {
                                ctx.drawImage(img, 0, 0, width, height);
                                var pixels = ctx.getImageData(0, 0, width, height);
                                document.body.removeChild(canvas);
                                resolve(pixels);
                            }
                        };
                        img.src = path;
                    })];
            });
        });
    };
    DemoFX.prototype.toggle = function (name, el) {
        return __awaiter(this, void 0, void 0, function () {
            var fx, canvas, ctx, render;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fx = this.effects[name];
                        if (fx == undefined) {
                            throw new Error("Effect not found: " + name);
                        }
                        if (!(fx.ctx == null)) return [3, 2];
                        canvas = document.getElementById(name);
                        if (canvas == null) {
                            throw new Error("Canvas not found: " + name);
                        }
                        ctx = canvas.getContext("2d");
                        if (ctx == null) {
                            throw new Error("No canvas suppport");
                        }
                        fx.ctx = ctx;
                        return [4, fx.effect.init(canvas.width, canvas.height)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.running != null) {
                            window.cancelAnimationFrame(this.running);
                            this.running = null;
                            if (this.runningEl != null) {
                                this.runningEl.value = "Run";
                            }
                        }
                        if (el == this.runningEl) {
                            this.runningEl = null;
                            return [2];
                        }
                        el.value = "Pause";
                        this.runningEl = el;
                        render = function (time) {
                            if (fx.ctx != null) {
                                fx.effect.render(fx.ctx, time);
                                _this.running = window.requestAnimationFrame(render);
                            }
                            else {
                                _this.running = null;
                            }
                        };
                        this.running = window.requestAnimationFrame(render);
                        return [2];
                }
            });
        });
    };
    return DemoFX;
}());
var demoFX = new DemoFX();
function toggle(name, el) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, demoFX.toggle(name, el)];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
var RotoZoom = (function () {
    function RotoZoom() {
        this.angle = 0;
    }
    RotoZoom.prototype.init = function (width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.width = width;
                        this.height = height;
                        _a = this;
                        return [4, demoFX.loadImage("2ndreal.jpg")];
                    case 1:
                        _a.src = _b.sent();
                        return [2];
                }
            });
        });
    };
    RotoZoom.prototype.render = function (ctx, _) {
        var dest = ctx.getImageData(0, 0, this.width, this.height);
        var c = Math.cos(this.angle * Math.PI / 180);
        var s = Math.sin(this.angle * Math.PI / 180);
        this.angle++;
        this.angle %= 360;
        var destOfs = 0;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var u = Math.floor((x * c - y * s) * (s + 1)) & 0xff;
                var v = Math.floor((x * s + y * c) * (s + 1)) % this.src.height;
                while (v < 0) {
                    v += this.src.height;
                }
                var srcOfs = (u + (v << 8)) << 2;
                dest.data[destOfs++] = this.src.data[srcOfs++];
                dest.data[destOfs++] = this.src.data[srcOfs++];
                dest.data[destOfs++] = this.src.data[srcOfs++];
                dest.data[destOfs++] = this.src.data[srcOfs++];
            }
        }
        ctx.putImageData(dest, 0, 0);
    };
    return RotoZoom;
}());
demoFX.register("rotozoom", new RotoZoom());
var Fire = (function () {
    function Fire() {
        this.palette = new Uint8Array(256 * 4);
        this.screen = new Uint8Array(0);
    }
    Fire.prototype.init = function (width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var vOfs, v;
            return __generator(this, function (_a) {
                this.width = width;
                this.height = height;
                this.screen = new Uint8Array(this.width * (this.height + 2));
                vOfs = 0;
                for (v = 0; v < 256; v++) {
                    this.palette[vOfs++] = v >> 1;
                    this.palette[vOfs++] = v >> 3;
                    this.palette[vOfs++] = v >> 4;
                    vOfs++;
                }
                return [2];
            });
        });
    };
    Fire.prototype.render = function (ctx, _) {
        var dest = ctx.getImageData(0, 0, this.width, this.height);
        var ofs = 0;
        for (; ofs < this.width * this.height; ofs++) {
            var y1 = (this.screen[ofs + this.width - 1] +
                this.screen[ofs + this.width]) >> 1;
            var y2 = (this.screen[ofs + this.width * 2] +
                this.screen[ofs + this.width * 2 + 1]) >> 1;
            this.screen[ofs] = Math.max(((y1 + y2) >> 1) - 2, 0);
        }
        for (; ofs < this.width * (this.height + 2); ofs++) {
            this.screen[ofs] = Math.random() > 0.5 ? 255 : 0;
        }
        ofs = 0;
        for (var destOfs = 0; destOfs < this.width * this.height * 4;) {
            var pix = this.screen[ofs++] * 4;
            dest.data[destOfs++] = this.palette[pix++];
            dest.data[destOfs++] = this.palette[pix++];
            dest.data[destOfs++] = this.palette[pix++];
            dest.data[destOfs++] = 0xff;
        }
        ctx.putImageData(dest, 0, 0);
    };
    return Fire;
}());
demoFX.register("fire", new Fire());
var Plasma = (function () {
    function Plasma() {
    }
    Plasma.prototype.init = function (width, height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.width = width;
                this.height = height;
                return [2];
            });
        });
    };
    Plasma.prototype.render = function (ctx, t) {
        var dest = ctx.getImageData(0, 0, this.width, this.height);
        var time = t / 500;
        var ofs = 0;
        for (var y = 0; y < this.height; y++) {
            var dy = (y / this.height) - 0.5;
            for (var x = 0; x < this.width; x++) {
                var dx = (x / this.width) - 0.5;
                var v = Math.sin(dx * 10 + time);
                var cx = dx + 0.5 * Math.sin(time / 5);
                var cy = dy + 0.5 * Math.cos(time / 3);
                v += Math.sin(Math.sqrt(50 * (cx * cx + cy * cy) + 1 + time));
                v += Math.cos(Math.sqrt(dx * dx + dy * dy) - time);
                var r = Math.floor(Math.sin(v * Math.PI) * 255);
                var b = Math.floor(Math.cos(v * Math.PI) * 255);
                dest.data[ofs++] = r;
                dest.data[ofs++] = 0;
                dest.data[ofs++] = b;
                dest.data[ofs++] = 0xff;
            }
        }
        ctx.putImageData(dest, 0, 0);
    };
    return Plasma;
}());
demoFX.register("plasma", new Plasma());
var MetaBlobs = (function () {
    function MetaBlobs() {
        this.numBlobs = 5;
        this.blobs = [];
    }
    MetaBlobs.prototype.init = function (width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                this.width = width;
                this.height = height;
                for (i = 0; i < this.numBlobs; i++) {
                    this.blobs.push({ scaleX: Math.random() * 0.6,
                        scaleY: Math.random() * 0.6,
                        speed: Math.random() * Math.PI * 32 - Math.PI * 16,
                        x: 0, y: 0 });
                }
                return [2];
            });
        });
    };
    MetaBlobs.prototype.render = function (ctx, t) {
        var dest = ctx.getImageData(0, 0, this.width, this.height);
        var time = t / 50000;
        var shift = 0;
        for (var _i = 0, _a = this.blobs; _i < _a.length; _i++) {
            var b = _a[_i];
            b.x = Math.sin((time + shift) * Math.PI * b.speed) * this.width *
                b.scaleX + this.width / 2;
            b.y = Math.cos((time + shift) * Math.PI * b.speed) * this.height *
                b.scaleY + this.height / 2;
            shift += 0.5;
        }
        var ofs = 0;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var dSq = 1;
                for (var _b = 0, _c = this.blobs; _b < _c.length; _b++) {
                    var b = _c[_b];
                    var xSq = (x - b.x) * (x - b.x);
                    var ySq = (y - b.y) * (y - b.y);
                    dSq *= Math.sqrt(xSq + ySq);
                }
                var pix = Math.max(Math.min(Math.floor(1024 - (dSq / 3e8)), 255), 0);
                dest.data[ofs++] = pix;
                dest.data[ofs++] = 0;
                dest.data[ofs++] = pix;
                dest.data[ofs++] = 0xff;
            }
        }
        ctx.putImageData(dest, 0, 0);
    };
    return MetaBlobs;
}());
demoFX.register("blob", new MetaBlobs());
var Tunnel = (function () {
    function Tunnel() {
        this.distances = [];
        this.angles = [];
        this.shades = [];
    }
    Tunnel.prototype.init = function (width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, y, sqy, x, sqx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.width = width;
                        this.height = height;
                        _a = this;
                        return [4, demoFX.loadImage("space.jpg")];
                    case 1:
                        _a.src = _b.sent();
                        for (y = 0; y < this.height * 2; y++) {
                            sqy = (y - this.height) * (y - this.height);
                            for (x = 0; x < this.width * 2; x++) {
                                sqx = (x - this.width) * (x - this.width);
                                this.distances.push(Math.floor(32 * this.src.height /
                                    Math.sqrt(sqx + sqy)) % this.src.height);
                                this.angles.push(Math.round(this.src.width *
                                    Math.atan2(y - this.height, x - this.width) / Math.PI));
                                this.shades.push(Math.min(Math.sqrt(sqx + sqy), 255));
                            }
                        }
                        return [2];
                }
            });
        });
    };
    Tunnel.prototype.render = function (ctx, t) {
        var dest = ctx.getImageData(0, 0, this.width, this.height);
        var time = t / 1000;
        var shiftx = Math.floor(this.src.width * time);
        var shifty = Math.floor(this.src.height * 0.25 * time);
        var centerx = this.width / 2 + Math.floor(this.width / 4 *
            Math.sin(time / 4));
        var centery = this.height / 2 + Math.floor(this.height / 4 *
            Math.sin(time / 2));
        var stride = this.width * 2;
        var destOfs = 0;
        for (var y = 0; y < this.height; y++) {
            var srcOfs = y * stride + centerx + centery * stride;
            for (var x = 0; x < this.width; x++) {
                var u = (this.distances[srcOfs] + shiftx) & 0xff;
                var v = (this.angles[srcOfs] + shifty) % this.src.height;
                while (v < 0) {
                    v += this.src.height;
                }
                var shade = this.shades[srcOfs] / 255;
                srcOfs++;
                var pixOfs = (u + (v << 8)) << 2;
                dest.data[destOfs++] = this.src.data[pixOfs++] * shade;
                dest.data[destOfs++] = this.src.data[pixOfs++] * shade;
                dest.data[destOfs++] = this.src.data[pixOfs++] * shade;
                dest.data[destOfs++] = this.src.data[pixOfs++];
            }
        }
        ctx.putImageData(dest, 0, 0);
    };
    return Tunnel;
}());

demoFX.register("tunnel", new Tunnel());

var Moire = (function () {
    function Moire() {
    }
    Moire.prototype.init = function (width, height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.width = width;
                this.height = height;
                return [2];
            });
        });
    };
    Moire.prototype.render = function (ctx, t) {
        var dest = ctx.getImageData(0, 0, this.width, this.height);
        var time = t / 1000;

        var cx1 = Math.sin(time / 2) * this.width / 3 + this.width / 2;
        var cy1 = Math.sin(time / 4) * this.height / 3 + this.height / 2;

        var cx2 = Math.cos(time / 3) * this.width / 3 + this.width / 2;
        var cy2 = Math.cos(time) * this.height / 3 + this.height / 2;

        var cx3 = Math.cos(time / 7) * this.width / 3 + this.width / 2;
        var cy3 = Math.cos(time) * this.height / 7 + this.height / 2;

        var destOfs = 0;
        for (var y = 0; y < this.height; y++) {

            var dy = (y - cy1) * (y - cy1);

            var dy2 = (y - cy2) * (y - cy2);

            var dy3 = (y - cy3) * (y - cy3);

            for (var x = 0; x < this.width; x++) {

                var dx = (x - cx1) * (x - cx1);

                var dx2 = (x - cx2) * (x - cx2);

                var dx3 = (x - cx3) * (x - cx3);

                var shade = (((Math.sqrt(dx + dy) ^ 
                               Math.sqrt(dx2 + dy2) ^
                               Math.sqrt(dx3 + dy3)) >> 4) & 1) * 255;
                dest.data[destOfs++] = shade;
                dest.data[destOfs++] = shade;
                dest.data[destOfs++] = shade;
                dest.data[destOfs++] = 0xff;
            }
        }
        ctx.putImageData(dest, 0, 0);
    };
    return Moire;
}());

demoFX.register("moire", new Moire());

var Rain = (function () {
    function Rain() {
        this.lastTicks = 0;
    }
    Rain.prototype.init = function (width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.width = width;
                        this.height = height;
                        this.dest = new Int16Array(width * height);
                        this.source = new Int16Array(width * height);
                        _a = this;
                        return [4, demoFX.loadImage("tile.jpg")];
                    case 1:
                        _a.tex = _b.sent();
                        return [2];
                }
            });
        });
    };
    Rain.prototype.render = function (ctx, t) {
        var dest = ctx.getImageData(0, 0, this.width, this.height);
        var end = (this.height - 1) * this.width;
        if (t / 1000 - this.lastTicks > 0.5) {
            var rx = Math.floor(Math.random() * this.width);
            var ry = Math.floor(Math.random() * this.height);
            this.source[ry * this.width + rx] = Math.round(Math.random() * 0x3000);
            this.lastTicks = t / 1000;
        }
        for (var i = this.width; i < end; i++) {
            this.dest[i] = ((this.source[i - 1] +
                this.source[i + 1] +
                this.source[i - this.width] +
                this.source[i + this.width]) >> 1) - this.dest[i];
            this.dest[i] -= (this.dest[i] >> 5);
        }
        var tmp = this.dest;
        this.dest = this.source;
        this.source = tmp;
        for (var y = 1; y < this.height - 1; y++) {
            var ofs = y * this.width;
            for (var x = 1; x < this.width - 1; x++) {
                var dx = this.source[ofs + x - 1] - this.source[ofs + x + 1];
                var dy = this.source[ofs + x - this.width] -
                    this.source[ofs + x + this.width];
                var tx = ((y + dy) & 0x1ff) * this.tex.width * 4 +
                    ((x + dx) & 0x1ff) * 4;
                var r = this.tex.data[tx];
                var g = this.tex.data[tx + 1];
                var b = this.tex.data[tx + 2];
                dest.data[ofs * 4 + x * 4] = Math.min(Math.max(r - dx, 0), 255);
                dest.data[ofs * 4 + x * 4 + 1] = Math.min(Math.max(g - dx, 0), 255);
                dest.data[ofs * 4 + x * 4 + 2] = Math.min(Math.max(b - dx, 0), 255);
                dest.data[ofs * 4 + x * 4 + 3] = 0xff;
            }
        }
        ctx.putImageData(dest, 0, 0);
    };
    return Rain;
}());
demoFX.register("rain", new Rain());
//# sourceMappingURL=demo.js.map