const { expect } = require('@jest/globals');
const {operation, multiplication, division, substraction, modulo} = require('./simple');

test('rly difficult test', () => {
    expect(true).toBe(true);
});

test('INSANE TEST', () => {
    expect(true).toBe(true);
});

test('somme 1 et 2 ce qui donne 3', () => {
  expect(operation(1, 2)).toBe(3);
});

test('soustrait 1 de 2 ce qui donne 1', () => {
  expect(substraction(2, 1)).toBe(1);
});

test('multiple 1 par 2 ce qui donne 2', () => {
  expect(multiplication(1, 2)).toBe(2);
});

test('divise 1 par 2 ce qui donne 0.5', () => {
  expect(division(1, 2)).toBe(0.5);
});
test('calcule le reste de la division euclidienne entière de 1 par 2 ce qui donne 1', () => {
  expect(modulo(1, 2)).toBe(1);
});