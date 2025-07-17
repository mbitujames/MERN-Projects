const { add } = require('../../src/utils/math');

describe('add utility', () => {
    it('adds two numbers', () => {
        expect(add(2, 3)).toBe(5);
    });
});

// server/tests/unit/math.test.js
const { add } = require('../../src/utils/math');
test('adds two numbers', () => { expect(add(2, 3)).toBe(5); });