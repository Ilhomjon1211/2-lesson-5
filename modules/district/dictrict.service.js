const { ResData } = require("../../lib/resData");
const { Repository } = require("../../lib/repository")
const path = require("node:path")

class DistrictService{
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
        const districts = await this.#repository.read();

        const foundDistrict = districts.find(el => el.id === id)
        const resData = new ResData(200, "success", foundDistrict)
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
const districtUrl = path.join(__dirname, "../../database/districts.json")
const repository = new Repository(districtUrl)
const districtService = new DistrictService(repository)

module.exports = { districtService }