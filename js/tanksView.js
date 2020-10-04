const TANK_SIZE = 40;
const BULLET_SIZE = 10;
const BULLET_OFFSET = 15;

var View = function () {
  this.tank = document.querySelector(".tank");
  this.enemy = document.querySelector(".enemy");
  this.score = document.querySelector(".score");
  this.bullet = document.querySelector(".bullet");
  this.onKeyDownEvent = null;
};

View.prototype.init = function () {
  document.addEventListener("keydown", this.onKeyDownEvent);
};

View.prototype.render = function (objs) {
  let deg;

  this.tank.style.left = "calc(50% + " + objs.tank.x + "px)";
  this.tank.style.top = "calc(50% + " + objs.tank.y + "px)";

  switch (objs.tank.direction) {
    case DIRECTION_LEFT:
      deg = 180;
      break;
    case DIRECTION_UP:
      deg = 270;
      break;
    case DIRECTION_RIGHT:
      deg = 0;
      break;
    case DIRECTION_DOWN:
      deg = 90;
      break;
  }

  this.tank.style.webkitTransform = "rotate(" + deg + "deg)";
  this.tank.style.mozTransform = "rotate(" + deg + "deg)";
  this.tank.style.msTransform = "rotate(" + deg + "deg)";
  this.tank.style.oTransform = "rotate(" + deg + "deg)";
  this.tank.style.transform = "rotate(" + deg + "deg)";

  if (objs.enemy.hidden) {
    this.enemy.style.width = "0px";
    this.enemy.style.height = "0px";
  } else {
    this.enemy.style.width = TANK_SIZE + "px";
    this.enemy.style.height = TANK_SIZE + "px";
    this.enemy.style.left = "calc(50% + " + objs.enemy.x + "px)";
    this.enemy.style.top = "calc(50% + " + objs.enemy.y + "px)";
  }

  this.score.textContent = objs.score;

  if (objs.bullet.hidden) {
    this.bullet.style.width = "0px";
    this.bullet.style.height = "0px";
  } else {
    this.bullet.style.width = BULLET_SIZE + "px";
    this.bullet.style.height = BULLET_SIZE + "px";
    this.bullet.style.left =
      "calc(50% + " + (objs.bullet.x + BULLET_OFFSET) + "px)";
    this.bullet.style.top =
      "calc(50% + " + (objs.bullet.y + BULLET_OFFSET) + "px)";
  }
};

var tankView = new View();
