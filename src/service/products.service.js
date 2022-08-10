class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository
    }
    async getAll() {
        try {
            const products = await this.productsRepository.getAll()
            return products
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            const product = await this.productsRepository.getById(id)
            return product
        } catch (error) {
            return error
        }
    }
    async getCategories() {
        try {
            const categories = await this.productsRepository.getCategories()
            return categories
        } catch (error) {
            return error
        }
    }
    async getByCategory(category) {
        try {
            const products = await this.productsRepository.getByCategory(category)
            return products
        } catch (error) {
            return error
        }
    }
    async getInCategories() {
        try {
            const products = await this.productsRepository.getInCategories()
            return products
        } catch (error) {
            return error
        }
    }
    async getProductsByPrices() {
        try {
            let products = await this.productsRepository.getAll()
            products = products
                .map((product) => {
                    return { id: product.id, title: product.title, price: product.price }
                })
                .sort((a, b) => a.price - b.price)
            return products
        } catch (error) {
            return error
        }
    }
    async getMostExpensiveByCategory() {
        try {
            const products = await this.productsRepository.getInCategories()
            const mostExpensive = products.map((category) => {
                const product = category.products.reduce((prev, curr) => {
                    return prev.price > curr.price ? prev : curr
                })
                return {
                    category: category.category,
                    product
                }
            })
            return mostExpensive
        } catch (error) {
            return error
        }
    }
}

export default ProductsService
export { ProductsService }
