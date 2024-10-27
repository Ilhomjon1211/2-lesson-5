const { stateService } = require("../../state/state.service")
class StateController{
    #stateService;
    constructor(stateService){
        this.#stateService = stateService;
    }

    async render(req, res, next){
       try {
        const regions = await this.#stateService.getAll();

        res.render("state.ejs", regions)
       } catch (error) {
        next(error)
       }
    }
}
const stateController = new StateController( stateService )
module.exports = { stateController }