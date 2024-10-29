const { Router } = require("express")
const { regionConttroller } = require("./region.controller")

const router = Router()

router.post("/create", regionConttroller.AddRegion.bind(regionConttroller))

module.exports = { router }