import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Extend User interface to include isPasswordCorrect
interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  isAdmin(): Promise<boolean>;
}

// Define the user schema with username, password, and role
const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email : {
    type : String ,
    unique : true ,
    required : true ,
    lowercase : true ,
    trim : true ,
    index : true ,
    regex : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  },
  password: { type: String, required: true },
  role: { 
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

// Pre-save hook to hash password if modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Add isPasswordCorrect method to the user schema
userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

//check if user is admin
userSchema.methods.isAdmin = async function (): Promise<boolean> {
  return this.role === "ADMIN";
};

// Export the User model
const User = mongoose.model<User>("User", userSchema);

export default User;
