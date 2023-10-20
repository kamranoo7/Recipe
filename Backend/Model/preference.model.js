let mongoose=require("mongoose")
let prefSchema=mongoose.Schema({
    recipeId: Number,  // Assuming user ID for authentication
    title:String,
    ingredients:Array,
    instruction:String,
    image:String,
    nutritional:String,
    UserID:String
})
let prefModel=mongoose.model("saved",prefSchema)

module.exports={
    prefModel
}