const { Repository } = require("../../lib/repository")
const path = require("node:path");
const { ResData } = require("../../lib/resData");

class RegionService{
    #repository;
    constructor(repository){
        this.#repository = repository;
    }

    async getAll(){
        const data = await this.#repository.read();

        const resData = new ResData(200, "success", data)
        return resData;
    }

    async getByName(name){
        const data = await this.#repository.read()

        const foundByName = data.find(el => el.name === name)
        const resData = new ResData(200, "success", foundByName)
        return resData;
    }

    async getOneById(id){
        const regions = await this.#repository.read();

        const foundRegion = regions.find(el => el.id === id)
        const resData = new ResData(200, "success", foundRegion)
        return resData
    }

    async create(body){
        const data = await this.#repository.read()

        data.push(body)

        await this.#repository.write(data)

        const resData = new ResData(201, "created", body)

        return resData
    }
}
const regionDbUrl = path.join(__dirname, "../../database/regions.json")
const repository = new Repository(regionDbUrl)
const regionService = new RegionService(repository)

module.exports = { regionService }