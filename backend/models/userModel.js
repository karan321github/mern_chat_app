const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, Unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png",
    },
  },
  { timeStamp: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.modified) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });  

const User = mongoose.model("User", userSchema);

module.exports = User;
