const { mongoose ,bcrypt,ObjectId, crypto} = require("../constant/library");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,  
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    isBlocked:{
        type:Boolean,
        dfault:false
    },
    cart:{
        type:Array,
        default:[],
    },
    refreshToken:{
        type:String,      
    },
    address:[{
        type:ObjectId,
        ref:"Address"
    }],
    wishlist:[{
        type:ObjectId,
        ref:"Product"
    }],
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
},{
    timestamps:true
});

userSchema.pre('save',async function(next){

    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.isPasswordMatch = async function(enteredPasswrd){
    return await bcrypt.compare(enteredPasswrd,this.password)
} 

userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now()+30*60*1000
    return resetToken
}

//Export the model
module.exports = mongoose.model('User', userSchema);