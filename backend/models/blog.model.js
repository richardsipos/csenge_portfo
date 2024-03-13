import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    images: {
        type: [String],
        required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", BlogSchema);