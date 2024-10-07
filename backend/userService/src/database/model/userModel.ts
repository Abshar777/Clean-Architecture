import mongoose from "mongoose";
import IUser from "../../infrastructure/interfaces/IUser";
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: [true, "name is required"] },
  email: { type: String, required: [true, "email is required"], unique: true },
  password: { type: String, required: [true, "password is required"] },
  img: String,
  isAdmin: { type: Boolean, default: false, required: true },
  isBlock: { type: Boolean, default: false, required: true },
});


userSchema.pre("save",(async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
}))

export const userModel= mongoose.model<IUser>('USER',userSchema)
