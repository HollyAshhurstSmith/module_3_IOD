
// Question 1. What are the results of these expressions? (answer first, then use console.log() to check)

"" + 1 + 0  // my answer 10, string - ACTUAL answer 10
console.log("" + 1 + 0)

"" - 1 + 0 // my answer -1, implicit - ACTUAL answer -1
console.log("" - 1 + 0)

true + false // my answer false - ACTUAL answer 1
console.log(true + false)

!true // my answer false  - ACTUAL answer false
console.log(!true)

6 / "3" // my answer 2 - ACTUAL answer 2
console.log(6 / "3")

"2" * "3" // my answer 6 - ACTUAL answer 6
console.log("2" * "3")

4 + 5 + "px" // my answer 9px - ACTUAL answer 9px
console.log(4 + 5 + "px")

"$" + 4 + 5 // my answer $45 - ACTUAL answer $45
console.log("$" + 4 + 5)

"4" - 2 // my answer 2 - ACTUAL answer 2
console.log("4" - 2)

"4px" - 2 // my answer -2? - ACTUAL answer NaN
console.log("4px" - 2)

" -9 " + 5 // my answer -9 5 - ACTUAL answer -9 5
console.log(" -9 " + 5)

" -9 " - 5 // my answer -14 - ACTUAL answer -14
console.log(" -9 " - 5)

null + 1 // my answer 1 - ACTUAL answer 1
console.log(null + 1)

undefined + 1 // my answer NaN - ACTUAL answer NaN
console.log(undefined + 1)

undefined == null // my answer true  - ACTUAL answer true
console.log(undefined == null)

undefined === null // my answer false - ACTUAL answer false
console.log(undefined === null)

" \t \n" - 2 // my answer -2 - ACTUAL answer -2
console.log(" \t \n" - 2)

//revised and confirmed any answers I needed to change after checking the answers.




/* Question 2. Which of the below are not giving the right answer? Why are they not correct? How can we
fix them? */

let three = "3"
let four = "4"
let thirty = "30"
//what is the value of the following expressions?
let addition = three + four // = 34, (strings with addition)
let addition2 = parseInt(three, 10) + parseInt(four, 10) // = 7, (convert to integers)
let multiplication = three * four // = 12
let division = three / four // = 0.75
let subtraction = three - four // = -1
let lessThan1 = three < four // = true
let lessThan2 = thirty < four // = true (treats them as strings)
let lessThan3 = parseInt(thirty, 10) < parseInt(four, 10) // = false (convert to integers)

//number

// Question 3. Which of the following console.log messages will print? Why?

    if (0) console.log('#1 zero is true') // no print
    if ("0") console.log('#2 zero is true') // will print (truthy applies)
    if (null) console.log('null is true') // no print
    if (-1) console.log('negative is true') // will print (not a 0 value)
    if (1) console.log('positive is true') // will print (not a 0 value)



/* Question 4. Rewrite this if using the ternary/conditional operator '?'. Test it with different values for a
and b. What does the ‘+=’ do? */

let a = 2, b = 3;
let result = `${a} + ${b} is `;
if (a + b < 10) {
result += 'less than 10';
} else {
result += 'greater than 10';
}

let c = 2, d = 3;
let result2 = `${c} + ${d} is `;
(c + d < 10) ? result2 += 'less than 10' : result2 += 'greater than 10';
// with = to 10 - (c + d == 10) ? result2 += 'equal to 10' : (c + d < 10) ? result2 += 'less than 10' :  result2 += 'greater than 10';


/* Question 5. Rewrite the following function using: a) function expression syntax, and b) arrow function
syntax. Test each version to make sure they work the same. */

function getGreeting(name) {
    return 'Hello ' + name + '!';
    }

// a 
const getGreetingA = function(name) {
    return 'Hello ' + name + '!'
};

// b
const getGreetingB = name => 'Hello ' + name + '!'; 



/* Question 6. 
a) Complete the inigo object by adding a lastName property and including it in the
greeting.
b) Complete getCatchPhrase so that if the person argument has 6 fingers, it instead
prints his famous catch phrase to the console. HINT: see
https://www.imdb.com/title/tt0093779/characters/nm0001597.
c) Update getCatchPhrase to use arrow function syntax and a conditional operator. */

