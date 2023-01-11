const express = require("express")
const router= express.Router()
const userController= require("../controllers/userController")
const Middleware= require("../middleware/middleware")

router.post("/user",userController.createUser)
router.post("/login",userController.login)
router.get("/getData",userController.getData)
router.put("/update",userController.updateData)
router.delete("/delete",userController.deleteData)

module.exports= router