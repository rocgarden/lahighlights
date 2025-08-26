const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    title: { type: String, required: true },
    //author: {type: String,},
    content: { type: String, required: true },
    imageUrl: { type: String },
    category: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    addressLink: { type: String },//place website link
    phoneLink: { type: String },
    placeData: { type: Object },
    creator: { type: String, required: true }, // 👈 Added line

    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    section: {
      type: String,
      enum: ["hero", "feed", "about", "featured"],
      default: "feed",
    },
    photoCredit: {
    type: String,
    default: "Norah Bird Travel", // fallback if none provided
    },
    //TODO create reference to User
    //creator: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models?.Post || mongoose.model("Post", Post);
