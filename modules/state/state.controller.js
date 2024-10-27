const { CustomError } = require("../../lib/customError");
const { generationId } = require("../../lib/generationId");
const { stateService } = require("./state.service")

class StateController{
    #stateService;
    constructor(stateService){
        this.#stateService = stateService;
    }

    async AddState(req, res, next){
        try {
            const { name } = req.body;
            if (!name) {
                throw new CustomError(400, "name must be required!")
            }
            
            const newId = generationId()

            const foundName = await this.#stateService.getByName(name)
            if (foundName.data) {
                throw new CustomError(400, "name already exists")
            }

            await this.#stateService.create({
                id: newId,
                name,
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    async update(req, res, next) {
        try {
            const userId = req.params.id; 
            const {  name } = req.body; 

            if (!name) {
                throw new CustomError(400, "login, fullName, districtId, and address must be provided");
            }

            const existingUser = await this.#stateService.getOneById(userId);
            if (!existingUser) {
                throw new CustomError(404, "User not found");
            }

            let updatedData = { name };
           
            const updatedState = await this.#stateService.update(userId, updatedData);

            if (!updatedState) {
                throw new CustomError(500, "Failed to update user");
            }

            res.status(200).json({
                message: "User updated successfully",
                data: updatedState
            });
        } catch (error) {
            console.log(error);
            
        }
    }

    
    async delete(req, res, next) {
        try {
            const deletedState = await this.#stateService.delete(req.params.id);
            if (!deletedState) {
                throw new CustomError(404, "User not found");
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.log(error);
            
        }
    }
}

const stateConttroller = new StateController(stateService)
module.exports = { stateConttroller }