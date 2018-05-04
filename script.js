window.onload = function () {
    var canvas = document.getElementById("drawingCanvas");
    var context = canvas.getContext("2d");

    var
        xSize = 20,
        ySize = 20,
        border = 0,
        xlen = 10,
        ylen = 20,
        x = 30,
        y = 30;


    var ipp = xSize + border;
    var jpp = ySize + border;
    var xMax = (xSize + border) * xlen;
    var yMax = (ySize + border) * ylen;

    var pixelColor = ['#FFA500', '#FF0000', '#c99b5b', '#0aa9ff', '#55ffae', '#ff00c9', '#c4ff49', '#00b5ff'];
    var figureColorsStart = 1;


    function Pixel(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isDraw = 0;
        this.color = 0;
    }

    Pixel.prototype.Draw = function (colorId) {
        if (this.isDraw !== true) {
            this.isDraw = true;
            this.color = colorId;
            context.fillStyle = pixelColor[this.color];
            context.fillRect(this.x, this.y, this.w, this.h);
            return true;
        } else
            return false;

    };
    Pixel.prototype.Clear = function () {
        if (this.isDraw !== false) {
            this.isDraw = false;
            this.color = 0;
            context.fillStyle = pixelColor[this.color];
            context.fillRect(this.x, this.y, this.w, this.h);
            return true;
        } else
            return false;
    };
    Pixel.prototype.DrawPrev = function (colorId, isDraw) {
        this.color = colorId;
        this.isDraw = isDraw;
        context.fillStyle = pixelColor[this.color];
        context.fillRect(this.x, this.y, this.w, this.h);
    };

    function Display() {
        this.pixels = [];
    }

    Display.prototype.InitPixels = function () {
        for (var i = x, d1 = 0; /*i <= xMax*/ d1 < xlen; i += ipp, d1++) {
            this.pixels[d1] = [];
            for (var j = y, d2 = 0; /*j <= yMax*/ d2 < ylen; j += jpp, d2++) {
                this.pixels[d1][d2] = new Pixel(i, j, xSize, ySize);
                /*if (arr[d1][d2] === 1) {
                 context.moveTo(i, j);
                 context.lineTo(i + xSize, j);
                 context.lineTo(i + xSize, j + ySize);
                 context.lineTo(i, j + ySize);
                 context.lineTo(i, j);
                 context.fill();
                 }*/
            }
        }
        return this.pixels;
    };
    Display.prototype.DrawPixels = function () {
        for (var i = 0; i < this.pixels.length; i++) {
            for (var j = 0; j < this.pixels[i].length; j++) {
                this.pixels[i][j].Clear();
            }
        }
    };
    Display.prototype.DrawFrame = function () {
        context.fillStyle = "#000";
        context.fillRect(x - 1, y - 1, xMax - border + 2, yMax - border + 2);

        for (var j = 0; j < this.pixels[0].length; j++) {
            context.fillText(j, this.pixels[0][j].x - 20, j * (ySize + border) + y + (xlen));
        }

        for (var j = 0; j < this.pixels.length; j++) {
            context.fillText(j, j * (xSize + border) + x, this.pixels[0][0].y - 20);
        }
    };
    /*
     Display.prototype.movePixUp = function (arr) {
     for (var i = 0; i < arr.length; i++)
     if ((arr[i][1] - 1) < 0)
     return;

     for (i = 0; i < arr.length; i++) {
     this.pixels[arr[i][0]][arr[i][1]].Clear();
     arr[i][1]--;
     if (arr[i][1] < 0)
     arr[i][1] = this.pixels[0].length - 1;
     this.pixels[arr[i][0]][arr[i][1]].Draw();
     }
     };
     Display.prototype.movePixDown = function (arr) {
     for (var i = 0; i < arr.length; i++)
     if ((arr[i][1] + 1) > this.pixels[0].length - 1)
     return false;

     for (i = arr.length - 1; i >= 0; i--) {
     this.pixels[arr[i][0]][arr[i][1]].Clear();
     arr[i][1]++;
     if (arr[i][1] > this.pixels[0].length - 1)
     arr[i][1] = 0;
     this.pixels[arr[i][0]][arr[i][1]].Draw();
     }

     return true;
     };
     Display.prototype.movePixRigth = function (arr) {
     for (var i = 0; i < arr.length; i++)
     if ((arr[i][0] + 1) > this.pixels.length - 1)
     return;

     for (i = arr.length - 1; i >= 0; i--) {
     this.pixels[arr[i][0]][arr[i][1]].Clear();
     arr[i][0]++;
     if (arr[i][0] > this.pixels.length - 1)
     arr[i][0] = 0;
     this.pixels[arr[i][0]][arr[i][1]].Draw();
     }
     };
     Display.prototype.movePixLeft = function (arr) {
     for (var i = 0; i < arr.length; i++)
     if ((arr[i][0] - 1) < 0)
     return;

     for (i = 0; i < arr.length; i++) {
     this.pixels[arr[i][0]][arr[i][1]].Clear();
     arr[i][0]--;
     if (arr[i][0] < 0)
     arr[i][0] = this.pixels.length - 1;
     this.pixels[arr[i][0]][arr[i][1]].Draw();
     }

     };*/

    Display.prototype.moveFigureUp = function (figure) {
        for (var i = 0; i < figure.coords.length; i++)
            if ((figure.coords[i][1] - 1) < 0)
                return;

        for (i = 0; i < figure.side.top.length; i++)
            if (this.pixels[figure.coords[figure.side.top[i]][0]][figure.coords[figure.side.top[i]][1] - 1].isDraw === true)
                return false;

        for (i = 0; i < figure.coords.length; i++) {
            this.pixels[figure.coords[i][0]][figure.coords[i][1]].Clear();
            figure.coords[i][1]--;
            if (figure.coords[i][1] < 0)
                figure.coords[i][1] = this.pixels[0].length - 1;
            this.pixels[figure.coords[i][0]][figure.coords[i][1]].Draw(figure.color);
        }


        figure.top--;
        if (figure.top < 0)
            figure.top = 0;
        //console.log("top: " + figure.top);
    };
    Display.prototype.moveFigureDown = function (figure) {
        for (var i = 0; i < figure.coords.length; i++)
            if ((figure.coords[i][1] + 1) > this.pixels[0].length - 1)
                return false;

        for (i = 0; i < figure.side.bottom.length; i++)
            if (this.pixels[figure.coords[figure.side.bottom[i]][0]]
                    [figure.coords[figure.side.bottom[i]][1] + 1].isDraw === true)
                return false;

        for (i = figure.coords.length - 1; i >= 0; i--) {
            this.pixels[figure.coords[i][0]][figure.coords[i][1]].Clear();
            figure.coords[i][1]++;
            if (figure.coords[i][1] > this.pixels[0].length - 1)
                figure.coords[i][1] = 0;
            this.pixels[figure.coords[i][0]][figure.coords[i][1]].Draw(figure.color);
        }

        figure.top++;
        if (figure.top > this.pixels[0].length - 1 - figure.height)
            figure.top = this.pixels[0].length - 1 - figure.height;
        //console.log("top: " + figure.top);

        return true;
    };
    Display.prototype.moveFigureRigth = function (figure) {
        for (var i = 0; i < figure.coords.length; i++)
            if ((figure.coords[i][0] + 1) > this.pixels.length - 1)
                return;

        for (i = 0; i < figure.side.right.length; i++)
            if (this.pixels[figure.coords[figure.side.right[i]][0] + 1][figure.coords[figure.side.right[i]][1]].isDraw === true)
                return;

        for (i = figure.coords.length - 1; i >= 0; i--) {
            this.pixels[figure.coords[i][0]][figure.coords[i][1]].Clear();
            figure.coords[i][0]++;
            if (figure.coords[i][0] > this.pixels.length - 1)
                figure.coords[i][0] = 0;
            this.pixels[figure.coords[i][0]][figure.coords[i][1]].Draw(figure.color);
        }

        figure.left++;
        if (figure.left > this.pixels[0].length - 1 - figure.width)
            figure.left = this.pixels[0].length - 1 - figure.width;
        //console.log("left: " + figure.left);
    };
    Display.prototype.moveFigureLeft = function (figure) {
        for (var i = 0; i < figure.coords.length; i++)
            if ((figure.coords[i][0] - 1) < 0)
                return;

        for (i = 0; i < figure.side.left.length; i++)
            if (this.pixels[figure.coords[figure.side.left[i]][0] - 1][figure.coords[figure.side.left[i]][1]].isDraw === true)
                return;

        for (i = 0; i < figure.coords.length; i++) {
            this.pixels[figure.coords[i][0]][figure.coords[i][1]].Clear();
            figure.coords[i][0]--;
            if (figure.coords[i][0] < 0)
                figure.coords[i][0] = this.pixels.length - 1;
            this.pixels[figure.coords[i][0]][figure.coords[i][1]].Draw(figure.color);
        }

        figure.left--;
        if (figure.left < 0)
            figure.left = 0;
        //console.log("left: " + figure.left);

    };
    Display.prototype.kindFigure = function (figure) {
        var
            type = figure.type,
            kind = figure.kind,
            top = figure.top,
            left = figure.left;

        var figure2 = figuries2[type];
        var newKind = (kind + 1);
        if (newKind > figure2.length - 1)
            newKind = 0;

        figure.Hide();

        figure.randomFigure2(type, newKind, top, left);
        if (!figure.Draw()) {
            figure.randomFigure2(type, kind, top, left);
            figure.Draw();
        }

    };

    var lines = 0;
    var points = 0;
    var best = localStorage["best"];
    Display.prototype.DrawResult = function () {
        context.fillStyle = "#fff";

        var str = 'Lines: ' + lines + '\nPoints: ' + points + '\nBest: ' + best;
        context.fillRect(xMax - border + 2+30, 10,str.length*10,20);

        context.fillStyle = "#000";
        context.fillText(str, xMax - border + 2+30, 20)
    };
    Display.prototype.checkLines = function (figure) {
        var hrLen = this.pixels.length;
        var shift = [];
        for (var i = 0; i < figure.side.left.length; i++) {
            var isDraw = 0;
            var lineY = figure.coords[figure.side.left[i]][1];

            // перезапуск игры усли lineY == 0
            if (lineY === 0) {
                alert('GAME OVER' + '\nLines: ' + lines + '\nPoints: ' + points +
                    (points > best ? '\nYOU BEST! : ' + (best = points) : '\n----\nBest: ' + best));
                points = 0;
                lines = 0;
                localStorage["best"] = best;
                this.DrawResult();
                // анимация смены экрана
                this.InitPixels();
                this.DrawPixels();
                return;
            }

            //var str = '';
            for (var j = 0; j < hrLen; j++) {
                //str += j + ' ';
                if (this.pixels[j][lineY].isDraw)
                    isDraw++;
                else break;
            }
            //str = lineY + '.' + hrLen + ' = ' + str;
            if (isDraw === hrLen) {
                shift.push(lineY);
                for (j = 0; j < hrLen; j++) {
                    this.pixels[j][lineY].Clear();
                }
            }
            //console.log(str);
        }
        //console.log(shift);

        //var str2 = '';
        if (shift.length > 0) { // кол-во линий += shift.length; очки+= shift.length * 100
            points += shift.length * (xlen * 5);
            lines += shift.length;
            //console.log('Lines: ' + lines + '\nPoints: ' + points + '\nBest: ' + best);
            this.DrawResult();
            for (i = 0; i < shift.length; i++) {
                j = shift[i];
                var tj = j;
                while (tj !== 0) {
                    for (var h = 0; h < hrLen; h++) {
                        //str2 += '[' + tj + ':' + h + '] ';
                        if (this.pixels[h][tj - 1].isDraw) {
                            var color = this.pixels[h][tj - 1].color;
                            isDraw = this.pixels[h][tj - 1].isDraw;
                            this.pixels[h][tj - 1].Clear();
                            this.pixels[h][tj].DrawPrev(color, isDraw);
                        }
                    }
                    tj--;
                }
                //str2 += '\n';
            }
            //console.log(str2);
        } else {
            points += figure.coords.length * 5;
            //console.log('Lines: ' + lines + '\nPoints: ' + points + '\nBest: ' + best);
            this.DrawResult();
        }
    };
    var display = new Display();
    display.InitPixels();
    display.DrawFrame();
    display.DrawPixels();
    display.DrawResult();

//context.clearRect(0, 0, canvas.width, canvas.height);

    /*var figuries =
     [
     [
     [1, 2, 3, 0, 2],
     [1, 0, 1, 2, 0, 1],
     [2, 0, 1, 2, 3],
     [2, 0, 1, 2, 0, 2]
     ],
     [
     [1, 2, 0, 1, 2]
     ],
     [
     [1, 0, 1, 0, 1, 0, 1],
     [1, 2, 3, 4]
     ],
     [
     [1, 2, 0, 2, 3],
     [2, 0, 1, 2, 0, 1]
     ],
     [
     [2, 3, 0, 1, 2],
     [1, 0, 1, 2, 0, 2]
     ],
     [
     [2, 0, 2, 0, 1, 2],
     [1, 2, 3, 0, 3],
     [1, 2, 0, 1, 0, 1],
     [1, 0, 1, 2, 3]
     ],
     [
     [1, 0, 1, 0, 1, 2],
     [3, 0, 1, 2, 3],
     [1, 2, 0, 2, 0, 2],
     [1, 2, 3, 0, 1]
     ],
     [ // 8 [7] - test
     [1, 0, 1, 0, 1, 2]
     ]
     ];*/

    var figuries2 =
        [
            [ //0
                [
                    [1, 0],
                    [1, 1],
                    [1, 0]
                ],
                [
                    [0, 1],
                    [1, 1],
                    [0, 1]
                ],
                [
                    [1, 1, 1],
                    [0, 1, 0]
                ],

                [
                    [0, 1, 0],
                    [1, 1, 1]
                ]
            ],
            [ //1
                [
                    [1, 1],
                    [1, 1]
                ]
            ],
            [ //2
                [
                    [1, 1, 1, 1]
                ],
                [
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            ],
            [ //3
                [
                    [1, 1, 0],
                    [0, 1, 1]
                ],
                [
                    [0, 1],
                    [1, 1],
                    [1, 0]
                ]
            ],
            [ //4
                [
                    [0, 1, 1],
                    [1, 1, 0]
                ],
                [
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ]
            ],
            [ //5
                [
                    [0, 1],
                    [0, 1],
                    [1, 1]
                ],
                [
                    [1, 1],
                    [1, 0],
                    [1, 0]
                ],
                [
                    [1, 1, 1],
                    [0, 0, 1]
                ],
                [
                    [1, 0, 0],
                    [1, 1, 1]
                ]
            ],
            [ //7
                [
                    [1, 0],
                    [1, 0],
                    [1, 1]
                ],
                [
                    [0, 0, 1],
                    [1, 1, 1]
                ],
                [
                    [1, 1],
                    [0, 1],
                    [0, 1]
                ],
                [
                    [1, 1, 1],
                    [1, 0, 0]
                ]
            ]
        ];

    function Figure() {
        this.color = randomFromTo(figureColorsStart, pixelColor.length - 1);
        this.top = 0;
        this.left = 0;
        this.type = 0;
        this.kind = 0;
        this.coords = [];
        this.width = 0;
        this.height = 0;
        this.side = { //бока
            top: [],
            left: [],
            right: [],
            bottom: []
        };
    }

    Figure.prototype.randomFigure2 = function (type, kind, top, left) {
        var figure = null;

        if (arguments.length === 4) {
            this.type = type;
            this.kind = kind;
            figure = figuries2[this.type];
            figure = figure[this.kind];
            this.top = 0;
            this.left = 0;
        } else {
            this.top = 0;
            this.left = 0;
            this.color = randomFromTo(figureColorsStart, pixelColor.length - 1);
            this.type = randomFromTo(0, figuries2.length - 1);
            figure = figuries2[this.type];

            this.kind = randomFromTo(0, figure.length - 1);
            //this.kind = 0;
            figure = figure[this.kind];
        }

        this.coords = [];
        for (var i = 0; i < figure.length; i++) {
            for (var j = 0; j < figure[i].length; j++) {
                if (figure[i][j] === 1) {
                    this.coords.push([i, j]);
                }
            }
        }

        this.side.top = [];
        for (i = 0; i < figure.length; i++) {
            for (j = 0; j < figure[i].length; j++) {
                if (figure[i][j] === 1) {
                    this.side.top.push(this.find([i, j]));
                    break;
                }
            }
        }

        this.side.bottom = [];
        for (i = figure.length - 1; i >= 0; i--) {
            for (j = figure[i].length - 1; j >= 0; j--) {
                if (figure[i][j] === 1) {
                    this.side.bottom.push(this.find([i, j]));
                    break;
                }
            }
        }
        this.side.left = [];
        for (j = 0; j < figure[0].length; j++) {
            for (i = 0; i < figure.length; i++) {
                if (figure[i][j] === 1) {
                    this.side.left.push(this.find([i, j]));
                    break;
                }
            }
        }

        this.side.right = [];
        for (j = 0; j < figure[0].length; j++) {
            for (i = figure.length - 1; i >= 0; i--) {
                if (figure[i][j] === 1) {
                    this.side.right.push(this.find([i, j]));
                    break;
                }
            }
        }

        this.width = this.side.bottom.length;
        this.height = this.side.right.length;

        if (arguments.length === 4) {
            //this.Jump(top, left);
            this.shiftX(left);
            this.shiftY(top);
        }
        //this.Draw();
        //this.TestSide(this.side.top);

        console.log(this);
        return this;
    };
    Figure.prototype.Jump = function () {
        //////////////////////////////////////////////////////////////////////
    };
    Figure.prototype.find = function (arr) {
        for (var i = 0; i < this.coords.length; i++) {
            if (this.coords[i][0] === arr[0] && this.coords[i][1] === arr[1])
                return i;
        }
        return -1;
    };
    /*Figure.prototype.randomFigure = function () {
     this.type = randomFromTo(0, figuries.length - 1);
     var fig = figuries[this.type];
     this.kind = randomFromTo(0, fig.length - 1);
     fig = fig[this.kind];
     var x1 = 0,//randomFromTo(0, xlen - 4),
     y1 = 0;
     this.coords = [];

     var side = {};

     // для фигур, котрые слитны
     this.height = 0;
     this.width = 1;

     for (var i = 0, x = y1, y = x1; i < fig.length; i++) {
     if (fig[i] === 0) {
     y++;
     x = y1;
     this.height--;
     } else {
     this.coords.push([y, x + (fig[i] - 1)]);
     console.log(y, x + (fig[i] - 1));
     this.height++;
     this.width++;
     }
     }
     this.width -= this.height;
     console.log(this);
     return this;
     };*/
    Figure.prototype.Hide = function () {
        for (i = 0; i < this.coords.length; i++) {
            display.pixels[this.coords[i][0]][this.coords[i][1]].Clear();
        }
    };
    var timerId = null;

    Figure.prototype.Draw = function () {
        for (i = 0; i < this.coords.length; i++) {
            if (this.coords[i][0] > display.pixels.length - 1 || this.coords[i][1] > display.pixels[0].length - 1) {
                for (var j = i - 1; j >= 0; j--) {
                    display.pixels[this.coords[j][0]][this.coords[j][1]].Clear();
                }
                return false;
            }
            if (!display.pixels[this.coords[i][0]][this.coords[i][1]].Draw(this.color)) {
                for (var j = i - 1; j >= 0; j--) {
                    display.pixels[this.coords[j][0]][this.coords[j][1]].Clear();
                }
                return false;
            }
        }
        clearInterval(timerId);
        timerId = setInterval(function () {
            figure.Move('down')
        }, 500);

        return true;
    };
    Figure.prototype.DrawRandom = function () {
        var shiftX = randomFromTo(0, display.pixels.length - this.width);
        //var shiftY = randomFromTo(0, display.pixels[0].length - this.height);
        this.shiftX(shiftX);
        //this.shiftY(shiftY);
        this.Draw();
    };

    Figure.prototype.shiftX = function (value) {
        for (var i = 0; i < this.coords.length; i++) {
            this.coords[i][0] += value;
        }

        this.left = value;
    };
    Figure.prototype.shiftY = function (value) {
        for (var i = 0; i < this.coords.length; i++) {
            this.coords[i][1] += value;
        }

        this.top = value;
    };
    Figure.prototype.TestSide = function (arr) {
        if (Array.isArray(arr)) {
            for (i = 0; i < arr.length; i++) {
                display.pixels[this.coords[arr[i]][0] + 5][this.coords[arr[i]][1]].Draw(this.color);
            }
        }
    };
    /**
     * @return {boolean}
     */
    Figure.prototype.Move = function (direction) {
        switch (direction) {
            case 'up':
                display.moveFigureUp(this);
                break;
            case 'down':
                if (!display.moveFigureDown(this)) {
                    display.checkLines(this);
                    this.randomFigure2();
                    this.DrawRandom();
                    //this.Draw();
                    return false;
                }
                return true;
                break;
            case 'right':
                display.moveFigureRigth(this);
                break;
            case 'left':
                display.moveFigureLeft(this);
                break;
            case 'type':
                break;
            case 'kind':
                display.kindFigure(this);
                break;
            case 'quickly':
                while (this.Move('down')) {
                }
            default:
                break;
        }
    };
    function randomFromTo(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    var figure = new Figure();
    figure.randomFigure2();
    figure.DrawRandom();

    addEventListener("keydown", function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 87:
                figure.Move('up');
                break;
            case 38:
                figure.Move('kind');
                break;
            case 40: // down
                figure.Move('down');
                break;
            case 39:// right
                figure.Move('right');
                break;
            case 37: // left
                figure.Move('left');
                break;
            case 32: // space
                figure.Move('quickly');
                break;
            default:
                break;
        }
    });
}
;