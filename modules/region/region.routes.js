const { Router } = require("express")
const { regionConttroller } = require("./region.controller")

const router = Router()

router.post("/push", regionConttroller.AddRegion.bind(regionConttroller))

module.exports = { router }