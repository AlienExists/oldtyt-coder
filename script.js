// Сборник треша и мусора и еще и еще

// function sumTo(n) {
//     let result = 0
//     for (let i = n; i > 0; i--) {
//         result += i
//     }
//     return result
// }
 
// function recursiveSumTo(n) {
//     if (n == 1) return n
//     else {
//         return n + recursiveSumTo(n - 1)
//     }
// }

// console.log(sumTo(5))

// console.log(recursiveSumTo(5))

// function factorial(n) {
//     if (n == 1) return n
//     else return n * factorial(n-1)
// }

// console.log(factorial(5))

// let list = {
//     value: 1,
//     next: {
//         value: 2,
//         next: {
//             value: 3,
//             next: {
//                 value: 4,
//                 next: null
//             }
//         }
//     }
// }

// function printReverseList(list) {
//     if (list.next) {
//         printReverseList(list.next)
//     }
//     console.log(list.value)
// }

// function cyclePrintReverseList(list) {
//     let arr = []
//     let tmp = list
    
//     while(tmp) {
//         arr.push(tmp.value)
//         tmp = tmp.next
//     }

//     for(let i = arr.length - 1; i >= 0; i--) {
//         console.log(arr[i])
//     }
    
// }

// // printReverseList(list)

// cyclePrintReverseList(list)

// function sum(a) {
//     return function(b) {
//         return a + b
//     }
// }

// console.log(sum(1)(5))

// // ФУНКЦИИ ДЛЯ filter
// function inBetween(a, b) {
//     return function(val1) {
//         return val1 > a && val1 <= b ? true : false 
//     }
// }

// function inArray(arr) {
//     return function(val) {
//         return arr.includes(val) ? true : false
//     }
// }


//  // ФУНКЦИЯ ДЛЯ sort
// function byField(fieldName) {
//     return function(a, b) {
//         return a[fieldName] > b[fieldName] ? 1 : -1
//     }
// }

// let users = [
//     { name: "John", age: 20, surname: "Johnson" },
//     { name: "Pete", age: 18, surname: "Peterson" },
//     { name: "Ann", age: 19, surname: "Hathaway" }
// ];

// console.log(users.sort(byField('age')))

// arr = [15, 48, 5, 11, 30, 9]

// console.log(arr.filter(inBetween(1, 20)))
// console.log(arr.filter(inArray([15,8,5])))


// NFE объект функции

function makeCounter() {
    function counter() {
        return counter.count++
    }

    counter.count = 0
    counter.set = function(value) {
        return counter.count = value
    }
    counter.decrease = function() {
        return counter.count--
    }
    return counter
}

let counter = makeCounter()
console.log(counter(), counter(), counter.set(15), counter.decrease(), counter.decrease())
