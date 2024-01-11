import express from "express";
import bodyParser from "body-parser";
import { add, findAll, find, update, cancel } from "./db.js";

const app = express();

// 中间件配置
app.use(bodyParser.json()); // 用于解析请求体中的JSON数据

// 格式化返回
const setRes = (data, msg = "操作成功", code = 200) => {
  let preQuery = {
    code: code,
    data: "",
    msg: msg,
  };
  preQuery.data = data;
  return preQuery;
};

// 获取列表
app.get("/collection/list", async (req, res) => {
  try {
    const { query } = req;
    let data = "";
    if (Object.keys(query).length) {
      data = await find(query);
    } else {
      data = await findAll();
    }
    res.status(200).json(setRes(data,undefined,200));
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// 添加文档
app.post("/collection/add", async (req, res) => {
  try {
    const newModel = await add(req.body); // 保存到数据库
    res.status(201).json(setRes(newModel, undefined, 200));
  } catch (error) {
    res.status(400).json({ message: "添加数据失败.", error });
  }
});

// 更新文档
app.post("/collection/update", async (req, res) => {
  try {
    const updatedModel = await update(req.body.id, req.body);
    if (!updatedModel) return res.status(404).json({ message: "数据未找到" });
    res.status(200).json(setRes(updatedModel, undefined, 200));
  } catch (error) {
    res.status(500).json({ message: "更新数据失败" });
  }
});

// 删除文档
app.post("/collection/delete", async (req, res) => {
  try {
    const { query } = req;
    const deleteModel = await cancel(query.id);
    if (!deleteModel) return res.status(404).json({ message: "数据未找到" });
    res.status(200).json(setRes(deleteModel, undefined, 200));
  } catch (error) {
    res.status(500).json({ message: "删除数据失败" });
  }
});

export default app
