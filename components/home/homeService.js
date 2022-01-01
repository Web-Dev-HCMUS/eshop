const productModel = require("../../models/Product");

exports.list = async () => {
  const sort = {
    updatedAt: -1,
  };
  const result = await productModel.find({ sort: sort }).limit(10);
  return result;
};
