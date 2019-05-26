const mongoose =  require('mongoose');

const bookingSchema = mongoose.Schema({
    room_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Room'},
    guestData: {
        user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        name: {type: String, required: true},
        surname: {type: String, required: true}
    },
    date_in: {type: String, match:/\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])/, required: true},
    date_out: {type: String, match:/\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])/, required: true},
    total_charge: {type: Number, required: true}
})

bookingSchema.methods = {
    getView() {
        return {
            id: this._id,
            room_id: this.room_id,
            guest_data: this.guestData,
            date_in: this.date_in,
            date_out: this.date_out,
            total_charge: this.total_charge
        }
    }
}

const model = mongoose.model('Booking', bookingSchema)

module.exports = {model, bookingSchema}