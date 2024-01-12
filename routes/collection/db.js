import mongoose from "mongoose";
const connection = mongoose.createConnection("mongodb://127.0.0.1/collection", {
  useNewUrlParser: true,
  useUnifiedTopology: true, // 也推荐添加这个选项以使用最新的连接拓扑结构
});

var db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("collection connected!");
});

const webSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    }, //网站名称
    url: {
      type: String,
      default: "",
    }, //网站网址
    imgId: {
      type: String,
      default: "",
    }, //图片id-上传
    img: {
      type: String,
      default: "",
    }, //图片地址-线上
    desc: {
      type: String,
      default: "",
    }, //网站描述
    category: {
      type: String,
      default: "",
    }, //所属分类
  },
  {
    // 序列化选项
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // 将 _id 复制到 id
        delete ret._id; // 删除原 _id（可选，取决于是否真的要移除 _id）
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Web = connection.model("Web", webSchema);
const model = Web;

// 创建记录
function add(data) {
  const newItem = new Web(data);
  // 保存记录并返回Promise实例
  return newItem.save();
}

// 查询所有记录
function findAll() {
  // 查找所有用户记录，并返回Promise实例
  return model.find({});
}
// 根据id查询记录
function find(condition) {
  // 根据id查找用户记录，并返回Promise实例
  let keys = Object.keys(condition);
  let conditionPlus = condition;
  if (keys.includes("id")) {
    conditionPlus["_id"] = condition["id"];
    delete conditionPlus.id;
  }
  return model.find(conditionPlus);
}

// 更新记录
function update(id, data) {
  // 根据id更新用户记录，并返回Promise实例
  return model.findByIdAndUpdate(id, data, { new: true });
}

// 删除记录
function cancel(_id) {
  // 根据id删除用户记录，并返回Promise实例
  return model.deleteOne({ _id });
}

// 导出定义的库对象
export { add, findAll, find, update, cancel };
