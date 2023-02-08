const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log("CONNECTION OPEN")
    })
    .catch((err) => {
        console.log(err)
        console.log("CONNECTION ERROR")
    });

const personSchema = new mongoose.Schema({
    first: {
        type: String
    },
    last: {
        type: String
    }
})

personSchema.virtual('fullName')
    .get(function() {
        return `${this.first} ${this.last}`
    })
    .set(function(v) {
        this.first = v.substr(0, v.indexOf(' '));
        this.last = v.substr(v.indexOf(' ') + 1);
    })

personSchema.pre('save', async function() {
    this.first = "YO";
    this.last = "MAMA";
    console.log("ABOUT TO SAVE!!!")
})

personSchema.post('save', async function() {
    console.log("JUST SAVE!!!!")
})

const Person = mongoose.model('Person', personSchema)


