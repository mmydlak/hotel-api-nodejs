const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const roles = ['user', 'admin']

const userSchema = new mongoose.Schema({
    email:      {type: String, match: /^\S+@\S+\.\S+$/, required: true, unique: true, trim: true},
    password:   {type: String, required: true, minlength: 6},
    role:       {type: String, enum: roles, default: 'user'}
    },
    {timestamps: true}
    );

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const rounds = 10;
    bcrypt.hash(this.password, rounds)
        .then((hash) => {
            this.password = hash;
            next()
        })
        .catch(next)
})

userSchema.methods = {
    getView() {
        return {
            id: this._id,
            email: this.email,
            //password: this.password,
            role: this.role,
        }
     },

    authenticate(password) {
        console.log('model tutaj juhu')
        return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
    }
}

userSchema.statics = {
    roles
}


const model = mongoose.model('User', userSchema)

module.exports = {model, userSchema}