var mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32, 
      trim: true,
    },
    lastName: {
      type: String,
      maxLength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")             //virtual is the method difined in mongoose along wit getters[get] and setter[set] to set the by the info, with the existing info present in database 
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {                            //we can make as many methods as we want for a field in mongoose
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);

// CRYPTO MODULE (NODE) : https://nodejs.org/api/crypto.html#crypto_crypto
// MOONGOSE : https://mongoosejs.com/docs/guide.html#definition
// FOR CREATION OF UUID (NPM) : https://www.npmjs.com/package/uuid   [uuid is used to create a salt, which is used in generating hashed password]
// vid 3.3
