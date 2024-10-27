const { Router } = require("express")
const { districtController } = require("./district.controller")

const router = Router()

router.post("/push",  districtController.AddDistrict.bind(districtController))

module.exports = { router }