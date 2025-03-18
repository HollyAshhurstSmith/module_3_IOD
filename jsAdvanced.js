/* Question 1. makeCounter below is a decorator function which creates and returns 
a function that increments a counter.
a) Create a second counter counter2 using the makeCounter function and test to see if
it remains independent to counter1
b) Modify makeCounter so that it takes an argument startFrom specifying where the
counter starts from (instead of always starting from 0)
c) Modify makeCounter to take another argument incrementBy, which specifies how
much each call to counter() should increase the counter value by. */

function makeCounter(startFrom, incrementBy) {
    let currentCount = startFrom;
    return function() {
        currentCount += incrementBy;
        console.log(currentCount)
        return currentCount;
    };
  }
    let counter1 = makeCounter(5, 6);
    counter1(); // 1
    counter1(); // 2
  
    let counter2 = makeCounter(4, 8);
    counter1();
    counter2();
    counter1();
    counter2();



/* Question 2. The following delayMsg function is intended to be used to delay 
printing a message until some time has passed.
a) What order will the four tests below print in? Why?
// 4,3,2,1. Because no delay comes first, followed by the least amount of time in delay.

b) Rewrite delayMsg as an arrow function
c) Add a fifth test which uses a large delay time (greater than 10 seconds)
d) Use clearTimeout to prevent the fifth test from printing at all. */

function delayMsg(msg)
const delayMsg = (msg) => setTimeout(() => console.log(msg),100);

{
console.log(`This message will be printed after a delay: ${msg}`)
}
setTimeout(delayMsg, 100, '#1: Delayed by 100ms');
setTimeout(delayMsg, 20, '#2: Delayed by 20ms');
setTimeout(delayMsg, 0, '#3: Delayed by 0ms');
delayMsg('#4: Not delayed at all')
let timeOut = setTimeout(delayMsg,11000, '#5: Delayed by 11,000ms')
clearTimeout(timeOut)

/* Question 3. 'Debouncing' is a concept that refers to 'putting off' the execution
of multiple, fast-timed, similar requests until there's a brief pause, then only 
executing the most recent of those requests. 
See https://www.techtarget.com/whatis/definition/debouncing
It's often used to handle fast-firing scrolling events in a browser, or to prevent 
multiple server requests being initiated if a user clicks repeatedly on a button.
Using the following code to test and start with:

a) Create a debounce(func) decorator, which is a wrapper that takes a function func and
suspends calls to func until there's 1000 milliseconds of inactivity. After this 1 second
pause, the most recent call to func should be executed and any others ignored.
b) Extend the debounce decorator function to take a second argument ms, which defines the
length of the period of inactivity instead of hardcoding to 1000ms
c) Extend debounce to allow the original debounced function printMe to take an argument
msg which is included in the console.log statement. */

function printMe(msg) {
    console.log('printing debounced message: ' + msg);
}

function debounce(func, ms) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);  
        }, ms);
    };
}

const debouncedPrintMe = debounce(printMe, 1000);

setTimeout(() => debouncedPrintMe("Message 1"), 100); // First call with "Message 1"
setTimeout(() => debouncedPrintMe("Message 2"), 200); // Second call with "Message 2"
setTimeout(() => debouncedPrintMe("Message 3"), 300); // Third call with "Message 3"




/* Question 4. The Fibonacci sequence of numbers is a famous pattern where the next number 
in the sequence is the sum of the previous 2.
e.g. 1, 1, 2, 3, 5, 8, 13, 21, 34, etc.
a) Write a function printFibonacci() using setInterval that outputs a number in
the Fibonacci sequence every second.
b) Write a new version printFibonacciTimeouts() that uses nested setTimeout
calls to do the same thing
c) Extend one of the above functions to accept a limit argument, which tells it how many
numbers to print before stopping. */

function printFibonacci(limit) {
    let a = 1;
    let b = 1;
    let count = 0;

    const interval = setInterval(() => {
        if (count === limit) {
            clearInterval(interval); 
            return;
        }
        
        console.log(a); 
        let next = a + b;
        a = b;
        b = next;
        count++;
    }, 1000); 
}

function printFibonacciTimeouts(limit) {
    let a = 1;
    let b = 1;
    let count = 0;

    function printNextFibonacci() {
        if (count === limit) {
            return; 
        }
        
        console.log(a); // Output the current Fibonacci number
        let next = a + b;
        a = b;
        b = next;
        count++;
        setTimeout(printNextFibonacci, 1000);
    }

    setTimeout(printNextFibonacci, 1000);
}

printFibonacciTimeouts(10);



/* Question 5. The following car object has several properties and a method which 
uses them to print a description. When calling the function normally this works as 
expected, but using it from within setTimeout fails. Why? */
// 'this' loses its value when used in a callback, so doesnt link to the object.  

let car = {
    make: "Porsche",
    model: '911',
    year: 1964,

    description() {
        console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
    }
};
car.description(); //works
// setTimeout(car.description, 200); fails
//setTimeout(() => car.description(), 200);

