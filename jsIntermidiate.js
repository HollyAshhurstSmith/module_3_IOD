/* Question 1. Create a function that takes a string as a parameter and returns 
the string with the firstcharacter of each word changed into a capital letter, 
as in the example below. Test it with different strings. */

import { sep } from "path";

console.log(ucFirstLetters("los angeles") ) //Los Angeles


function capFirstLetterOfEachWord(inputString) {
    return inputString
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first character of each word
        .join(' '); // Join the words back into a single string
}

const inputString = "hello world";
const result = capFirstLetterOfEachWord(inputString);
console.log(result);  // Output: "Hello World"


/* Question 2. Create a function truncate(str, max) that truncates a given string of 
text if its total length is greater than the max length. It should return either the 
truncated text, with an ellipsis (...) added to the end if it was too long, or the 
original text otherwise.
b) Write another variant of the truncate function that uses a conditional operator. */

console.log(truncate('This text will be truncated if it is too long', 25))
// This text will be truncat...

function truncate(str, max) {
    if (str.length > max) {
        return str.slice(0, max) + '...';
    } else {
        return str;
    }
}

const originalString = "This is a long sentence that might need truncating.";
const truncatedString = truncate(originalString, 20);
console.log(truncatedString);  // Output: "This is a long sen..."


/* Question 3. Use the following animals array for the below tasks. Test each one 
by printing the result to the console. Review the following link for tips:

https://developer.mozilla.org/en-
US/docs/Web/JavaScript/Reference/Global_Objects/Array 

a) Add 2 new values to the end
b) Add 2 new values to the beginning
c) Sort the values alphabetically
d) Write a function replaceMiddleAnimal(newValue) that replaces the value in the
middle of the animals array with newValue
e) Write a function findMatchingAnimals(beginsWith) that returns a new array
containing all the animals that begin with the beginsWith string. Try to make it work
regardless of upper/lower case.*/

const animals = ['Tiger', 'Giraffe']
animals.push('Rhino', 'Turtle');
animals.unshift('Wolf', 'Fox')
animals.push('Deer')
animals.sort()
//'Deer', 'Fox', 'Giraffe', 'Turtle','Rhino', 'Tiger', 'Wolf

function replaceMiddleAnimal(newValue) {
    const middleIndex= Math.round(animals.length/2)-1;
    animals[middleIndex] = newValue;
}
replaceMiddleAnimal("Lion")

function findMatchingAnimals(beginsWith) {
    let matchingArray = [];
for (let animal of animals) {
    let firstLetter = animal.charAt(0);
    if (firstLetter.toLowerCase() == beginsWith.toLowerCase()) {
            matchingArray.push(animal);
    }
}
return matchingArray
}

console.log(animals)



/* Question 4. 
a)Write a function camelCase(cssProp) that changes dash-separated 
CSS properties like 'margin-left' into camel-cased 'marginLeft'.
The function should remove all dashes, and uppercase the first letter 
of each word after a dash.
b) Create variants of the camelCase function that use different types 
of for loops, and
c) with and without the conditional operator. */

// [ 'margin', 'left' ]
// [ 'background', 'image' ]
// [ 'display' ]

