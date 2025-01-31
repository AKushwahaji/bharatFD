import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }, // Rich Text (HTML)
    translations: {
      hi: { type: String, default: "" }, // Hindi
      bn: { type: String, default: "" }, // Bengali
    },
  },
  { timestamps: true }
);

// Create the FAQ model
const FAQ = mongoose.model("FAQ", FAQSchema);

export default FAQ;
