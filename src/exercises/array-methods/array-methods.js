/*const products = [
    { id: 1, title: 'apple', price: 10 },
    { id: 2, title: 'lemon', price: 20 },
    { id: 3, title: 'pine', price: 30 },
]

const newProducts = products.map((item) => {
    if (item.id === 2) {
        return {
            ...item,
            price: item.price * 2
        }
    }
    
    return item
})


const todos = [
    { id: 1, title: 'Learn map', done: true },
    { id: 2, title: 'Learn reduce', done: false },
    { id: 3, title: 'Return to React', done: false },
    { id: 4, title: 'Write tests', done: true },
]


const todoStats = todos.reduce((acc, todo) => {
    if (todo.done) {
        acc.done += 1
    } else {
        acc.active += 1
    }

    return acc
}, {
    done: 0,
    active: 0
})


console.log(todoStats)*/


const products = [
    { id: 1, title: 'apple', price: 10 },
    { id: 2, title: 'lemon', price: 20 }    ,
    { id: 3, title: 'pine', price: 30 },
]


export function __priceIncrease(arr, factor = 1, id = 1) {
    return arr.map((item) => {

        if (item.id === id) {
            item.price = item.price * factor
        }
        return item
    })
}

export function _priceIncrease(arr, factor = 1, id = 1) {
    const _arrDeepCopy = structuredClone(arr)
    return _arrDeepCopy.map((item) => {

        if (item.id === id) {
            item.price = item.price * factor
        }
        return item
    })
}

export function priceIncrease(arr, factor = 1, id = 1) {
    return arr.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                price: item.price * factor
            }
        }
        return item
    })
}

const productsUpd = priceIncrease(products, 1000, 2)

//console.log(productsUpd)
//console.log(products)

console.log(productsUpd[0] === products[0])
console.log(productsUpd[1] === products[1])
console.log(productsUpd[2] === products[2])

