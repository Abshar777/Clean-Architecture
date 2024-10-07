import mongoose, { Schema, Document } from 'mongoose';
import IProduct from '../interface/IProduct';


const ProductSchema: Schema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  isDeleat:{
    type:Boolean,
    default:false,
    required: true,
  }
}, {
  timestamps: true, 
});


export default mongoose.model<IProduct>('Product', ProductSchema);

