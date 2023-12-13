const TestModel = require("../../models/Test");

const create = async (name, hormones, result) => {
  return await TestModel.create({
    name,
    ...hormones,
    result,
  });
};

const findOne = async (where) => {
  return await TestModel.findOne(where);
};

module.exports = {
  create,
  findOne,
};
