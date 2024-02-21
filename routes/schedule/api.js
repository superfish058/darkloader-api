import express from "express";
import bodyParser from "body-parser";
import { getList, addItem, updateItem, deleteItem } from "../../utils.js";
import { add, findAll, find, update, cancel} from "./db.js";

const app = express();

// 中间件配置
app.use(bodyParser.json()); // 用于解析请求体中的JSON数据


// 获取列表
app.get("/schedule/list", (req, res) => {
  getList(req, res, find, findAll,['date']);
});

// 添加文档
app.post("/schedule/add", async (req, res) => {
  addItem(req, res, add);
});

// 更新文档
app.post("/schedule/update", async (req, res) => {
  updateItem(req, res, update);
});

// 删除文档
app.post("/schedule/delete", async (req, res) => {
  deleteItem(req, res, cancel);
});

export default app;
