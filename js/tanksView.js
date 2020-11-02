const View = function () {
  this.score = document.querySelector(".score");
  this.canvas = document.querySelector(".canvas");
  this.ctx = this.canvas.getContext("2d");
  this.onKeyDownEvent = null;
};

View.prototype.init = function () {
  document.addEventListener("keydown", this.onKeyDownEvent);
};

View.prototype.render = function (objs) {
  this.canvas.width = objs.canvas.width;
  this.canvas.height = objs.canvas.height;
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.strokeStyle = "black";
  this.ctx.lineWidth = objs.canvas.border;
  this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

  let degrees;
  switch (objs.tank.direction) {
    case DIRECTION_LEFT:
      degrees = 180;
      break;
    case DIRECTION_UP:
      degrees = 270;
      break;
    case DIRECTION_RIGHT:
      degrees = 0;
      break;
    case DIRECTION_DOWN:
      degrees = 90;
      break;
  }

  this.renderSprite(objs.tank.sprite, objs.tank.x, objs.tank.y, degrees, objs.tank.xScale, objs.tank.yScale);

  objs.enemies.forEach(enemy => {
    if (!enemy.hidden) {
      this.renderSprite(enemy.sprite, enemy.x, enemy.y, 0, enemy.xScale, enemy.yScale);
    }
  })

  this.score.textContent = objs.score;

  if (!objs.bullet.hidden) {
    this.ctx.fillStyle = "black";
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2 + objs.bullet.x, this.canvas.height / 2 + objs.bullet.y)
    this.ctx.fillRect(-objs.bullet.size / 2, -objs.bullet.size / 2, objs.bullet.size, objs.bullet.size);
    this.ctx.restore();
  }
};

View.prototype.renderSprite = function (sprite, x, y, angle, xScale, yScale) {
  this.ctx.save();
  this.ctx.translate(this.canvas.width / 2 + x, this.canvas.height / 2 + y);
  this.ctx.rotate(Math.PI * angle / 180);
  this.ctx.drawImage(sprite,
      -xScale * sprite.naturalWidth / 2, -yScale * sprite.naturalHeight / 2,
      sprite.naturalWidth * xScale, sprite.naturalHeight * yScale);
  this.ctx.restore();
}

const tankView = new View();