const westley = {
    name: 'Westley',
    numFingers: 5
}
const rugen = {
    name: 'Count Rugen',
    numFingers: 6
}
const inigo = {
    firstName: 'Inigo',
    lastName: 'Montoya',
    greeting(person) {
        let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}.`;
        console.log(greeting + this.getCatchPhrase(person));
    },
    getCatchPhrase(person) {
        if (person.numFingers == 6) {
            return 'You killed my father. Prepare to die.'
        }
        return 'Nice to meet you.';
    }
}
inigo.greeting(westley)
inigo.greeting(rugen)

// Arrow func syntax & conditional operator
// const getCatchPhrase = person => (person.numFingers == 6) ? "You killed my father. Prepare to die." : "Nice to meet you"



/* Question 7. The following object represents a basketball game and keeps track of the score as the
game progresses.
a) Modify each of the methods so that they can be ‘chained’ together and the last line of
the example code works
b) Add a new method to print the full time final score
c) Add a new object property to keep track of the number of fouls and a method to
increment it, similar but separate to the score. Include the foul count in the half time and
full time console messages
d) Test your object by chaining all the method calls together in different combinations. */

const basketballGame = {
    score: 0,
    freeThrow() {
    this.score++;
    return this;
    },
    basket() {
    this.score += 2;
    return this
    },
    threePointer() {
    this.score += 3;
    return this;
    },
    halfTime() {
    console.log('Halftime score is '+this.score + this.foulcount());
    return this
    },
    fullTime() {
    console.log('Fulltime score is '+this.score + this.foulcount()); 
    },
    fouls: 0,
    foulcount() {
    console.log('foul count is '+this.fouls);
    return this;
    }, 
    foulAdd() {
    this.foul++;
    return this;
    }
}

    //modify each of the above object methods to enable function chaining as below:
    basketballGame.basket().freeThrow().freeThrow().basket().threePointer()
    .halfTime().foulAdd().threePointer().freeThrow().fullTime();



/* Question 8. The object below represents a single city.
a) Write a function that takes an object as an argument and uses a for...in loop to access
and print to the console each of those object properties and their values. Test it using
the sydney object below.
b) Create a new object for a different city with different properties and call your function
again with the new object.*/    

const sydney = {
    name: 'Sydney',
    population: 5_121_000,
    state: 'NSW',
    founded: '26 January 1788',
    timezone: 'Australia/Sydney'
 }

function printloop(cities) {
    for (const property in cities) {
    console.log(`${property}: ${cities[property]}`);
    }
}
printloop(sydney)

const melbourne = {
    name: 'Melbourne',
    population: 6_959_000,
    state: 'VIC',
    founded: 'July 1, 1851',
    timezone: 'Australia/Melbourne'
}

printloop(melbourne)

/* Question 9. Use the following variables to understand how JavaScript stores objects by reference.
a) Create a new moreSports variable equal to teamSports and add some new sport
values to it (using push and unshift)
b) Create a new dog2 variable equal to dog1 and give it a new value
c) Create a new cat2 variable equal to cat1 and change its name property
d) Print the original teamSports, dog1 and cat1 variables to the console. Have they
changed? Why?
e) Change the way the moreSports and cat2 variables are created to ensure the
originals remain independent. */

let teamSports = ['Hockey', 'Cricket', 'Volleyball'];
let moreSports = [];
teamSports.forEach(function (item, index) {
    moreSports[index] = item;
}) 
moreSports.push('Basketball')
moreSports.unshift('Swimming')
let dog1 = 'Bingo';
let dog2 = dog1;
dog2 = 'Bluey';
let cat1 = { name: 'Fluffy', breed: 'Siberian' };
let cat2 = {}
for (let key in cat1) { 
    cat2[key] = cat1[key]; 
}
cat2.name = 'Fuzzy';

/* Question 10. The following constructor function creates a new Person object with the given name and
age values.
a) Create a new person using the constructor function and store it in a variable
b) Create a second person using different name and age values and store it in a separate
variable
c) Print out the properties of each person object to the console
d) Rewrite the constructor function as a class called PersonClass and use it to create a
third person using different name and age values. Print it to the console as well.
e) Add a canDrive method to both the constructor function and the class that returns true
if the person is old enough to drive. */

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.human = true;

    Person.prototype.canDrive = function() {
        return age > 17 
      }
    }

let person1 = Person('Holly', 29) 
console.log(person1)
let person2 = Person('Carl', 31)    
console.log(person2) 

class PersonClass {
    constructor(name, age) {
    this.name = name;
    this.age = age;
    this.human = true
    return this
    }
    canDrive() {
        return age > 17 
      }
    }
let person3 = new PersonClass('Victor', 30)

console.log(person3)
console.log(person3.canDrive())
  
  


    





       





