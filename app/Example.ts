/*
    - number
    - string
    - boolean
    - Array
    - Object
    - any
*/


const x: number = 1
const age: string = 'Hello'
const isOld: boolean = false;

type Person = {
    name: string;
    age: number;
    isOld: boolean;
}

const om: Person = {
    name: "Om",
    age: 13,
    isOld: false
}

const people: Array<Person> = [
    {
        name: "Om",
        age: 13,
        isOld: false
    }
]

const y: number = 11;
const ba: string = 'BAA';

// if(y == ba) {
//     // Returns an Error    
// }

switch (y) {
    case 10:
        console.log('y is equal 10');
        break;
    case 11:
        console.log('y is equal to 11');
        break;
}

const add = (a: number, b: number): number => a + b;

// const bob: string = add(1, 3);

enum People {
    OM,
    AKSHAT,
    RAHUL,
    DURGA
};

const person: People = People.AKSHAT;

if (person == People.AKSHAT) {
    console.log("Person is akshat");
}