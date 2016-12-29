const mongoose = require('mongoose')

//track schema

const userSchema = mongoose.Schema({
		username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    userName: this.userName,
		
  };
}

const User = mongoose.model('user', userSchema);

module.exports = {User};