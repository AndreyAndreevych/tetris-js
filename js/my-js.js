var worldArray = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
];

var nextArray = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];

var shapes = [
    /*figure1*/
    {rotation:0, data:
        [
        [[1,1,0],[0,1,1]],
        [[0,1],[1,1],[1,0]],
        [[1,1,0],[0,1,1]],
        [[0,1],[1,1],[1,0]],
        ]},
    /*figure2*/
    {rotation:0, data:
        [
        [[2,2],[2,2]],
        [[2,2],[2,2]],
        [[2,2],[2,2]],
        [[2,2],[2,2]],
        ]},
    /*figure3*/
    {rotation:0, data:
        [
        [[3,3,3,3]],
        [[3],[3],[3],[3]],
        [[3,3,3,3]],
        [[3],[3],[3],[3]],
        ]},
    /*figure4*/
    {rotation:0, data:
        [
        [[0,0,4],[4,4,4]],
        [[4,4],[0,4],[0,4]],
        [[4,4,4],[4,0,0]],
        [[4,0],[4,0],[4,4]],
        ]},
    /*figure5*/
    {rotation:0, data:
        [
        [[5,0,0],[5,5,5]],
        [[5,5],[5,0],[5,0]],
        [[5,5,5],[0,0,5]],
        [[0,5],[0,5],[5,5]],
        ]},
    /*figure6*/
    {rotation:0, data:
        [
        [[0,6,0],[6,6,6]],
        [[0,6],[6,6],[0,6]],
        [[6,6,6],[0,6,0]],
        [[6,0],[6,6],[6,0]],
        ]}, 
    /*figure7*/
    {rotation:0, data:
        [
        [[0,7,7],[7,7,0]],
        [[7,0],[7,7],[0,7]],
        [[0,7,7],[7,7,0]],
        [[7,0],[7,7],[0,7]],
        ]},                           
];

var curFigure = {x:3, y:-1, width:0, height:0};

var time = 1000;
var move;
var score = 0;

function drawWorld () {
	$.each(worldArray, function(line_index, line) {
		$.each(line, function(cell_index, cell) {
			var id = "#line_" + line_index + "_cell_" + cell_index;
			$(id).removeClass();
			$(id).addClass('cell_type_' + cell);
		});
	});
}

function drawNext () {
    $.each(nextArray, function(line_index, line) {
        $.each(line, function(cell_index, cell) {
            var id = "#next-line_" + line_index + "_cell_" + cell_index;
            $(id).removeClass();
            $(id).addClass('cell_type_' + cell);
        });
    });
}

function moveShapesDown () {
    canMove = true;
    for(var y = worldArray.length - 1; y >= 0; y--) {
        for(var x = 0; x < worldArray[y].length; x++) {
            if(worldArray[y][x] > 0 && worldArray[y][x] < 10 ) {
                if(y + 1 === worldArray.length || worldArray[y + 1][x] > 10) {
                    canMove = false;
                    freeze();
                    if(worldArray[0][x] == 11) {
                        endGame();
                    };
                    if(worldArray[0][x] !== 11) {
                        createFigure();
                        createNextFigure();
                    };
                    
                };
            };
        };
    };
    if (canMove) {
        for(var y = worldArray.length - 1; y >= 0; y--) {
            for(var x = 0; x < worldArray[y].length; x++) {
                if(worldArray[y][x] > 0 && worldArray[y][x] < 10 ){
                    worldArray[y + 1][x] = worldArray[y][x];
                    worldArray[y][x] = 0;
                };
            };
        };
        curFigure.y++;
        drawWorld();
    };
    checkLines();
};

function moveShapesLeft () {
	canMove = true;
    for(var y = worldArray.length - 1; y >= 0; y--) {
        for(var x = 0; x < worldArray[y].length; x++) {
            if(worldArray[y][x] > 0 && worldArray[y][x] < 10 ) {
                if(x === 0 || worldArray[y][x - 1] > 10) {
                    canMove = false;
                };
            };
        };
    };
    if (canMove) {
        for(var y = worldArray.length - 1; y >= 0; y--) {
            for(var x = 0; x < worldArray[y].length; x++) {
                if(worldArray[y][x] > 0 && worldArray[y][x] < 10 ){
                    worldArray[y][x - 1] = worldArray[y][x];
                    worldArray[y][x] = 0;
                };
            };
        };
        curFigure.x--;
        drawWorld();
    };
};

