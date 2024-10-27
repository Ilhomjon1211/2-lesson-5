const { Router } = require("express")
const homeRoutes = require("./home/home.routes")
const loginRoutes = require("./login/login.routes")
const registerRoutes = require("./register/register.routes")
const regionRoutes = require("./region/region.routes")
const stateRoutes = require("./state/state.routes")
const districtRoutes = require("./district/district.routes")

const router = Router()

router.use("/", homeRoutes.router)
router.use("/login", loginRoutes.router)
router.use("/register", registerRoutes.router)
router.use("/region", regionRoutes.router)
router.use("/state", stateRoutes.router)
router.use("/district", districtRoutes.router)

module.exports = { router }