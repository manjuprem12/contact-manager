const person = {
    name : 'rakesh',
    skills : ['js','py','java'],
    // inside a method, the value of the this will still refers to the current object

    detailsWithOutBind: function() {
        this.skills.forEach(function(skill){
            console.log(`${this.name} knows ${skill}`)  // undefined knows js , undefined knows py, undefined knows java 
        })
    },
    detailsWithBind : function() {
        this.skills.forEach(function(skill){
            console.log(`${this.name} knows ${skill}`)
        }.bind(this))
    },

    //inside a methos , if ther is a fun , inside that fun, value of this is the global object not the current object

    profile:function() {
        function someFunction() {
            console.log(this.name)
        }
        someFunction() 
        return this
    }
}
person.detailsWithBind()
person.detailsWithOutBind()

console.log(person.profile())