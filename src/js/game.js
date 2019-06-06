const Furry = require("./furry");
const Coin = require("./coin");




function Game() {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;


    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        let furryDiv = document.querySelector('.furry');
        furryDiv.classList.remove('furry')
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin')
    };

    this.moveFurry = function () {
        this.hideVisibleFurry();

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.checkCoinCollision();
        this.showFurry();


    };

    document.addEventListener('keydown', function (event) {
        game.turnFurry(event);
    });

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }

    };




    this.removeCoin = function () {
        const coin = document.querySelector('.coin');
        coin.classList.remove('coin')
    };

    let scoreId = document.querySelector('#score div strong');


    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.removeCoin();
            this.score++;
            scoreId.innerText = (+this.score);
            this.coin = new Coin();
            this.showCoin();
        }
    };



    this.gameOver = function() {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);

            let board = document.querySelector("#board");
            board.parentElement.removeChild(board);
            let score = document.getElementById("score");
            score.parentElement.removeChild(score);
            const over = document.getElementById("over");
            over.classList.remove("invisible");
            over.querySelector("span:nth-of-type(2)").innerText = "Your score: " + this.score;
            game.hideVisibleFurry();
        }
    };

    const self = this;
    this.startGame = function () {
        self.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250)
    };


}


const game = new Game();
game.startGame();
game.showFurry();
game.showCoin();

module.exports = Game;
module.exports = Furry;
module.exports = Coin;