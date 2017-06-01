// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里

    this.x = x;
    this.y = y;
    //改变速度随机数字。
    this.bian = Math.random()+0.5;
    // 我们已经提供了一个来帮助你实现更多
    this.speed = speed * this.bian;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.addSpeed = 0;

};


// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    var randomSpeed = this.speed+this.addSpeed;
   //增加游戏难度
    this.addSpeed+=0.2;
    this.x = this.x + (randomSpeed*this.bian) * dt;
    if(this.x>505){
        this.x = -100;
        //随机更改虫子移动速度。
        // bian = Math.random()+0.5;
        //
        // this.speed = this.speed * bian;
    }

    // 都是以同样的速度运行的
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //调用碰撞测试函数
    this.checkCollision.call(this,player);
    //虫子移除画面后折返

};



//碰撞函数

Enemy.prototype.checkCollision = function (player) {
    if(this.y === player.y){
        if (player.x-80 < this.x && this.x < player.x+20) {
            player.x = 218;
            player.y = 383;
            lifeCount.lifeShow();
            console.log("撞啦")
        }
    }

    };


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.succeed = false;
    this.sprite = 'images/char-boy.png';
    this.canMoveLeft=function () {
        return this.x >= 101;
        };

    this.canMoveRight=function () {
            return this.x <= 404;

    };
    this.canMoveForward=function () {

        return this.y >= 55;
    };
    this.canMoveBackward=function () {
        return this.y <= 400;
    };

    this.moveLeft = function () {
        this.x -= 101;
    };
    this.moveRight = function () {
        this.x += 101;
    };
    this.moveForward = function () {
        this.y -= 83;
    };
    this.moveBackward = function () {
        this.y += 83;
    }

};


Player.prototype.update = function (dt) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


    if(this.y==51 && !this.succeed == true){

        lifeCount.winCount();
        this.succeed = true;
        console.log("过关");
        console.log(this.succeed);
    }
};
Player.prototype.handleInput = function (movement) {
    switch(movement){
        // case"left":
        //     this.x -= 101;
        //     break;
        // case"right":
        //     this.x += 101;
        //     break;
        // case"up":
        //     this.y -= 83;
        //     break;
        // case"down":
        //     this.y += 83;
        //     break;


        case 'left':
            if (this.canMoveLeft.call(this)) {
                this.moveLeft();
                break;
            }
            break;
        case 'right':
            if (this.canMoveRight.call(this)) {
                this.moveRight();
                break;
            }
            break;
        case 'up':
            if (this.canMoveForward.call(this)) {
                this.moveForward();
                break;
            }
            break;
        case 'down':
            if (this.canMoveBackward.call(this)) {
                this.moveBackward();
                break;
            }
    }
};




// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面

var allEnemies = [new Enemy(0,134,200),
                  new Enemy(0,134+83,200),
                  new Enemy(0,134+83*2,200)];


// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(218,383);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//小人生命值计算
var LifeCun = function (life) {
    this.life = life;
    this.count = 0;
    this.win = document.querySelector("#winCount");

    // console.log(this.life);
};


//添加文字标签
LifeCun.prototype.lifeFirstShow= function(){
    var show = document.querySelector("div");
    show.innerHTML="<p>还剩</p>"+this.life+"<p>条命</p>";
};


//碰撞后计算命数。
LifeCun.prototype.lifeShow= function(){
    var show = document.querySelector("#lifeCount");
        show.innerHTML="<p>还剩</p>"+(this.life - 1)+"<p>条命</p>";
    this.life = this.life - 1;
    //当生命耗尽，显示game over。
    if(this.life <= 0){
        show.innerHTML="<p>Game Over</p>";
        show.style.height = "300px";
        show.style.zIndex= 1000;
        show.style.fontSize = "200px";
        show.style.lineHeight = "250px";

        //一并更改过关计数的div高度
        lifeCount.winCountChangeHeight();
    }

};
//过关计数
LifeCun.prototype.winCount = function () {

    var winImage = document.querySelector("#winImage");

    this.win.innerHTML = "<p>顺利过关</p>" + this.count + "<p>次</p>";

    //顺利过关的图片。粗糙到爆炸。。。
    winImage.innerHTML = "<img src='images/Selector.png'>";


    if (this.life > 0) {
        this.count++;
        Player.succeed = true;
    }



    //一个像素位移，防止winCount因为延时不停的计数。
    //导致每次刷新小人的y坐标都在52. 咋办？？？？？
    // player.y = 52;


    //延时。让小人在胜利的地方骄傲一会儿
    setTimeout(function () {
        player.succeed = false;
        player.x = 218;
        player.y = 383;
        winImage.innerHTML = "";
        console.log(Player.succeed)

    }, 500);
};

// game over 时改变过关计数div的高度
LifeCun.prototype.winCountChangeHeight = function () {
    var win = document.querySelector("#winCount");

    win.innerHTML="<p>顺利过关</p>"+this.count+"<p>次</p>";
    win.style.height = "100px";
    win.style.fontSize= "70px";
};


//创建生命计算
lifeCount = new LifeCun(3);
//调用过关计数显示
lifeCount.lifeFirstShow();
//调用过关计数器
lifeCount.winCount();