const mongoose = require("mongoose");



///////////////// MODELS ///////////////////
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const NoticeSchema = new mongoose.Schema({
  content: {
    type: String,
    required:true
  },
  tittle: {
    type: String,
    required: true
  },
 
} ,{
  timestamps: true
})
const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required:true
  },
  remitente: {
    type: String,
    required: true,
  },
  participantes: {
    type: [String], 
    required: true,
  },
}, {
  timestamps: true,
});


//////////////////////// MODELS //////////////////
const NoticeModel = mongoose.model('notice', NoticeSchema)
const UserModel = mongoose.model("user", UserSchema);
const MessageModel = mongoose.model("message", MessageSchema);

module.exports = {
  User: UserModel,
  Message: MessageModel,
  Notice: NoticeModel
};
