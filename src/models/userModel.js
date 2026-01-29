import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: (props) => `${props.value} is an invalid email`,
      },
    },
    role:{
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
);

const User = mongoose.model("user", userSchema);

export default User;
