const { CustomError } = require("../../lib/customError");
const { generationId } = require("../../lib/generationId");
const { districtService } = require("./dictrict.service")
const { regionService } = require("../region/region.service")

class DistrictController{
    #districtService;
    #regionService;
    constructor(districtService, regionService){
        this.#districtService = districtService;
        this.#regionService = regionService;
    }

    async AddDistrict(req, res, next){
        try {
            let { name, regionId } = req.body;
            if (!name || !regionId) {
                throw new CustomError(400, "name and regionId must be required!")
            }
            
            const newId = generationId()

            regionId = Number(regionId)

            const foundName = await this.#districtService.getByName(name)
            if (foundName.data) {
                throw new CustomError(400, "name already exists")
            }

            const foundRegion = await this.#regionService.getOneById(regionId)

            if (!foundRegion.data) {
                throw new CustomError(400, "region not found")
            }

            await this.#districtService.create({
                id: newId,
                name,
                regionId
            })
            res.redirect("/district")
        } catch (error) {
            next(error)
            
        }
    }

    async update(req, res, next){

    }
}

const districtController = new DistrictController(districtService, regionService)
module.exports = { districtController }