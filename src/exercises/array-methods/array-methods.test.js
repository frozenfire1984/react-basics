import { describe, expect, test } from 'vitest'
import {priceIncrease} from './array-methods.js'

function createProducts() {
    return [
        { id: 1, title: 'apple', price: 10 },
        { id: 2, title: 'lemon', price: 20 },
        { id: 3, title: 'pine', price: 30 }
    ]
}

describe('Map methods', () => {
    test('Price of id:1 element is increased at 10 time', () => {

        const _etalon = [
            { id: 1, title: 'apple', price: 100 }, /* changed! */
            { id: 2, title: 'lemon', price: 20 },
            { id: 3, title: 'pine', price: 30 },
        ]

        expect(priceIncrease(createProducts(), 10, 1)).toEqual(_etalon)
    })

    test('Price of id:2 element is increased at 100 time', () => {
        const _etalon = [
            { id: 1, title: 'apple', price: 10 },
            { id: 2, title: 'lemon', price: 2000 }, /* changed! */
            { id: 3, title: 'pine', price: 30 },
        ]

        expect(priceIncrease(createProducts(), 100, 2)).toEqual(_etalon)
    })

    test('Price of id:1 element is increased at 10 time, single element in etalon', () => {
        const updatedProducts = priceIncrease(createProducts(), 10, 1)
        const updatedProduct = updatedProducts.find((item) => {
            return item.id === 1
        })

        expect(updatedProduct.price).toBe(100)
    })

    test('Call without 3rd param, default is id: 1, increase at 10 time, single element in etalon', () => {
        const updatedProducts = priceIncrease(createProducts(), 10)
        const updatedProduct = updatedProducts.find((item) => {
            return item.id === 1
        })

        expect(updatedProduct.price).toBe(100)
    })

    test('Call without all params', () => {
        expect(priceIncrease(createProducts())).toEqual(createProducts())
    })

    test('Does not mutate products passed to the function', () => {
        const products = createProducts()
        const productsDeepCopy = structuredClone(products)
        priceIncrease(products, 10, 1)
        expect(products).toEqual(productsDeepCopy)
    })
})




