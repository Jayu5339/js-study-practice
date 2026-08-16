const numbers = [1, 2, 3, 4];
for (let i = 0; i < numbers.length; i++) {

}

console.log()
for (const idx in numbers) { // index
  // if (idx === 2) {
  //   break;
  // }
  console.log(numbers[idx])
}

console.log()
for (const x of numbers) {
  // if (x === 2)
  //   break
  console.log(x)
}

console.log()
numbers.forEach(x => {
  if (x === 2)
    return
  console.log(x)
})

numbers.forEach((v, i) => console.log(v, i))

numbers.forEach((value, index, array) => {
  console.log(value, index, array)
})

// console.log(document)
// alert(123)

let number = 10

console.log(number++)
console.log(number++)
console.log(number++)