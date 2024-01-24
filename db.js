import mongoose from "mongoose";
const connection = mongoose.createConnection("mongodb://localhost:27017/userTest", {
  useNewUrlParser: true,
  useUnifiedTopology: true, // 也推荐添加这个选项以使用最新的连接拓扑结构
});

var db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("userTest connected!");
});

const userSchema = new mongoose.Schema({
  name: String,
  code: String,
  score: Number,
  id: String,
});

const User = connection.model("User", userSchema);

// 创建记录
function createUser(id, name, code, score) {
  const newUser = new User({
    id,
    name,
    code,
    score,
  });
  // 保存记录并返回Promise实例
  return newUser.save();
}

// 查询所有记录
function findAllUsers() {
  // 查找所有用户记录，并返回Promise实例
  return User.find({});
}
// 根据id查询记录
function findUserById(id) {
  // 根据id查找用户记录，并返回Promise实例
  return User.findOne({ id });
}

// 更新记录
function updateUser(id, states) {
  // 根据id更新用户记录，并返回Promise实例
  return User.updateOne({ id }, states);
}

// 删除记录
function deleteUser(id) {
  // 根据id删除用户记录，并返回Promise实例
  return User.deleteOne({ id });
}

// 导出定义的库对象，包括User模型和各种操作方法
export const UserDb = {
  User,
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};
