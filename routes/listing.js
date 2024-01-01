const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const{listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner}= require("../middleware.js");
const { populate } = require("../models/review.js");
const listingController = require("../controllers/listings.js")
const multer = require("multer");
const {storage} = require("../cloud.config.js");
const upload = multer({storage});



const validateListing = (req,res,next) =>{
    let { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",")
     throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
router.get("/",wrapAsync(listingController.index))

//New Route
 router.get("/new",isLoggedIn,listingController.renderNewForm);

router.post("/",isLoggedIn,upload.single("listing[image]"),validateListing,
     wrapAsync(listingController.createListing)
 );

 //Edit Route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
 
 router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing));

 router.get("/:id",wrapAsync(listingController.showListing))
 
 router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

 
 

 module.exports = router;