import mongoose from 'mongoose';
// import bcrypt from 'bcrypt'; 

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// To calkiem zabawne jak tworze nowe konto wpisuje haslo a tam haslo incorrect patrze na dane a tam: 
// "$2b$10$0Fn0hpjDIwKWWNb6HM2x8e.g31L.24SMV8TEPbCeSXoIBXDoOofvy"
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password'))
//  {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });


export const UserModel = mongoose.model('User', userSchema)


