import mongoose from "mongoose";
const connection = mongoose.createConnection("mongodb://localhost:27017/schedule", {
  useNewUrlParser: true,
  useUnifiedTopology: true, // 也推荐添加这个选项以使用最新的连接拓扑结构
});
mongoose.set("useFindAndModify", false);

var db = connection;
db.on("error", console.error.bind(console, "schedule error:"));
db.once("open", function () {
  console.log("schedule connected!");
});

const scheduleSchema = new mongoose.Schema(
  {
    date: Date, //日期
    plan: [{
      content:String,
      situation:String,
      comment:String
    }],//计划
    diet:{
      weight1:String,
      weight2:String,
      food1:String,
      food2:String,
      food3:String,
      food4:String
    },//饮食，早，晚体重，早中晚，其他，摄入
    rate:{
      type:Number,
      default:0
    },//评分
    evaluation:String,//评价
    remark:String,//备注
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

const Schedule = connection.model("Schedule", scheduleSchema);
const model = Schedule;

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
export { add, findAll, find, update, cancel };