function moveShapesRight () {
	canMove = true;
    for(var y = worldArray.length - 1; y >= 0; y--) {
        for(var x = 0; x < worldArray[y].length; x++) {
            if(worldArray[y][x] > 0 && worldArray[y][x] < 10 ) {
                if(x === 9 || worldArray[y][x + 1] > 10) {
                    canMove = false;
                };
            };
        };
    };
    if (canMove) {
        for(var y = worldArray.length - 1; y >= 0; y--) {
            for(var x = worldArray[y].length; x >= 0; x--) {
                if(worldArray[y][x] > 0 && worldArray[y][x] < 10 ){
                    worldArray[y][x + 1] = worldArray[y][x];
                    worldArray[y][x] = 0;
                };
            };
        };
        curFigure.x++;
        drawWorld();
    };
};

function rotate () {
    canTurn = true;
    curFigure.width = curFigure.data[curFigure.rotation][0].length;
    curFigure.height = curFigure.data[curFigure.rotation].length;
    for(var y = worldArray.length - 1; y >= 0; y--) {
        for(var x = 0; x < worldArray[y].length; x++) {
            if(worldArray[y][x] > 0 && worldArray[y][x] < 10 ) {
                if(y + 1 === worldArray.length || worldArray[y + 1][x] > 10 || (curFigure.width == 2 && x === 9) || (curFigure.width == 1 && x === 9) || (curFigure.width == 1 && x === 8) || (curFigure.width == 1 && x === 7) || (curFigure.width == 2 && worldArray[y][x + 1] > 10) || (curFigure.width == 1 && worldArray[y][x + 1] > 10) || (curFigure.width == 1 && worldArray[y][x + 2] > 10) || (curFigure.width == 1 && worldArray[y][x + 3] > 10) || (curFigure.width == 4 && y === 19) || (curFigure.width == 4 && y === 18) || (curFigure.width == 4 && y === 17) || (curFigure.width == 4 && worldArray[y + 1][x] > 10) || (curFigure.width == 4 && worldArray[y + 2][x] > 10) || (curFigure.width == 4 && worldArray[y + 3][x] > 10)) {
                    canTurn = false;  
                };
            };
        };
    };
    if (canTurn) {
        if (curFigure.rotation < 3){
            curFigure.rotation++;
        }
        else curFigure.rotation = 0;
        for(var y = 0; y < curFigure.height; y++) {
            for(var x = 0; x < curFigure.width; x++) {
                worldArray[curFigure.y + y][curFigure.x + x] = 0;
            }
        }
        curFigure.width = curFigure.data[curFigure.rotation][0].length;
        curFigure.height = curFigure.data[curFigure.rotation].length;
        for(var y = 0; y < curFigure.height; y++) {
            for(var x = 0; x < curFigure.width; x++) {
                worldArray[curFigure.y + y][curFigure.x + x] = 0;
                worldArray[curFigure.y + y][curFigure.x + x] = curFigure.data[curFigure.rotation][y][x];
            }
        }
        drawWorld();
    };
};

function moveShapes () {
	$('html').keydown(function(event){
  		switch (event.keyCode) {
  			case 38:
  				rotate();
				break;
			case 39:
  				moveShapesRight();
				break;
			case 40:
  				moveShapesDown();
				break;
			case 37:
  				moveShapesLeft();
				break;			
  		}
	});
}

function freeze () {
    for(var y = worldArray.length - 1; y >= 0; y--) {
        for(var x = 0; x < worldArray[y].length; x++) {
            if(worldArray[y][x] > 0 && worldArray[y][x] < 10) {
               	worldArray[y][x] = 11;
            };
        };
    };
    curFigure.y = 0;
    curFigure.x = 3;
    checkLines();
};

