import { Schema, model } from 'mongoose'

const articleSchema = new Schema({
   
    name: {
        type: String,
    },
    type: {
        type: String
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    },
    warranty_years: {
        type: Number
    },
    available: {
        type: Boolean
    },
}, {
    // _id: false,
    versionKey: false
});

// articleSchema.pre('save', function (next) {
//     // Only increment when the document is new
//     if (this.isNew) {
//         model('Article').count().then(res => {
//             console.log('res',res)
//             this._id = res + 1; // Increment count
//             next();
//         });
//     } else {
//         next();
//     }
// });

export default model('Article', articleSchema)