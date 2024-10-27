const { Router } = require("express")
const { stateController } = require("./state.controller");
const { checkToken } = require("../../../middlewares/checkToken");

const router = Router();

router.get("/", checkToken, stateController.render.bind(stateController))

module.exports = { router }