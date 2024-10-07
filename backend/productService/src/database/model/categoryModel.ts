import mongoose, { Schema, Document } from 'mongoose';
import ICategory from '../interface/ICategory';


const CategorySchema: Schema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});


export default mongoose.model<ICategory>('Category', CategorySchema);

