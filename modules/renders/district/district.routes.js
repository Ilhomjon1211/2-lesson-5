const { Router } = require("express")
const { districtController } = require("./district.controller");
const { checkToken } = require("../../../middlewares/checkToken");

const router = Router();

router.get("/", checkToken, districtController.render.bind(districtController))

module.exports = { router }