import { describe, expect, test } from 'vitest'
import { findProduct } from './find.js'
import { createProducts } from '../fixtures.js'

describe('FIND METHODS. findProduct()', () => {
    describe('Basic behavior', () => {
        test('- find product with given id', () => {
            const _result = findProduct(createProducts(), 2)
            const _etalon = { id: 2, title: 'lemon', price: 20 }
            expect(_result).toEqual(_etalon)
        })

        test('- not find product with given no exists id', () => {
            const _result = findProduct(createProducts(), 100)
            expect(_result).toBeUndefined()
        })
    })

    describe('Omitted arguments', () => {
        test('- id is omitted', () => {
            const _result = findProduct(createProducts())
            expect(_result).toBeUndefined()
        })
    })

    describe('Edge cases', () => {
        test('- find element with id 0', () => {
            const _products = [
                { id: 0, title: 'apple', price: 10 },
                { id: 1, title: 'lemon', price: 20 },
                { id: 2, title: 'pine', price: 30 }
            ]

            const _result = { id: 0, title: 'apple', price: 10 }
            expect(findProduct(_products, 0)).toEqual(_result)
        })

        test('- empty array and id argument', () => {
            expect(findProduct([], 10)).toBeUndefined()
        })

        test('- empty array and omitted id argument', () => {
            expect(findProduct([])).toBeUndefined()
        })

        test('- omitted all arguments', () => {
            expect(() => findProduct()).toThrow(TypeError)
            expect(() => findProduct()).toThrow('no arguments')
        })
    })

    describe('Arr argument validation', () => {
        test.each([
            { caseName: 'string', arr: 'string', id: 1 },
            { caseName: 'object', arr: {}, id: 1 },
            { caseName: 'number', arr: 10, id: 1 },
        ])('- throws when arr argument is $caseName', ({ arr, id }) => {

            const callFindProduct = () => {
                findProduct(arr, id)
            }

            expect(callFindProduct).toThrow(TypeError)
            expect(callFindProduct).toThrow('is not array')
        })
    })
})




