import { useState } from "react";
import { addFAQ } from "../api/faqApi";

const FAQForm = ({ onFAQAdded }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFAQ = await addFAQ({ question, answer });
    if (newFAQ) {
      onFAQAdded(newFAQ);
      setQuestion("");
      setAnswer("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New FAQ</h2>

      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      
      <textarea
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add FAQ
      </button>
    </form>
  );
};

export default FAQForm;
