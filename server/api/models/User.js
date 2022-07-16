import mongoose from 'mongoose';
import validator from 'validator';

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

// mongoose hook fire before doc saved to db
userSchema.pre('save', function(next) {
  console.log('New user about to be created and saved to db.');

  // next();
});

const User = mongoose.model('user', userSchema);
export default User;
