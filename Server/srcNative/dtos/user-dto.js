module.exports = class UserDto {
  // email;

  isActivated;

  id;

  userStatus;
  constructor(model) {
    // this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.userStatus = model.userStatus;
  }
};
