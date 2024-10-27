const { Router } = require("express")
const authRoutes = require("./auth/auth.routes")
const stateRoutes = require("./state/state.routes")
const regionRoutes = require("../modules/region/region.routes")
const districtRoutes = require("./district/district.routes")

const router = Router()

router.use("/auth", authRoutes.router)
router.use("/state", stateRoutes.router)
router.use("/region", regionRoutes.router)
router.use("/district", districtRoutes.router)

module.exports = { router }