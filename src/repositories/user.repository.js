const User = require("../models/user.model.js"); // Importar el modelo de usuario

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }

  async getUserByUsername(username) {
    return await User.findOne({ username });
  }
}

module.exports = new UserRepository();
