import mongoose from "mongoose";

// const FAQSchema = new mongoose.Schema(
//   {
//     question: { type: String, required: true },
//     answer: { type: String, required: true }, // Rich Text (HTML)
//     translations: {
//       hi: { type: String, default: "" }, // Hindi
//       bn: { type: String, default: "" }, // Bengali
//       te: { type: String, default: "" }, // Telugu
//       mr: { type: String, default: "" }, // Marathi
//       ta: { type: String, default: "" }, // Tamil
//       gu: { type: String, default: "" }, // Gujarati
//       kn: { type: String, default: "" }, // Kannada
//       ml: { type: String, default: "" }, // Malayalam
//       pa: { type: String, default: "" }, // Punjabi
//       or: { type: String, default: "" }, // Odia
//       as: { type: String, default: "" }, // Assamese
//       ur: { type: String, default: "" }, // Urdu
//       sa: { type: String, default: "" }, // Sanskrit
//     },
//   },
//   { timestamps: true }
// );

// as we are getting the issue of string validation when we are trying to chnage Faq in many languages as it concatiing all the strings 
// to store in database
// but not this will not happen 
const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },  // English question
    answer: { type: String, required: true },    // English answer
    translations: {
      hi: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Hindi
      bn: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Bengali
      te: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Telugu
      mr: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Marathi
      ta: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Tamil
      gu: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Gujarati
      kn: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Kannada
      ml: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Malayalam
      pa: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Punjabi
      or: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Odia
      as: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Assamese
      ur: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Urdu
      sa: { question: { type: String, default: "" }, answer: { type: String, default: "" } }, // Sanskrit
    },
  },
  { timestamps: true }
);

// Create the FAQ model
const FAQ = mongoose.model("FAQ", FAQSchema);

export default FAQ;
