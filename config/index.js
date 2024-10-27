require("dotenv").config()

const config ={
    port: +process.env.PORT,
    jwtKey: process.env.JWT_KEY,
    serverUrl: process.env.SERVER_URL
}
module.exports = { config }