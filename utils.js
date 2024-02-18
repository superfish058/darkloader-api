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

const getList = async (req, res, find, findAll) => {
  try {
    const { query } = req;
    let data = "";
    if (Object.values(query).length && Object.values(query)[0]) {
      data = await find(query);
    } else {
      data = await findAll();
    }
    res.status(200).json(setRes(data, undefined, 200));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const addItem = async (req, res, add) => {
  try {
    const newModel = await add(req.body); // 保存到数据库
    res.status(200).json(setRes(newModel, undefined, 200));
  } catch (error) {
    res.status(400).json({ message: "添加数据失败.", error });
  }
};

const updateItem = async (req, res, update) => {
  try {
    const updatedModel = await update(req.body.id, req.body);
    if (!updatedModel) return res.status(404).json({ message: "数据未找到" });
    res.status(200).json(setRes(updatedModel, undefined, 200));
  } catch (error) {
    res.status(500).json({ message: "更新数据失败" });
  }
};

const deleteItem = async (req, res, cancel) => {
  try {
    const deleteModel = await cancel(req.body.id);
    if (!deleteModel) return res.status(404).json({ message: "数据未找到" });
    res.status(200).json(setRes(deleteModel, undefined, 200));
  } catch (error) {
    res.status(500).json({ message: "删除数据失败" });
  }
};

export { getList, addItem, updateItem, deleteItem };