/*
a) Fix the setTimeout call by wrapping the call to car.description() inside a
function
b) Change the year for the car by creating a clone of the original and overriding it
c) Does the delayed description() call use the original values or the new values from b)? Why?
d) Use bind to fix the description method so that it can be called from within
setTimeout without a wrapper function
e) Change another property of the car by creating a clone and overriding it, and test that
setTimeout still uses the bound value from d) */

setTimeout(car.description.bind(car), 200);
let carClone = { ...car, year: 2025 };

// will use the original values because setTimeout is using the description method of the original car object.

let carClone2 = { ...car, make: 'Ferrari',};
setTimeout(car.description.bind(carClone2), 200);



/* Question 6. Use the Function prototype to add a new delay(ms) function to all functions,
which can be used to delay the call to that function by ms milliseconds. */

function multiply(a, b) {
    console.log( a * b );
    }
    multiply.delay(500)(5, 5); // prints 25 after 500 milliseconds

/* 
a) Use the example multiply function below to test it with, as above, and assume that all
delayed functions will take two parameters
b) Use apply to improve your solution so that delayed functions can take any number of
parameters
c) Modify multiply to take 4 parameters and multiply all of them, and test that your
delay prototype function still works. */

Function.prototype.delay = function(ms) {
    const originalFunc = this;  
    return function(...args) {
        setTimeout(() => {
            originalFunc.apply(this, args); 
        }, ms);
    };
};

function multiply(a, b) {
    console.log(a * b);
}

multiply.delay(500)(5, 5);  // Prints 25 after 500 milliseconds

Function.prototype.delay2 = function(ms) {
    const originalFunc = this;  
    return function(...args) {
        setTimeout(() => {
            originalFunc.apply(this, args);  
        }, ms);
    };
};

function multiply2(a, b, c, d) {
    console.log(a * b * c * d);
}

multiply2.delay2(500)(2, 3, 4, 5);  // Prints 120 after 500 milliseconds



/* Question 7. The following DigitalClock class uses an interval to print the time every 
second once started, until stopped. */

class DigitalClock {
    constructor(prefix) {
    this.prefix = prefix;
    }
    display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    if (hours < 10) hours = '0' + hours;
    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
    }
    stop() {
    clearInterval(this.timer);
    }
    start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
    }
    }
    const myClock = new DigitalClock('my clock:')
    myClock.start()

/* 
a) Create a new class PrecisionClock that inherits from DigitalClock and adds the
parameter precision – the number of ms between 'ticks'. This precision parameter
should default to 1 second if not supplied.
b) Create a new class AlarmClock that inherits from DigitalClock and adds the
parameter wakeupTime in the format hh:mm. When the clock reaches this time, it
should print a 'Wake Up' message and stop ticking. This wakeupTime parameter should
default to 07:00 if not supplied. */

class PrecisionClock extends DigitalClock {
    constructor(prefix, precision = 1000) {
        super(prefix);
        this.precision = precision;
    }

    start() {
        this.display();
        this.timer = setInterval(() => this.display(), this.precision); 
    }
}

const myPrecisionClock = new PrecisionClock('Precision clock:', 500);  
myPrecisionClock.start();

class AlarmClock extends DigitalClock {
    constructor(prefix, wakeupTime = '07:00') {
        super(prefix);  // Call the parent class constructor
        this.wakeupTime = wakeupTime;
    }

    display() {
        let date = new Date();
        let [hours, mins, secs] = [date.getHours(), date.getMinutes(), date.getSeconds()];

        if (hours < 10) hours = '0' + hours;
        if (mins < 10) mins = '0' + mins;
        if (secs < 10) secs = '0' + secs;
        
        console.log(`${this.prefix} ${hours}:${mins}:${secs}`);

        // Check if the current time matches the wakeup time
        if (`${hours}:${mins}` === this.wakeupTime) {
            console.log('Wake Up!');
            this.stop();  // Stop the clock once the wakeup time is reached
        }
    }
}

const myAlarmClock = new AlarmClock('Alarm clock:', '10:30');  // Set the wakeup time to 10:30
myAlarmClock.start();



/* Question 8. Using the following starter code, create a decorator function to validate function 
arguments as strings. Test it by decorating the given orderItems function below. */

function orderItems(itemName) {
    return `Order placed for: ${itemName}`;
    }
    // create a decorated version of the original function
    const validatedOrderItem = validateStringArg(orderItems);
    console.log(validatedOrderItem("Apple Watch")); // should run the function
    // console.log(validatedOrderItem(123)); // should throw an error

/* 
a) Create a decorator function validateStringArg(fn) which will validate an
argument passed to fn to ensure that it is a string, throwing an error if not
b) Extend orderItems to use the ... rest operator, allowing multiple item name
arguments, and include them all in the returned string
c) Extend the decorator function to validate as strings all arguments passed to fn
d) When testing the decorated function, use try-catch blocks to handle errors thrown for
non-string arguments */

