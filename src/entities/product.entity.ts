import * as mongoose from 'mongoose';
export const Product = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
  },

  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },

  price: {
    type: Number,
    required: [true, 'Please enter product price'],
  },

  images: [
    {
      filename: {
        type: String,
        required: [true, 'Please enter image filename'],
      },
      path: {
        type: String,
        required: [true, 'Please enter image filepath'],
      },
    },
  ],

  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
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

export const ProductSchema = mongoose.model('Product', Product);
