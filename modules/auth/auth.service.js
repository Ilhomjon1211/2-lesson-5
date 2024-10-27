const { bcrypt } = require("../../lib/bcrypt");
const { myJwt } = require("../../lib/jwt")
const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");

class AuthService{
    #jwt;
    #bcrypt;
    constructor(jwt, bcrypt){
        this.#jwt = jwt
        this.#bcrypt = bcrypt
    }

    async login(userData, password){
        const isCorrect = await this.#bcrypt.compare(password, userData.password)

        if (!isCorrect) {
            throw new CustomError(400, "password or login is incorrect")
        }

        const token = await this.#jwt.generate(userData.id);

        const resData = new ResData(200, "success", {token, user: userData})
        return resData;
    }
    async register(password){
        const hashedPassword = await this.#bcrypt.hash(password)

        const resData = new ResData(200, "success", hashedPassword)
        return resData;
    }
}
const authService = new AuthService(myJwt, bcrypt)
module.exports = { authService }