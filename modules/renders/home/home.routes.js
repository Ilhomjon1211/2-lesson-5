const { Router } = require("express")
const { homeController } = require("./home.controller");
const { checkToken } = require("../../../middlewares/checkToken");

const router = Router();

router.get("/", checkToken, homeController.render.bind(homeController))

module.exports = { router }