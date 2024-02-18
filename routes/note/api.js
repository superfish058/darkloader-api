import express from "express";
import bodyParser from "body-parser";
import { getList, addItem, updateItem, deleteItem } from "../../utils.js";
import { add, findAll, find, update, cancel, addNote, findAllNote, findNote, updateNote, cancelNote } from "./db.js";

const app = express();

// 中间件配置
app.use(bodyParser.json()); // 用于解析请求体中的JSON数据


// 获取列表
app.get("/note/list", (req, res) => {
  getList(req, res, findNote, findAllNote);
});

// 添加文档
app.post("/note/add", async (req, res) => {
  addItem(req, res, addNote);
});

// 更新文档
app.post("/note/update", async (req, res) => {
  updateItem(req, res, updateNote);
});

// 删除文档
app.post("/note/delete", async (req, res) => {
  deleteItem(req, res, cancelNote);
});



// 获取列表
app.get("/noteSlider/list", (req, res) => {
  getList(req, res,find, findAll);
});

// 添加文档
app.post("/noteSlider/add", async (req, res) => {
  addItem(req, res, add);
});

// 更新文档
app.post("/noteSlider/update", async (req, res) => {
  updateItem(req, res, update);
});

// 删除文档
app.post("/noteSlider/delete", async (req, res) => {
  deleteItem(req, res, cancel);
});

export default app;
