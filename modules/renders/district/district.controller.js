const { districtService } = require("../../district/dictrict.service")
class DistrictController{
    #districtService;
    constructor(districtService){
        this.#districtService = districtService;
    }

    async render(req, res, next){
       try {
        const districts = await this.#districtService.getAll();

        res.render("district.ejs", districts)
       } catch (error) {
        next(error)
       }
    }
}
const districtController = new DistrictController( districtService )
module.exports = { districtController }