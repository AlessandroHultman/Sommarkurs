import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 25
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    }
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 7,
    maxlength: 25
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  // tokens: [{
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }]
},
  { timestamps: true }
);

// mongoose hook that fires pre middleware to hash passwords before saving to db
userSchema.pre('save', async function(next) {
  const salt = await  bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('user', userSchema);
export default User;
