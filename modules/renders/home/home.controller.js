const { userService } = require("../../user/userService")
class HomeController{
    #userService;
    constructor(userService){
        this.#userService = userService;
    }

    async render(req, res, next){
       try {
        const users = await this.#userService.getAll();

        res.render("index.ejs", users)
       } catch (error) {
        next(error)
       }
    }
}
const homeController = new HomeController( userService )
module.exports = { homeController }