const Model = function () {
    const tankSprite = new Image();
    tankSprite.src = "assets/img/tank.png"
    const enemySprite1 = new Image();
    enemySprite1.src = "assets/img/tank.png";
    const enemySprite2 = new Image();
    enemySprite2.src = "assets/img/tank.png";

    this.objs = {
        canvas: {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            border: CANVAS_BORDER,
        },
        tank: {
            type: "tank",
            x: INITIAL_TANK_X,
            y: INITIAL_TANK_Y,
            xScale: 0.1,
            yScale: 0.1,
            direction: INITIAL_TANK_DIRECTION,
            hidden: false,
            sprite: tankSprite
        },
        enemies: [
            {
                type: "tank",
                x: Math.floor(Math.random() * 400 - 200),
                y: INITIAL_ENEMY_Y,
                xScale: 0.1,
                yScale: 0.1,
                direction: INITIAL_ENEMY_DIRECTION,
                hidden: false,
                sprite: enemySprite1
            },
            {
                type: "tank",
                x: Math.floor(Math.random() * 400 - 200),
                y: INITIAL_ENEMY_Y + 100,
                xScale: 0.1,
                yScale: 0.1,
                direction: INITIAL_ENEMY_DIRECTION,
                hidden: false,
                sprite: enemySprite2
            }
        ],
        bullet: {
            type: "bullet",
            x: INITIAL_BULLET_X,
            y: INITIAL_BULLET_Y,
            size: 10,
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
    x = x === (undefined || null) ? obj.x : x;
    y = y === (undefined || null) ? obj.y : y;
    this.checkCollisions(obj, x, y);
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

Model.prototype.checkCollisions = function (obj, x, y) {
    const delta = obj.type !== "bullet" ? obj.xScale * obj.sprite.naturalWidth / 2 : obj.size / 2;
    const borderCollision =
        x - delta <= LEFT_BORDER ||
        x + delta >= RIGHT_BORDER ||
        y - delta <= UP_BORDER ||
        y + delta >= DOWN_BORDER;

    const enemyCollision = this.isEnemyCollisions(x, y);

    if (!borderCollision && !enemyCollision) {
        obj.x = x;
        obj.y = y;
    } else if (obj.type === "bullet") {
        this.hide(obj, true);

        if (enemyCollision) {
            this.objs.score++;
            this.objs.enemies.forEach(enemy => {
                if (this.isEnemyCollision(enemy, x, y)) {
                    this.hide(enemy, true);
                }
            })
        }
    }
}

Model.prototype.isEnemyCollisions = function (x, y) {
    let result = false;
    this.objs.enemies.forEach(enemy => {
        if (!this.isHidden(enemy)) {
            result |= this.isEnemyCollision(enemy, x, y);
        }
    });
    return result;
}

Model.prototype.isEnemyCollision = function (enemy, x, y) {
    if (!this.isHidden(enemy)) {
        const width = enemy.xScale * enemy.sprite.naturalWidth;
        const height = enemy.yScale * enemy.sprite.naturalHeight;
        const xCollision = ((x >= enemy.x && x <= enemy.x + width) ||
            (x + width >= enemy.x && x + width <= enemy.x + width));
        const yCollision = ((y >= enemy.y && y <= enemy.y + height) ||
            (y + height >= enemy.y && y + height <= enemy.y + height));
        return xCollision && yCollision;
    } else {
        return false;
    }
}

const tankModel = new Model();
