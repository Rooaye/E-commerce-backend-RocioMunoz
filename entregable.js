class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }

        const existingProduct = this.products.find(prod => prod.code === code);

        if (existingProduct) {
            throw new Error(`Error: El código del producto con ID (${existingProduct.id}) ya existe.`);
        }

        const id = this.generateUniqueId();
        const newProduct = {
            id: id.toString().padStart(3, '0'), 
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);

        console.log(`Producto ${newProduct.id} added.`);

        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);

        if (!product) {
            throw new Error("Producto no encontrado");
        }

        return product;
    }

    generateUniqueId() {
        const existingIds = this.products.map(prod => parseInt(prod.id, 10));
        let newId = 1;

        while (existingIds.includes(newId)) {
            newId++;
        }

        return newId;
    }
}

const productManager = new ProductManager();

console.log("getProducts", productManager.getProducts());

try {
    const newProduct1 = productManager.addProduct("producto uno", "Este es un producto modelo", 500, "sin imagen", "abc123", 20);
    const newProduct2 = productManager.addProduct("producto dos", "Otro producto", 300, "imagen", "def456", 30);
    console.log("getProducts", productManager.getProducts());
    
    try {
        productManager.addProduct("producto tres", null, 500, "sin imagen", "ghi789", 40);
    } catch (error) {
        console.error(error.message);
    }

    try {
        productManager.addProduct("producto cuatro", "Otro producto", 300, "imagen", "abc123", 50);
    } catch (error) {
        console.error(error.message);
    }

    const newProduct3 = productManager.addProduct("producto cinco", "Otro producto", 300, "imagen", "jkl012", 60);
    console.log("getProducts", productManager.getProducts());

} catch (error) {
    console.error(error.message);
}