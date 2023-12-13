const mongoose = require("mongoose");

const Test = new mongoose.Schema({
  name: String,
  rbc: { type: Number, default: null },
  hgb: { type: Number, default: null },
  hct: { type: Number, default: null },
  mcv: { type: Number, default: null },
  mch: { type: Number, default: null },
  mchc: { type: Number, default: null },
  result: Boolean,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TestModel = mongoose.model("Tests", Test);

module.exports = TestModel;
