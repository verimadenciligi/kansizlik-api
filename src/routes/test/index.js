const TestService = require("../../services/test/index");
const TestModel = require("../../models/Test");

const Joi = require("joi");

const tree = {
  id: 1,
  name: "hgb",
  condition: (val) => val <= 10.95,
  yes: () => true,
  no() {
    return {
      id: 2,
      name: "hct",
      condition: (val) => val <= 33.95,
      yes() {
        return {
          id: 3,
          name: "mchc",
          condition: (val) => val < 32.95,
          yes: () => true,
          no: () => false,
        };
      },
      no() {
        return {
          id: "",
          name: "hgb",
          condition: (val) => val <= 11.35,
          yes() {
            return {
              id: "",
              name: "mch",
              condition: (val) => val <= 29.95,
              yes() {
                return {
                  id: "",
                  name: "mchc",
                  condition: (val) => val <= 31.35,
                  no() {
                    return false;
                  },
                  yes() {
                    return {
                      id: "",
                      name: "mchc",
                      condition: (val) => val <= 31.1,
                      no: () => true,
                      yes: () => false,
                    };
                  },
                };
              },
              no() {
                return {
                  id: "",
                  name: "rbc",
                  condition: (val) => val <= 3.65,
                  no: () => true,
                  yes: () => false,
                };
              },
            };
          },
          no() {
            return {
              id: "",
              name: "rbc",
              condition: (val) => val <= 4.435,
              yes() {
                return {
                  id: "",
                  name: "rbc",
                  condition: (val) => val <= 4.425,
                  yes: () => false,
                  no() {
                    return {
                      id: "",
                      name: "mchc",
                      condition: (val) => val <= 32.65,
                      yes() {
                        return {
                          id: "",
                          name: "hgb",
                          condition: (val) => val <= 12.45,
                          yes: () => false,
                          no: () => true,
                        };
                      },
                      no: () => false,
                    };
                  },
                };
              },
              no: () => false,
            };
          },
        };
      },
    };
  },
};

const addTest = async (req, res) => {
  const schema = Joi.object({
    rbc: Joi.number(), //.required(),
    hgb: Joi.number(), //.required(),
    hct: Joi.number(), //.required(),
    mcv: Joi.number(), //.required(),
    mch: Joi.number(), //.required(),
    mchc: Joi.number(), //.required(),
    name: Joi.string().required(),
  }).options({
    abortEarly: false,
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  let node = tree;

  do {
    if (!req.body[node.name]) {
      return res.status(400).json({
        message: `Test sonucu için ${node.name} hormon değerine ihtiyaç vardır!`,
        data: node.name,
      });
    }

    node = node.condition(req.body[node.name]) ? node.yes() : node.no();
  } while (typeof node === "object");

  let test = await TestService.create("", req.body, node);
  res.json(test);
};

const getTests = async (req, res) => {
  res.json(await TestModel.find({}));
};
const getTest = async (req, res) => {
  res.json(
    await TestModel.findOne({
      _id: req.params._id,
    })
  );
};
module.exports = {
  prefix: "/tests",
  inject(route) {
    route.get("/", getTests);
    route.post("/", addTest);
    route.post("/:id", getTest);
  },
};
