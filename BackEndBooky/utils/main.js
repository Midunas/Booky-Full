const converter = require('number-to-words')

const getFirstLetter = (word) => {
  return word[0]
}

const countSymbols = (word) => {
  return word.length
}

const createArrayFromString = (str) => {
  return str.split("")
}

const createRandomSymbolStringByNumber = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const reverseStringAndUppercase = (word) => {
  const result = word.split('').reverse().join('').toUpperCase()
  return result
}
const alwaysReturn100 = (number) => {
  const howMuchToAdd = 100 - number
  const result = number + howMuchToAdd
  return result
}
const convertNumbersToNumberNames = (arr) => {
  let result = []

  arr.map((num) => {
    result.push(converter.toWords(num))
  })
  return result
}

const validateEmail = (str) => {
  const checkEmail = str.includes('@', '.')
  return checkEmail
}
const returnOnlyUppercase = (str) => {
  return str.replace(/[^A-Z]+/g, "")
}

const returnOnlyNumbersFromString = (str) => {

  const digits = str.replace(/\D/g, "").split('')
  const result = digits.map(Number)
  return result

}
module.exports = {
  getFirstLetter,
  countSymbols,
  createArrayFromString,
  createRandomSymbolStringByNumber,
  reverseStringAndUppercase,
  alwaysReturn100,
  validateEmail,
  returnOnlyUppercase,
  returnOnlyNumbersFromString,
  convertNumbersToNumberNames
}

// takes array of numbers, converts to array of number names [1, 2] => ["one", "two"]
// return all numbers from string in array "adf29d3" => [2,9,3]