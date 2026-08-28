const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const vegetableSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 64
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    farmer_id: {
        type: ObjectId,
        ref: "User"
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    sold: {
        type: Number,
        default: 0
    },
},
{ timestamps: true }
);


module.exports=mongoose.model("Vegetable",vegetableSchema);
