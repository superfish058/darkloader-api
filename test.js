// 获取网站图标
const getFavicon = async (url) => {
  // 获取主页URL以提取主机名
  const hostname = new URL(url).hostname;
  console.log(hostname);
  // favicon.ico通常位于网站根目录下
  const faviconUrl = `http://${hostname}/favicon.ico`;
  console.log(faviconUrl);
  return faviconUrl;
};

getFavicon("http:baidu.com");
