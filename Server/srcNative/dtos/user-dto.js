module.exports = class UserDto {
  email;

  isActivated;

  id;

  firstName;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.firstName = model.firstName;
  }
};