function checkLines () {
    for(var y = worldArray.length - 1; y >= 0; y--) {
        fullLine = true;
        for(var x = 0; x<worldArray[y].length; x++) {
            if(worldArray[y][x] < 10) {
                fullLine = false;
            };
        };
        if (fullLine) {
            worldArray.splice(y, 1);
            worldArray.splice(0, 0, [0,0,0,0,0,0,0,0,0,0]);
            y++;
            score = score + 10;
            $("#score").text(score);
            $("#score-end").text(score);
        };
    };
};

function start () {
	$("#start-button").on("click", function() {
		gameMotion();
		$("#start-button").prop("disabled", true);
        createFirstFigure();
        createNextFigure();
	});
};

function restart () {
    $("#restart-button").on("click", function() {
        $("#end-game").css("display", "none");
        $("#start-button").prop("disabled", false);
        score = 0;
        $("#score").text(score);
        $("#score-end").text(score);
        time = 1000;
        for(var i = 0; i < 20; i++) {
            for(var j = 0; j < 10; j++) {
                worldArray[i][j] = 0;
            };
        };
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 7; j++) {
                nextArray[i][j] = 0;
            };
        };
        drawNext();
        drawWorld();
        moveShapes();
    });
};

function createFirstFigure () {
    curFigure = Object.assign({}, curFigure, shapes[getRandom(0,6)]);
    curFigure.width = curFigure.data[curFigure.rotation][0].length;
    curFigure.height = curFigure.data[curFigure.rotation].length;
    for(var y = 0; y < curFigure.height; y++) {
        for(var x = 0; x < curFigure.width; x++) {
            worldArray[curFigure.y + y][curFigure.x + x] = curFigure.data[0][y][x];
        }
    }
    drawWorld();
};

function createNextFigure () {
    clearNext();
    nextFigure = Object.assign({}, curFigure, shapes[getRandom(0,6)]);
    nextFigure.width = nextFigure.data[nextFigure.rotation][0].length;
    nextFigure.height = nextFigure.data[nextFigure.rotation].length;
    nextFigure.x = 0;
    nextFigure.y = 1;
    for(var y = 0; y < nextFigure.height; y++) {
        for(var x = 0; x < nextFigure.width; x++) {
            nextArray[nextFigure.y + y][nextFigure.x + x] = nextFigure.data[0][y][x];
        }
    }
    drawNext();
};

function clearNext () {
    nextArray = [];
    for(var next_figure_y = 0; next_figure_y < 4; next_figure_y++) {
        for(var next_figure_x = 0; next_figure_x < 4; next_figure_x++) {
            if (!next_figure_x) nextArray.push([]);
            nextArray[next_figure_y][next_figure_x] = 0;
        }
    }
};

function createFigure () {
    curFigure = nextFigure;
    curFigure.width = curFigure.data[curFigure.rotation][0].length;
    curFigure.height = curFigure.data[curFigure.rotation].length;
    curFigure.x = 3;
    curFigure.y = 0;
    for(var y = 0; y < curFigure.height; y++) {
        for(var x = 0; x < curFigure.width; x++) {
            nextArray[nextFigure.y + y][nextFigure.x + x] = 0;
            worldArray[curFigure.y + y][curFigure.x + x] = curFigure.data[0][y][x];
        }
    }
    drawWorld();
}

function gameMotion () {
    switch (score) {
            case 40:
                time = 900;
                break;
            case 80:
                time = 800;
                break;
            case 120:
                time = 700;
                break;
            case 160:
                time = 600;
                break;
            case 200:
                time = 500;
                break;
            case 250:
                time = 400;
                break;
            case 300:
                time = 300;
                break;
            case 400:
                time = 250;
                break;
            case 500:
                time = 200;
                break;                                                  
            default:
                break;
    };            
    move = setTimeout(gameMotion, time);
    moveShapesDown();
    drawWorld();
};

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function endGame () {
    clearTimeout(move);
    $('html').off("keydown");
    $("#end-game").css("display", "block");
};

function visibility () {
    window.timerId2 = window.setInterval(timer2, 400);
}

function timer2 () {
    $("#game-over").toggleClass("visible");
}

$(function() {
	start();
    restart();
	drawWorld();
    drawNext();
	moveShapes();
    visibility();
});