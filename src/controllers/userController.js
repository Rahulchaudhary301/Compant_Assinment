const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")

const createUser = async function (req, res) {
  try {
    const data = req.body;
    console.log(data)
    const { name, subject, marks } = data;
    const check = await userModel
      .findOne({ name: name, subject: subject })
      .lean();

    if (check !== null) {
      let userId = check["_id"];
      let oldMarks = check.marks;
      let newMarks = oldMarks + marks;
      let data = await userModel.findOneAndUpdate(
        { _id: userId },
        { $set: { marks: newMarks } },{new:true}
      );
       return res.status(201).send({ status: true, message: data });
    }

    const createUser = await userModel.create(data);
    return res.status(201).send({ status: true, data: createUser });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const login = async function (req, res) {
  try {
    let data = req.body
    const {name,subject}= data
    let check = await userModel.findOne({ name:name,subject:subject});
    if (check == null) {
      return res
        .status(404)
        .send({ status: false, message: "user is not registered" });
    }
    let token = jwt.sign(
      { userId: check["_id"].toString(), creator: "ali abbas" },
      "Ali-Abbas",
      { expiresIn: "12h" }
    );
    return res.status(201).send({ status: true, data: token });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const getData = async function (req, res) {
  try {
    let filter = req.query;

    let data = await userModel.find(filter);
    if(data.length==0){
        return res.status(404).send({status:false,message:"query is not correct"})
    }
    res.status(200).send({ status: true, data: data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const updateData = async function (req, res) {
  try {
    let data = req.body;
    const { userId, ...data2 } = data;
    
    let data1 = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: data2 },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "updated successfully", data: data1 });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteData = async function (req, res) {
  try {
    let data1 = req.query.userId;
    let data = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isDeleteted: true, deletedAt: Date.now() } }
    );
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  createUser,
  login,
  getData,
  updateData,
  deleteData,
};


