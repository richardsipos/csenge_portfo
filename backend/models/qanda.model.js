import mongoose from "mongoose";
const { Schema } = mongoose;

const QandaSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    questions: {
      type: String,
      required: true,
    },
    answers: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Qanda", QandaSchema);