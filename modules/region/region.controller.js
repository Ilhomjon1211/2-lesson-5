const { CustomError } = require("../../lib/customError");
const { generationId } = require("../../lib/generationId");
const { regionService } = require("./region.service")
const { stateService } = require("../state/state.service")

class RegionController{
    #regionService;
    #stateService;
    constructor(regionService, stateService){
        this.#regionService = regionService;
        this.#stateService = stateService;
    }

    async AddRegion(req, res, next){
        try {
            let { name, stateId } = req.body;
            if (!name || !stateId) {
                throw new CustomError(400, "name must be required!")
            }
            stateId = Number(stateId)
            
            const newId = generationId()

            const foundName = await this.#regionService.getByName(name)
            if (foundName.data) {
                throw new CustomError(400, "name already exists")
            }
            const foundById = await this.#stateService.getOneById(stateId)
            if (!foundById.data) {
                throw new CustomError(400, "state not found!")
            }

            await this.#regionService.create({
                id: newId,
                name,
                stateId,
            })
        } catch (error) {
            console.log(error);
            
        }
    }
}

const regionConttroller = new RegionController(regionService, stateService)
module.exports = { regionConttroller }