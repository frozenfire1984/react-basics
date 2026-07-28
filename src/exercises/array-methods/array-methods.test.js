import { describe, expect, test } from 'vitest'
import {priceIncrease} from './array-methods.js'

function createProducts() {
    return [
        { id: 1, title: 'apple', price: 10 },
        { id: 2, title: 'lemon', price: 20 },
        { id: 3, title: 'pine', price: 30 }
    ]
}

describe('MAP METHODS. priceIncrease()', () => {
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

    test('Increases the first product when id is omitted', () => {
        const _products = [
            { id: 10, title: 'apple', price: 10 },
            { id: 11, title: 'lemon', price: 20 },
            { id: 12, title: 'pine', price: 30 },
        ]

        const updatedProducts = priceIncrease(_products, 10)
        const updatedProduct = updatedProducts[0]
        expect(updatedProduct.price).toBe(100)
        expect(updatedProduct.id).toBe(10)
    })

    test('Increases the product when id is 0', () => {
        const _products = [
            { id: 1, title: 'lemon', price: 20 },
            { id: 2, title: 'pine', price: 30 },
            { id: 0, title: 'apple', price: 10 },
        ]

        const updatedProducts = priceIncrease(_products, 10, 0)
        const updatedProduct = updatedProducts.find((item) => {
            return item.id === 0
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

    test('Returns an empty array when input is empty and id is omitted', () => {
        expect(priceIncrease([], 10)).toEqual([])
    })

    test('returns an empty array when called with empty input', () => {
        expect(priceIncrease([])).toEqual([])
    })

    test.each([
        { caseName: 'numeric string', factor: '10', id: 1 },
        { caseName: 'NaN', factor: NaN, id: 1 },
    ])('Throws when factor is $caseName', ({ factor, id }) => {

        const callPriceIncrease = () => {
            priceIncrease(createProducts(), factor, id)
        }

        expect(callPriceIncrease).toThrow(TypeError)
        expect(callPriceIncrease).toThrow('factor must be a finite number')
    })
})




