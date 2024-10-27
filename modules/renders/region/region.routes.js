const { Router } = require("express")
const { regionController } = require("./region.controller");
const { checkToken } = require("../../../middlewares/checkToken");

const router = Router();

router.get("/", checkToken, regionController.render.bind(regionController))

module.exports = { router }