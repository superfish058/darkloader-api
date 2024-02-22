import express from "express";
import { UserDb } from "./db.js";
import collection from './routes/collection/api.js'
import note from "./routes/note/api.js";
import schedule from "./routes/schedule/api.js";

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
app.use("/", schedule);



// 启动 Express 应用程序，监听在指定的端口上
app.listen(PORT, () => {
  // 在控制台输出服务器运行信息
  console.log(`Server is running at http://localhost:${PORT}`);
});
