const products = [
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


console.log(todoStats)
