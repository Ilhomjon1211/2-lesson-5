const { Repository } = require("../../lib/repository")
const path = require("node:path");
const { ResData } = require("../../lib/resData");

class StateService{
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
        const states = await this.#repository.read();

        const foundState = states.find(el => el.id === id)
        const resData = new ResData(200, "success", foundState)
        return resData
    }

    async create(body){
        const data = await this.#repository.read()

        data.push(body)

        await this.#repository.write(data)

        const resData = new ResData(201, "created", body)

        return resData
    }

    async update(stateId, data) {
        return await State.findByIdAndUpdate(stateId, data, { new: true });
    }

    async delete(id) {
        const data = await this.#repository.read()
        
        const foundState = data.forEach(el => el.id === id)

        const resData = new ResData(400, "success", foundState)
        return resData;
    }
}
const stateDbUrl = path.join(__dirname, "../../database/states.json")
const repository = new Repository(stateDbUrl)
const stateService = new StateService(repository)

module.exports = { stateService }