function camelCase(cssProp) {
    let camelCase = ""
  const separate = cssProp.split('-')
  separate.forEach(function(value,index) {
      if (index != 0) {
          camelCase += value.charAt(0).toUpperCase() + value.slice(1);
      } else {
        camelCase += value;
    }
    })
  return camelCase
  } 
  
  console.log(camelCase('margin-left')) // marginLeft
  console.log(camelCase('background-image')) // backgroundImage
  console.log(camelCase('display')) // display 

  function camelCase(cssProp) {
    return cssProp
        .split('-') // Split the string at each dash
        .map((word, index) => {
            // Capitalize the first letter of each word except the first word
            return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(''); // Join all the parts back together without spaces
}

function camelCaseForOf(cssProp) {
    let result = '';
    let isFirstWord = true;
    
    for (let char of cssProp) {
        if (char === '-') {
            isFirstWord = false;
        } else {
            result += isFirstWord ? char.toLowerCase() : char.toUpperCase();
            isFirstWord = true;
        }
    }
    
    return result;
}



/* Question 5. Decimal number operations in JavaScript can lead to unexpected results, 
as in the following: */

let fixedTwenty = twentyCents.toFixed(2);
let fixedTen = tenCents.toFixed(2);
console.log(fixedTwenty + fixedTen) //why is this not working?

/* a) Explain why the above code returns the wrong answer
The above code uses variables without values (tenCents & twentyCents).
Also it's adding 2 strings. Needs to not be a string. 

b) Create a function currencyAddition(float1, float2) which safely adds the two
decimal numbers float1 and float2 and returns the correct float result.

c) Create a function currencyOperation(float1, float2, operation) which
safely performs the given operation (either +, -, / or *) on the two numbers and returns
the correct float result. https://developer.mozilla.org/en-
US/docs/Web/JavaScript/Reference/Statements/switch may be useful.

d) (Extension) Extend the above function to include a fourth argument numDecimals
which allows the operation to support different amounts of decimal places from 1 to 10.
HINT: Assume 2 decimal places for b) and c) and use a multiplication factor. Test with
different values as well as the below: */

function currencyAddition(float1, float2) {
    totalFloat = float1 + float2
    return parseFloat(totalFloat.toFixed(1))
    }
  
  function currencyOperation(float1, float2, operation, numDecimals) {
    switch(operation) {
      case "+":
        additionFloat = float1 + float2;
        return parseFloat(additionFloat.toFixed(numDecimals));
  
      case "-":
        subtractFloat = float1 - float2;
        return parseFloat(subtractFloat.toFixed(numDecimals));
        
      case "/":
        divisionFloat = float1/float2;
        return parseFloat(divisionFloat.toFixed(numDecimals));
        
      case "*":
        multiplyFloat = float1*float2;
        return parseFloat(multiplyFloat.toFixed(numDecimals));
    }
     
  }
       
  console.log(0.3 == currencyAddition(0.1, 0.2)) // true
  console.log(0.3 == currencyOperation(0.1, 0.2, '+')) // true


/* Question 6. Create a function unique(duplicatesArray) which takes an array parameter 
that may include duplicates. Your function should return an array containing only the 
unique values from duplicatesArray.
Test with the following arrays and create another one of your own. */

const colours = ['red', 'green', 'blue', 'yellow', 'orange', 'red', 'blue', 'yellow']
const testScores = [55, 84, 97, 63, 55, 32, 84, 91, 55, 43]
const animals = ['monkey', 'rhino', 'camel', 'parrot', 'rhino', 'lion', 'lion']

function unique(duplicatesArray) {
    return [...new Set(duplicatesArray)]
}

console.log(unique(colours)) // [ 'red', 'green', 'blue', 'yellow', 'orange' ]
console.log(unique(testScores)) // [ 55, 84, 97, 63, 32, 91, 43 ]
console.log(unique(animals)) 



/* Question 7. Use the following array of book objects to practice the array functions 
for map, find and filter. Test each of your answers to the below tasks. */

/* 
a) Write a function getBookTitle(bookId) that uses the find function to return the
title of the book object with the matching id.
b) Write a function getOldBooks() that uses the filter function to return all book
objects written before 1950.
c) Write a function addGenre() that uses the map function to add a new genre property
to all of the above books, with the value ‘classic’.
d) (Extension) Write a function getTitles(authorInitial) that uses map and
filter together to return an array of book titles for books written by authors whose
names start with authorInitial.
e) (Extension) Write a function latestBook() that uses find and forEach to get the
book with the most recent publication date. */

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 4, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951 },
    ];

function getBookTitle(bookId) {
    const book = books.find(book => book.id === bookId); 
    return book ? book.title : 'Book not found'; 
}

function getOldBooks() {
    return books.filter(book => book.year < 1950);
}

function addGenre(books) {
    return books.map(book => {
    return { ...book, genre: 'classic' };
    });
}

const updatedBooks = addGenre(books);

function getTitles(authorInitial) {
    return books
        .filter(book => book.author[0].toUpperCase() === authorInitial.toUpperCase())  
        .map(book => book.title);  
}

const titles = getTitles('F');  // Example: Get titles for authors starting with 'F'

function latestBook() {
    let latestYear = -Infinity;  // Start with a very low number
    let latestBookObj = null;  // Variable to store the book with the latest year

   
    books.forEach(book => {
        if (book.year > latestYear) {
            latestYear = book.year;
            latestBookObj = book;
        }
    });

    return latestBookObj;
}

