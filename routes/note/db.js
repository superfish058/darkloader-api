import mongoose from "mongoose";
const connection = mongoose.createConnection("mongodb://localhost:27017/note", {
  useNewUrlParser: true,
  useUnifiedTopology: true, // 也推荐添加这个选项以使用最新的连接拓扑结构
});

var db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("note connected!");
});

const sliderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    }, //标签名称
    type: {
      type: Number,
    },
  },
  {
    // 序列化选项
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // 将 _id 复制到 id
        // delete ret._id; // 删除原 _id（可选，取决于是否真的要移除 _id）
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        // delete ret._id;
      },
    },
  }
);

const noteSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "全部",
    }, //笔记名称
    title: {
      type: String,
      default: "无标题",
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // 这会添加 createdAt 和 updatedAt 字段
    // 序列化选项
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // 将 _id 复制到 id
        // delete ret._id; // 删除原 _id（可选，取决于是否真的要移除 _id）
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        // delete ret._id;
      },
    },
  }
);

const Slider = connection.model("Slider", sliderSchema);
const Note = connection.model("Note", noteSchema);
const model = Slider;

// 创建记录
function addNote(data) {
  const newItem = new Note(data);
  // 保存记录并返回Promise实例
  return newItem.save();
}

// 查询所有记录
function findAllNote() {
  // 查找所有用户记录，并返回Promise实例
  return Note.find({});
}
// 根据id查询记录
function findNote(condition) {
  // 根据id查找记录，并返回Promise实例
  let keys = Object.keys(condition);
  let conditionPlus = condition;
  if (keys.includes("id")) {
    conditionPlus["_id"] = condition["id"];
    delete conditionPlus.id;
  }
  return Note.find(conditionPlus);
}

// 更新记录
function updateNote(id, data) {
  // 根据id更新记录，并返回Promise实例
  return Note.findByIdAndUpdate(id, data, { new: true });
}

// 删除记录
function cancelNote(_id) {
  // 根据id删除记录，并返回Promise实例
  return Note.deleteOne({ _id });
}

// 创建记录
function add(data) {
  const newItem = new model(data);
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
export { add, findAll, find, update, cancel, addNote, findAllNote, findNote, updateNote, cancelNote };
