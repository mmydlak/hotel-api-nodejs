const mongoose =  require('mongoose');

const roomSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    room_number: {type: Number, required: true},
    price_per_night: {type: Number, required: true, min: 0},
    capacity: {type: Number, required: true, min: 1},
    beds: [
        {
            bed_type: String,
            number: Number
        }
    ]
})

roomSchema.index({beds: 'text'});

roomSchema.methods = {
    getView(full) {
        const view = {
            id: this._id,
            room_number: this.room_number,
            price_per_night: this.price_per_night,
            capacity: this.capacity,
        }

        return full ? {
            ...view,
            beds: this.beds
        } : view
    }
}
// roomSchema.pre('save', next => {
//     var error = new ValidationError(this);
//     //error.errors.email = new ValidatorError('email', 'Email is not valid', 'notvalid', this.email);
//     return next(error);
// })

// var error = new ValidationError(this);
// error.errors.email = new ValidatorError('email', 'Email is not valid', 'notvalid', this.email);
// return next(error);

const model = mongoose.model('Room', roomSchema)

module.exports = {model, roomSchema}