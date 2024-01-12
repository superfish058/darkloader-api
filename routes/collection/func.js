import axios from "axios";
import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { v4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// 获取网站图标
const getFavicon = async (url) => {
  // 获取主页URL以提取主机名
  const hostname = new URL(url).hostname;

  // favicon.ico通常位于网站根目录下
  const faviconUrl = `http://${hostname}/favicon.ico`;
  return faviconUrl;
};

// 获取uuid
function getUUid() {
  return v4();
}
// 获取网站图标写入本地
const getWebIco = async (url) => {
  let imgId = getUUid();
  const iconData = await getFavicon(url);
  const savePath = path.join(__dirname, "../../static", "img", imgId + ".png");
  if (iconData) {
    // 这里可以将iconData保存为文件或其他操作
    fs.writeFileSync(savePath, iconData);
    return imgId;
  }
  return ''
};

let a = getFavicon('http:baidu.com')
console.log(a)

export  { getFavicon };
