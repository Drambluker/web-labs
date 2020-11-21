const View = function () {
  this.score = document.querySelector(".score");
  this.scene = document.querySelector(".scene");
  this.tank = document.querySelector(".tank");
  this.enemies = document.querySelectorAll(".enemy");
  this.bullet = document.querySelector(".bullet");
  this.onKeyDownEvent = null;
};

View.prototype.init = function () {
  document.addEventListener("keydown", this.onKeyDownEvent);
};

View.prototype.render = function (objs) {
  this.scene.setAttribute("width", objs.scene.width.toString());
  this.scene.setAttribute("height", objs.scene.height.toString());
  this.scene.style.border = objs.scene.borderWidth + "px solid " + objs.scene.borderColor;
  this.renderImgEntity(this.tank, objs.tank, objs.scene);

  for (let i = 0; i < this.enemies.length && i < objs.enemies.length; i++) {
    this.renderImgEntity(this.enemies[i], objs.enemies[i], objs.scene);
  }

  this.basicRenderEntity(this.bullet, objs.bullet, objs.scene);
  this.score.textContent = objs.score;
};

View.prototype.renderImgEntity = function (entity, model, scene) {
  this.basicRenderEntity(entity, model, scene);
  entity.setAttribute("href", model.sprite);
}

View.prototype.basicRenderEntity = function (entity, model, scene) {
  if (model.hidden) {
    entity.setAttribute("width", 0);
    entity.setAttribute("height", 0);
    return;
  }

  entity.setAttribute("width", model.width);
  entity.setAttribute("height", model.height);

  let degrees;
  switch (model.direction) {
    case DIRECTION_LEFT:
      degrees = 180;
      entity.setAttribute("x", (-0.5 * (scene.width) - model.x - 0.5 * model.width).toString());
      entity.setAttribute("y", (-0.5 * (scene.height) + model.y - 0.5 * model.height).toString());
      break;
    case DIRECTION_UP:
      degrees = 270;
      entity.setAttribute("x", (-0.5 * (scene.height) + model.y - 0.5 * model.height).toString());
      entity.setAttribute("y", (0.5 * (scene.width) + model.x - 0.5 * model.width).toString());
      break;
    case DIRECTION_RIGHT:
      degrees = 0;
      entity.setAttribute("x", (0.5 * (scene.width) + model.x - 0.5 * model.width).toString());
      entity.setAttribute("y", (0.5 * (scene.height) - model.y - 0.5 * model.height).toString());
      break;
    case DIRECTION_DOWN:
      degrees = 90;
      entity.setAttribute("x", (0.5 * (scene.height) - model.y - 0.5 * model.height).toString());
      entity.setAttribute("y", (-0.5 * (scene.width) - model.x - 0.5 * model.width).toString());
      break;
  }
  entity.setAttribute("transform", "rotate(" + degrees + ")");
}

const tankView = new View();
