import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { collection: 'user-data' });

const User = mongoose.model('UserData', UserSchema);

export default User;