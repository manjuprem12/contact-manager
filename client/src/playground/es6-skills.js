const person = {
    name : 'rakesh',
    skills : ['js','py','java'],
    // inside a method, the value of the this will still refers to the current object

   details : function () {
       this.skills.forEach((skill) => {
           console.log(`${this.name} knows ${skill}`)
       })
   },

    //inside a methos , if ther is a fun , inside that fun, value of this is the global object not the current object

    profile:function() {
        const someFunction = () => {
            console.log(this.name)
        }
        someFunction() 
        return this
    }
}


console.log(person.profile())

// rakesh
// { name: 'rakesh',
//   skills: [ 'js', 'py', 'java' ],
//   details: [Function: details],
//   profile: [Function: profile] }