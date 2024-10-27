const { regionService } = require("../../region/region.service")
class RegionController{
    #regionService;
    constructor(regionService){
        this.#regionService = regionService;
    }

    async render(req, res, next){
       try {
        const regions = await this.#regionService.getAll();

        res.render("region.ejs", regions)
       } catch (error) {
        next(error)
       }
    }
}
const regionController = new RegionController( regionService )
module.exports = { regionController }