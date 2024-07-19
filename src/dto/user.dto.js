class UserDTO {
  constructor({ id, username, email, role }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}

module.exports = UserDTO;
