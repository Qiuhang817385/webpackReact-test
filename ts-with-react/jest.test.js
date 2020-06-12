test('test common matcher', () => {
  expect(2 + 2).toBe(4),
    expect(2 + 2).not.toEqual(3)
})
// npx jest jest.test.js
// npx jest jest.test.js --watch

test('should be boolean', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('should number', () => {
  expect(4).toBeGreaterThan(1)
  expect(2).toBeLessThan(3)

})

test('should object', () => {
  expect({ name: 'viking' }).toEqual({ name: 'viking' })
})

