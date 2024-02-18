import express from "express";
import { UserDb } from "./db.js";
import collection from './routes/collection/api.js'
import note from "./routes/note/api.js";

const PORT = 3000; // 用于设置端口号
const app = express(); // 创建一个express应用程序实例
app.use(express.json());

app.use((req, res, next) => {
  const { method, path } = req;
  console.log(`[${method}] ${path}`);
  next();
});


app.use("/", collection);
app.use("/", note);



const setRes = (data, msg = "操作成功", code = 200) => {
  let preQuery = {
    code: code,
    data: "",
    msg: msg,
  };
  preQuery.data = data;
  return preQuery;
};



// 查询列表，id
app.get("/user/list", async (req, res) => {
  const { query } = req;
  let list = [];
  if (query.id) {
    list = await UserDb.findUserById(query.id);
  } else {
    list = await UserDb.findAllUsers();
  }
  res.send(setRes(list));
});

// 新增
app.get("/user/add", (req, res) => {
  const { query } = req;
  const { id, name, code, score } = query;
  UserDb.createUser(id, name, code, score);
  res.send(setRes(query));
});

// 修改
app.get("/user/update", async (req, res) => {
  const { query } = req;
  const {id,...states} = query
  let res1 = await UserDb.updateUser(id, states);
  res.send(setRes(res1));
});

// 删除
app.get("/user/delete", async (req, res) => {
  const { query } = req;
  let allList = await UserDb.findAllUsers();
  let findIndex = allList.findIndex((item) => item.id == query.id);
  let msg = "删除成功";
  let del = null;
  if (findIndex == -1) {
    msg = "查无此单据";
  } else {
    del = await UserDb.deleteUser(query.id);
  }
  let delObj = {
    msg,
    del,
  };
  res.send(setRes(delObj, msg));
});

// 启动 Express 应用程序，监听在指定的端口上
app.listen(PORT, () => {
  // 在控制台输出服务器运行信息
  console.log(`Server is running at http://localhost:${PORT}`);
});
