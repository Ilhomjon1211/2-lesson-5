const { config } = require("../config/index")
const jwt = require("jsonwebtoken")

const checkToken = (req, res, next)=>{
    
    const token = req.cookies["token"]
    if (!token) {
        return res.render("login.ejs")
    }
    try {
        const secretKey = config.jwtKey;
        const verified = jwt.verify(token, secretKey)
        req.user = verified;
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = { checkToken }