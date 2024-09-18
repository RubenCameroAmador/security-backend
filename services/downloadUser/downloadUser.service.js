// /services/userService.js
import User from '../../models/user.js'

const getAllUsers = async () => {
  return await User.find();
};

export { getAllUsers }