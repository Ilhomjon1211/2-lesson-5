const { CustomError } = require("../../lib/customError");
const { authService } = require("./auth.service");
const { userService } = require("../user/userService");
const { districtService } = require("../district/dictrict.service")
const { generationId } = require("../../lib/generationId")
const path = require("node:path");

class AuthController {
  #authService;
  #userService;
  #districtService;
  constructor(authService, userService, districtService) {
    this.#authService = authService;
    this.#userService = userService;
    this.#districtService = districtService;
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        throw new CustomError(400, "login and password must be required");
      }

      const foundByLogin = await this.#userService.getByLogin(login);

      if (foundByLogin.status === 404) {
        throw new CustomError(400, "password or login is incorrect");
      }

      const userData = await this.#authService.login(
        foundByLogin.data,
        password
      );

      res.cookie("token", userData.data.token);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const { login, password, fullName, districtId, address } = req.body;
      
      
      
      if (!login || !password || !fullName || !districtId || !address) {
        throw new CustomError(
          400,
          "login, password, fullName, role and image must be required"
        );
      }

      const newId = generationId();
      const foundByLogin = await this.#userService.getByLogin(login);

      if (foundByLogin.data) {
        throw new CustomError(400, "login already exists");
      }

      const foundDistrict = await this.#districtService.getOneById(districtId)

      if (!foundDistrict.data) {
        throw new CustomError(404, "district doesn't exist")
      }

      const hashedPassword = await this.#authService.register(password); 
      
        const dto = {id: newId, login, password: hashedPassword.data, fullName, districtId, address};

        await this.#userService.create(dto);
        res.redirect("/login");
    } catch (error) {
      next(error)
      
    }
  }
}

const authController = new AuthController(authService, userService, districtService);

module.exports = { authController };
