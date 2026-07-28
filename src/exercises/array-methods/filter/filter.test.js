import { describe, expect, test } from 'vitest'
import { removeProducts } from './filter.js'

function createProducts() {
    return [
        { id: 1, title: 'apple', price: 10 },
        { id: 2, title: 'lemon', price: 20 },
        { id: 3, title: 'pine', price: 30 }
    ]
}

describe('FILTER METHODS. removeProducts()', () => {
    describe('Basic behavior', () => {
        test('- remove element with id 2', () => {
            const _etalon = [
                { id: 1, title: 'apple', price: 10 },
                { id: 3, title: 'pine', price: 30 },
            ]

            expect(removeProducts(createProducts(), 2)).toEqual(_etalon)
        })

        test('- remove element with id 1 from array with 1 element', () => {
            const _products = [{ id: 1, title: 'apple', price: 10 }]
            expect(removeProducts(_products, 1)).toEqual([])
        })

        test('- remove element with not exists id', () => {
            const _etalon = createProducts()
            expect(removeProducts(createProducts(), 100)).toEqual(_etalon)
        })
    })

    describe('Omitted arguments', () => {
        test('- id is omitted', () => {
            const _etalon = createProducts()
            expect(removeProducts(createProducts())).toEqual(_etalon)
        })
    })

    describe('Edge cases', () => {
        test('- remove element with id 0', () => {
            const _products = [
                { id: 0, title: 'apple', price: 10 },
                { id: 1, title: 'lemon', price: 20 },
                { id: 2, title: 'pine', price: 30 }
            ]

            const _result = [
                { id: 1, title: 'lemon', price: 20 },
                { id: 2, title: 'pine', price: 30 }
            ]
            expect(removeProducts(_products, 0)).toEqual(_result)
        })

        test('- empty array and id argument', () => {
            expect(removeProducts([], 10)).toEqual([])
        })

        test('- empty array and omitted id argument', () => {
            expect(removeProducts([])).toEqual([])
        })

        test('- omitted all arguments', () => {
            expect(() => removeProducts()).toThrow(TypeError)
            expect(() => removeProducts()).toThrow('no arguments')
        })
    })

    describe('Arr argument validation', () => {
        test.each([
            { caseName: 'string', arr: 'string', id: 1 },
            { caseName: 'object', arr: {}, id: 1 },
            { caseName: 'number', arr: 10, id: 1 },
        ])('- throws when arr argument is $caseName', ({ arr, id }) => {

            const callRemoveProducts = () => {
                removeProducts(arr, id)
            }

            expect(callRemoveProducts).toThrow(TypeError)
            expect(callRemoveProducts).toThrow('is not array')
        })
    })

    describe('Immutability', () => {
        test('- source array not mutate if id not exist', () => {
            const _products = createProducts()
            const _productsBeforeCall = structuredClone(_products)
            const _result = removeProducts(_products, 100)
            expect(_result).not.toBe(_products)
            expect(_products).toEqual(_productsBeforeCall)
        })

        test('- source array not mutate if id omitted', () => {
            const _products = createProducts()
            const _productsBeforeCall = structuredClone(_products)
            const _result = removeProducts(_products)
            expect(_result).not.toBe(_products)
            expect(_products).toEqual(_productsBeforeCall)
        })
    })
})




