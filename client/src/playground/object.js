const person = {
    name :'rahul' ,
    greet : function() {
        return 'Hello my name is'  + this.name
    }
}
console.log(person.greet()) // hello my name is rahul

const sayName = person.greet

console.log(sayName()) // 'hello my name is undefined'

// bind method helps to set the context of the this keyword inside a fun
// what gets passed to the bind method, will now become the value of the this keyword

console.log(sayName.bind(person) ())

function sayHello() {
    return 'hello my name is' +this.name
}

console.log(sayHello.bind({name:'me'})())   // hello my name is me