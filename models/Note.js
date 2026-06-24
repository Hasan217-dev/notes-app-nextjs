import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      maxLength: 5000,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.Note || mongoose.model("Note", NotesSchema);