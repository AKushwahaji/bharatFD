import { useState, useEffect } from "react";
import { fetchFAQs } from "../api/faqApi";

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetchFAQs(language).then(setFaqs);
  }, [language]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      
      <select
        className="border rounded p-2 mb-4"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
      </select>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{faq.question}</h3>
            <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQList;
