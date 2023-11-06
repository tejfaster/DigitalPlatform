const { mongoose, ObjectId } = require("../constant/library");

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercaase: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required:true
    },
    brand: {
        type: String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    sold: {
        type: String,
        default: 0
    },
    image: {
        type: Array
    },
    color: {
        type: String,
        required:true
    },
    ratings: [{
        star: Number,
        postedby: { type:ObjectId, ref: "User" }
    }]
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);