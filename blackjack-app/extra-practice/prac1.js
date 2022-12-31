let largeCountries = ["Tuvalu","India","USA","Indonesia","Monaco"]

// You need to help me fixup the largeCountries array so that 
// China and Pakistan are added back into their respective places

// Use push() & pop() and their counterparts unshift() & shift()
// Google how to use unshift() and shift()

largeCountries.pop()
largeCountries.push("Pakistan")

largeCountries.shift() // removes the element at index 0
largeCountries.unshift("China") // adds an element to index 0 of the array, others are pushed to one index higher

console.log(largeCountries)