const User = require("../models/user");
module.exports.signup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registerdUser = await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to wanderlust");
            res.redirect("/listings");
        })
     
    } catch(e){
       req.flash("error",e.message);
       res.redirect("/signup");
    }
  
};
module.exports.login = async(req,res)=>{
    req.flash("success","Welcome to Wanderlust,You are logged in !");
    let redirectaUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectaUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
       if(err){
       return next(err);
       }
       req.flash("success",'You are logged out now');
       res.redirect("/listings");
    })
};