// function validateStringArg(fn) {
//     return function(...args) {
//         for (let arg of args) {
//             if (typeof arg !== 'string') {
//                 throw new Error('Argument must be a string');
//             }
//         }
//         return fn(...args);
//     };
// }

// function orderItems(itemName) {
//     return `Order placed for: ${itemName}`;
// }

// const validatedOrderItem2 = validateStringArg(orderItems);

// console.log(validatedOrderItem2("Bose Speaker")); 
// console.log(validatedOrderItem2(123));

function orderItems(...itemNames) {
    return `Order placed for: ${itemNames.join(", ")}`;
}

function validateStringArg(fn) {
    return function(...args) {
        for (let arg of args) {
            if (typeof arg !== 'string') {
                throw new Error('All arguments must be strings');
            }
        }
        return fn(...args);
    };
}

const validatedOrderItems = validateStringArg(orderItems);

console.log(validatedOrderItems("Apple Watch", "iPhone 16", "AirPods"));
console.log(validatedOrderItems("Apple Watch", 123));

try {
    console.log(validatedOrderItems("Apple Watch", "iPhone 16", "AirPods"));  
    console.log(validatedOrderItems("Apple Watch", 123)); 
} catch (error) {
    console.error(error.message); 
}


/* Question 9. We can delay execution of a function using setTimeout, where we need to provide both
the callback function and the delay after which it should execute.
a) Create a promise-based alternative randomDelay() that delays execution for a
random amount of time (between 1 and 20 seconds) and returns a promise we can use
via .then(), as in the starter code below
b) If the random delay is even, consider this a successful delay and resolve the promise,
and if the random number is odd, consider this a failure and reject it
c) Update the testing code to catch rejected promises and print a different message
d) Try to update the then and catch messages to include the random delay value */

function randomDelay() {
    return new Promise((resolve, reject) => {
        // Generate a random delay between 1 and 20 seconds (1000 ms * 1 to 20)
        const delay = Math.floor(Math.random() * 20) + 1; // Between 1 and 20
        
        // Set timeout to delay execution
        setTimeout(() => {
            if (delay % 2 === 0) {
                // If delay is even, resolve the promise
                resolve(delay);
            } else {
                // If delay is odd, reject the promise
                reject(delay);
            }
        }, delay * 1000);  // delay in milliseconds
    });
}

// Testing the randomDelay function
randomDelay()
    .then(delay => {
        console.log(`Yay! Delay was ${delay} seconds (even). There appears to have been a delay.`);
    })
    .catch(delay => {
        console.log(`Denied! Delay was ${delay} seconds (odd). Something went wrong.`);
    });


/* Question 10.Fetch is a browser-based function to send a request and receive a response from a server,
which uses promises to handle the asynchronous response.
The below fetchURLData uses fetch to check the response for a successful status
code, and returns a promise containing the JSON sent by the remote server if successful
or an error if it failed. (To run this code in a node.js environment, follow the instructions in the
comments before the function.)
a) Write a new version of this function using async/await
b) Test both functions with valid and invalid URLs
c) (Extension) Extend your new function to accept an array of URLs and fetch all of them,
using Promise.all to combine the results. */

// run 'npm init' and accept all the defaults
// run 'npm install node-fetch'
// run 'npm pkg set type=module'
import fetch from 'node-fetch'
globalThis.fetch = fetch
function fetchURLData(url) {
let fetchPromise = fetch(url).then(response => {
if (response.status === 200) {
return response.json();
} else {
throw new Error(`Request failed with status ${response.status}`);
}
});
return fetchPromise;
}

fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
.then(data => console.log(data))
.catch(error => console.error(error.message));


// Rewriting the fetchURLData function using async/await
async function fetchURLData(url) {
    try {
        const response = await fetch(url);  
        if (response.status === 200) {
            const data = await response.json();  
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);  
        }
    } catch (error) {
        throw error;  
    }
}

// Test the async/await version
fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => console.log(data))
    .catch(error => console.error(error.message));

    function fetchURLDataUsingThen(url) {
        let fetchPromise = fetch(url).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        });
        return fetchPromise;
    }

    fetchURLDataUsingThen('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => console.log(data))
    .catch(error => console.error(error.message));

fetchURLDataUsingThen('https://invalidurl.example.com')
    .then(data => console.log(data)) 
    .catch(error => console.error(error.message)); 

    fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => console.log(data))
    .catch(error => console.error(error.message));

fetchURLData('https://invalidurl.example.com')
    .then(data => console.log(data)) 
    .catch(error => console.error(error.message)); 

// Function to fetch multiple URLs using Promise.all
async function fetchMultipleURLs(urls) {
    try {
        const fetchPromises = urls.map(url => fetchURLData(url));
        const results = await Promise.all(fetchPromises);
        return results;  
    } catch (error) {
        throw error; 
    }
}
// Test with multiple URLs
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3'
];

fetchMultipleURLs(urls)
    .then(data => console.log(data))  // Logs an array of data for all successful requests
    .catch(error => console.error(error.message));
    