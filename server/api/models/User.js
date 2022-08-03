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
},
  { timestamps: true }
);

// mongoose hook that fires pre middleware to hash passwords before saving to db
userSchema.pre('save', async function(next) {
  const salt = await  bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    // compare user entered password with hashed password in db
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);
export default User;