const book = latestBook();


console.log(book);
console.log(getBookTitle(1)); 
console.log(getBookTitle(3)); 
console.log(getOldBooks());
console.log(updatedBooks);
console.log(titles);

/* Question 8. The following code creates a new Map object for storing names beginning with 
A, B, or C with their phone numbers. */

const phoneBookABC = new Map() //an empty map to begin with
phoneBookABC.set('Annabelle', '0412312343')
phoneBookABC.set('Barry', '0433221117')
phoneBookABC.set('Caroline', '0455221182')

/* 
a) Create a new phoneBookDEF Map to store names beginning with D, E or F
b) Initialise the contents of phoneBookDEF by passing in an array of keys/values
c) Update the phone number for Caroline
d) Write a function printPhoneBook(contacts) that prints the names and phone
numbers in the given Map
e) Combine the contents of the two individual Maps into a single phoneBook Map
f) Print out the full list of names in the combined phone book */

// const phoneBookDEF = new Map();

phoneBookABC.forEach((number, name) => {
    if (['D', 'E', 'F'].includes(name[0].toUpperCase())) {
        phoneBookDEF.set(name, number);
    }
});

const phoneBookDEF = new Map([
    ['David', '0466777888'],
    ['Emily', '0477888999'],
]);

console.log(phoneBookDEF); 

phoneBookABC.set('Caroline', '0455333322'); 
console.log(phoneBookABC.get('Caroline')); 

function printPhoneBook(contacts) {
    contacts.forEach((number, name) => {
        console.log(`Name: ${name}, Phone: ${number}`);
    });
}

printPhoneBook(phoneBookABC);  

const phoneBook = new Map([...phoneBookABC, ...phoneBookDEF]);

console.log(phoneBook); 


console.log('Full list of names in the combined phone book:');
for (let name of phoneBook.keys()) {
    console.log(name);
}



// Question 9. Given the below salaries object, perform the following tasks.

let salaries = {
    "Timothy" : 35000,
    "David" : 25000,
    "Mary" : 55000,
    "Christina" : 75000,
    "James" : 43000
    };

/* 
a) Write a function sumSalaries(salaries) that calculates and returns the total 
of all salaries.
b) Write a function topEarner(salaries) that calculates and returns the name of the person
earning the highest salary */

function sumSalaries(salaries) {
    let total = 0
    for (let key in salaries) {
        total += salaries[key]
    }
    return total;
}
function topEarner(salaries) {
    let topEarner = ''
    let highestSalary = 0
    for (let key in salaries) {
        if (salaries[key] > highestSalary) {
            topEarner = key
            highestSalary = salaries[key]
        }
    }
    return topEarner;
}


/* Question 10.The following code uses the Date object to print the current time and 
the number of hoursthat have passed today so far. Extend the code to do the following: */

/*
a) Print the total number of minutes that have passed so far today
b) Print the total number of seconds that have passed so far today
c) Calculate and print your age as: 'I am x years, y months and z days old'
d) Write a function daysInBetween(date1, date2) which calculates and returns the amount
of days in between the two given dates. */

const today = new Date();
const birthday = new Date("1995-10-03");

function calculateAge(birthday) {
    const ageInMilliseconds = today - birthday;
    const ageDate = new Date(ageInMilliseconds);

    const years = ageDate.getUTCFullYear() - 1970; 
    const months = ageDate.getUTCMonth(); 
    const days = ageDate.getUTCDate() - 1; 

    console.log(`I am ${years} years, ${months} months, and ${days} days old.`);
}

function daysInBetween(date1, date2) {
    const timeDifference = Math.abs(date2 - date1); 
    const daysDifference = timeDifference / (1000 * 3600 * 24); 
    return Math.floor(daysDifference); 
}

const date1 = new Date("2025-03-01");
const date2 = new Date("2025-03-10");

console.log(`The number of days between the two dates is: ${daysInBetween(date1, date2)} days.`);

calculateAge(birthday);
console.log('Current time is ' + today.toLocaleTimeString())
console.log(today.getHours() + ' hours have passed so far today')
console.log((today.getMinutes()+today.getHours()*60) + ' minutes have passed so far today')
console.log((today.getSeconds()+today.getMinutes()*60 + today.getHours()*3600) + ' seconds have passed so far today')






