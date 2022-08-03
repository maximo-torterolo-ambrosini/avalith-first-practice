export default class ProductsRepository {
    constructor(productsModel) {
        this.productsModel = productsModel
    }
    async getAll() {
        return await this.productsModel.getAll()
    }
    async getById(id) {
        return await this.productsModel.getById(id)
    }
    async getCategories() {
        return await this.productsModel.getCategories()
    }
    async getByCategory(category) {
        return await this.productsModel.getByCategory(category)
    }
    async getInCategories() {
        return await this.productsModel.getInCategories()
    }
}
export { ProductsRepository }
