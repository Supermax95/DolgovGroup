module.exports = class UserDto {
  email;

  isActivated;

  id;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
};