const { expect } = require('@jest/globals');
const {octogone, inverse_octogone} = require('./tools');

test('octogone', () => {
    expect(octogone('abc', 'def')).toBe('abc');
});
