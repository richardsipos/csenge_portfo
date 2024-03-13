import mongoose from "mongoose";
const { Schema } = mongoose;

const RecipeSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    preparation: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recipe", RecipeSchema);