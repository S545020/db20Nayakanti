const mongoose = require("mongoose")
const costumeSchema = mongoose.Schema({
costume_type: String,
size: {type:String, minlength:4},
cost: {type:Number,min:15,max:100}
})
module.exports = mongoose.model("Costume",costumeSchema)