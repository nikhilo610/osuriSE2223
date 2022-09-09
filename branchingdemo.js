// file name: branchingDemo.js
// author: Nikhil Osuri
// objective: demonstrate how to use github branches

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const d = new Date();

// getMonth() returns the month as an integer
// getDay() returns the day as an integer
// getFullYear returns the year as a four digit number

let month = months[d.getMonth()];
let day = d.getDate();
let year = d.getFullYear();

let currentDate = "The current date is: " + month + " " + day + ", " + year;

console.log(d)
console.log(currentDate)