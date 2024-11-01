const { Router } = require("express")
const { stateConttroller } = require("./state.controller")
const { checkToken } = require("../../middlewares/checkToken")

const router = Router()

router.post("/create", checkToken,  stateConttroller.AddState.bind(stateConttroller))

module.exports = { router }