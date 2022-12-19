const user= require('../models/user')

//handler Errors
const handleError = (err)=>{
    let errors = {email:'',password:''}
 
    if(err.code === 11000){
        errors['email'] = 'that email already registered';
        return errors;
    }
    if(err && err.errors){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
           })
    }
 
   return errors
}
module.exports.signup_get =(req,res)=>{
    res.render('signup')
}

module.exports.signup_post = async(req,res)=>{
    const {email,password} = req.body
   
    try {
        const User = await user.create({email,password})
        res.status(200).send(User)
    } catch (error) {
        
        const errors = handleError(error)
        res.status(400).json(errors)
    }
}

module.exports.login_get =(req,res)=>{
    res.render('login')
}

module.exports.login_post =(req,res)=>{
    res.send('signup')
}