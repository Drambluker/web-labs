const DIRECTION_LEFT = 0;
const DIRECTION_UP = 1;
const DIRECTION_RIGHT = 2;
const DIRECTION_DOWN = 3;
const INITIAL_TANK_X = 0.0;
const INITIAL_TANK_Y = 0.0;
const INITIAL_TANK_DIRECTION = DIRECTION_UP;
const INITIAL_ENEMY_X = -200.0;
const INITIAL_ENEMY_Y = -200.0;
const INITIAL_ENEMY_DIRECTION = DIRECTION_LEFT;
const INITIAL_BULLET_X = INITIAL_TANK_X;
const INITIAL_BULLET_Y = INITIAL_TANK_Y;
const INITIAL_BULLET_DIRECTION = INITIAL_TANK_DIRECTION;
const LEFT_BORDER = -400;
const RIGHT_BORDER = 360;
const UP_BORDER = -300;
const DOWN_BORDER = 260;
const KEY_CODE_SPACE = 32;
const KEY_CODE_LEFT = 37;
const KEY_CODE_UP = 38;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_DOWN = 40;
const TANK_STEP = 2;
const BULLET_STEP = 1;

var Model = function () {
  this.objs = {
    tank: {
      type: "tank",
      x: INITIAL_TANK_X,
      y: INITIAL_TANK_Y,
      direction: INITIAL_TANK_DIRECTION,
      hidden: false,
    },
    enemy: {
      type: "tank",
      x: Math.floor(Math.random() * 400 - 200),
      y: INITIAL_ENEMY_Y,
      direction: INITIAL_ENEMY_DIRECTION,
      hidden: false,
    },
    bullet: {
      type: "bullet",
      x: INITIAL_BULLET_X,
      y: INITIAL_BULLET_Y,
      direction: INITIAL_BULLET_DIRECTION,
      hidden: true,
    },
    score: 0,
  };
};

Model.prototype.init = function (renderFunction) {
  this.needRendering = renderFunction;
};

Model.prototype.setCoords = function (obj, x, y) {
  x = x == (undefined || null) ? obj.x : x;
  y = y == (undefined || null) ? obj.y : y;
  checkCollisions.call(this, obj, x, y);
  this.needRendering();
};

Model.prototype.getCoords = function (obj) {
  return {
    x: obj.x,
    y: obj.y,
  };
};

Model.prototype.setDirection = function (obj, direction) {
  obj.direction = direction;
  this.needRendering();
};

Model.prototype.getDirection = function (obj) {
  return obj.direction;
};

Model.prototype.hide = function (obj, state) {
  obj.hidden = state;
  this.needRendering();
};

Model.prototype.isHidden = function (obj) {
  return obj.hidden;
};

Model.prototype.tankMove = function (e) {
  const keyCode = e.keyCode;
  const x = tankModel.getCoords(tankModel.objs.tank).x;
  const y = tankModel.getCoords(tankModel.objs.tank).y;
  const direction = tankModel.getDirection(tankModel.objs.tank);

  switch (keyCode) {
    case KEY_CODE_LEFT: {
      tankModel.setDirection(tankModel.objs.tank, DIRECTION_LEFT);
      tankModel.setCoords(tankModel.objs.tank, x - TANK_STEP, null);
      break;
    }
    case KEY_CODE_UP: {
      tankModel.setDirection(tankModel.objs.tank, DIRECTION_UP);
      tankModel.setCoords(tankModel.objs.tank, null, y - TANK_STEP);
      break;
    }
    case KEY_CODE_RIGHT: {
      tankModel.setDirection(tankModel.objs.tank, DIRECTION_RIGHT);
      tankModel.setCoords(tankModel.objs.tank, x + TANK_STEP, null);
      break;
    }
    case KEY_CODE_DOWN: {
      tankModel.setDirection(tankModel.objs.tank, DIRECTION_DOWN);
      tankModel.setCoords(tankModel.objs.tank, null, y + TANK_STEP);
      break;
    }
    case KEY_CODE_SPACE: {
      tankModel.setDirection(tankModel.objs.bullet, direction);
      tankModel.setCoords(tankModel.objs.bullet, x, y);
      tankModel.hide(tankModel.objs.bullet, false);
      requestAnimationFrame(tankModel.tankBang);
      break;
    }
  }
};

Model.prototype.tankBang = function () {
  const direction = tankModel.getDirection(tankModel.objs.bullet);
  let bullet = tankModel.objs.bullet;
  let x = tankModel.getCoords(bullet).x;
  let y = tankModel.getCoords(bullet).y;

  switch (direction) {
    case DIRECTION_LEFT:
      tankModel.setCoords(bullet, x - BULLET_STEP, y);
      break;
    case DIRECTION_UP:
      tankModel.setCoords(bullet, null, y - BULLET_STEP);
      break;
    case DIRECTION_RIGHT:
      tankModel.setCoords(bullet, x + BULLET_STEP, y);
      break;
    case DIRECTION_DOWN:
      tankModel.setCoords(bullet, null, y + BULLET_STEP);
      break;
  }

  if (!bullet.hidden) {
    requestAnimationFrame(tankModel.tankBang);
  }
};

function checkCollisions(obj, x, y) {
  const borderCollision =
    x <= LEFT_BORDER || x >= RIGHT_BORDER || y <= UP_BORDER || y >= DOWN_BORDER;

  let enemyCollision = false;

  if (!tankModel.isHidden(tankModel.objs.enemy)) {
    enemyCollision =
      ((y >= tankModel.objs.enemy.y && y <= tankModel.objs.enemy.y + 40) ||
        (y + 40 >= tankModel.objs.enemy.y &&
          y + 40 <= tankModel.objs.enemy.y + 40)) &&
      ((x >= tankModel.objs.enemy.x && x <= tankModel.objs.enemy.x + 40) ||
        (x + 40 >= tankModel.objs.enemy.x &&
          x + 40 <= tankModel.objs.enemy.x + 40));
  }

  if (!borderCollision && !enemyCollision) {
    obj.x = x;
    obj.y = y;
  } else if (obj.type === "bullet") {
    tankModel.hide(obj, true);

    if (enemyCollision) {
      tankModel.objs.score++;
      tankModel.hide(tankModel.objs.enemy, true);
    }
  }
}

const tankModel = new Model();
