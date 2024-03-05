const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require("joi");

const lisingSchema = new Schema({
    title : {
        type :String,
        required: true,
    },
    description : String,
    image : {
           url : String,
           filename:String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      category : {
        type: [String],
      }
      
});

lisingSchema.post("findOneAndDelete",async(req,res)=>{
    if(Listing){
        await Review.deleteMany({ _id: {$in:Listing.reviews}})
    }
})

const Listing = mongoose.model("Listing",lisingSchema);
module.exports = Listing;
