// const {
//   getFirstLetter,
//   countSymbols,
//   createArrayFromString,
//   createRandomSymbolStringByNumber,
//   reverseStringAndUppercase,
//   alwaysReturn100,
//   validateEmail,
//   returnOnlyUppercase,
//   returnOnlyNumbersFromString,
//   convertNumbersToNumberNames
// } = require("../utils/main")

// test("returns first letter of the text string", () => {
//   const result = getFirstLetter("Mykolas")
//   expect(result).toBe("M")
//   // expect(result).not.toBe("m")

// })

// test("returns the total amount of symbols, type number", () => {
//   const result = countSymbols('12345')

//   expect(result).toBe(5)
//   expect(typeof result).toBe("number")
// })

// test("creates array from string", () => {
//   const result = createArrayFromString("labas")

//   expect(result).toEqual(["l", "a", "b", "a", "s"])
// })

// test("creates random symbol string with length equal to given param", () => {
//   const string = createRandomSymbolStringByNumber(5)
//   const result = string.length
//   expect(result).toBe(5)
// })

// test("reverses string and makes letters uppercase", () => {
//   const result = reverseStringAndUppercase('Mykolas')
//   expect(result).toBe('SALOKYM')
// })

// test("always returns the number 100", () => {
//   const result = alwaysReturn100(50)
//   expect(result).toBe(100)
// })

// test("returns numbers names of given numbers", () => {
//   const result = convertNumbersToNumberNames([1, 2])
//   expect(result).toStrictEqual(['one', 'two'])
// })

// test("checks if email includes @ and .", () => {
//   const result = validateEmail('midunas@gmail.com')
//   expect(result).toBe(true)
// })

// test("returns only the uppercase letters of string", () => {
//   const result = returnOnlyUppercase('BkashuElasdSnfT')
//   expect(result).toBe('BEST')
// })

// test("returns only the numbers from string", () => {
//   const result = returnOnlyNumbersFromString('adf29d3')
//   expect(result).toStrictEqual([2, 9, 3])
// })