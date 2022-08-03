export default class CartsRepository {
    constructor(cartsModel) {
        this.cartsModel = cartsModel
    }
    async getAll() {
        return await this.cartsModel.getAll()
    }
    async getById(id) {
        return await this.cartsModel.getById(id)
    }
}
export { CartsRepository }
