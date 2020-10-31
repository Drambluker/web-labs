const Controller = function (View, Model) {
  this.tankView = View;
  this.tankModel = Model;
};

Controller.prototype.init = function () {
  this.tankView.onKeyDownEvent = this.moving.bind(this);
  this.tankView.init();
  this.tankModel.init(this.needRendering.bind(this));
  this.needRendering();
};

Controller.prototype.moving = function (e) {
  this.tankModel.tankMove(e);
};

Controller.prototype.needRendering = function () {
  this.tankView.render(tankModel.objs);
};

const tankController = new Controller(tankView, tankModel);
tankController.init();
