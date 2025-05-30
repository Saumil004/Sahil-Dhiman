const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '⚠️ Name is required'],
      trim: true,
      minlength: [3, '⚠️ Name must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, '⚠️ Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        '⚠️ Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, '⚠️ Password is required'],
      minlength: [6, '⚠️ Password must be at least 6 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

// Pre-save middleware to hash password (if modified)
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);