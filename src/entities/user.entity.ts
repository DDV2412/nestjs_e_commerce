import { SecurityType, Status } from '../utils/enum';
import * as mongoose from 'mongoose';
import validator from 'validator';
import { hash } from 'bcrypt';

export const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: [true, 'Email is not available'],
    maxLength: [64, 'Email cannot exceed 64 characters'],
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },
  roleName: {
    type: String,
    enum: SecurityType,
    default: SecurityType.CUSTOMER,
  },
  isStatus: {
    type: String,
    enum: Status,
  },
  photoProfile: {
    type: String || null,
    required: false,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await hash(this.password, 12);
});

User.pre('save', async function (next) {
  if (this.$isEmpty('photoProfile')) {
    this.photoProfile =
      'https://images.unsplash.com/photo-1630710478039-9c680b99f800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  }
  next();
});

export const UserSchema = mongoose.model('User', User);
