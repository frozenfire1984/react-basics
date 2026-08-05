const products = [
    { id: 1, title: 'apple', price: 10 },
    { id: 2, title: 'lemon', price: 20 },
    { id: 3, title: 'pine', price: 30 },
]

export function findProduct(arr, id) {
    if (arr === undefined) {
        throw new TypeError('no arguments')
    }

    if (!Array.isArray(arr)) {
        throw new TypeError('is not array')
    }

    if (id === undefined) {
        return undefined
    }

    return arr.find((item) => item.id === id)
}

const productsUpd = findProduct(products, 2)

console.log(productsUpd)
console.log(products)



