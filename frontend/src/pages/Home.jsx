import FAQList from "../components/FAQList";
import FAQForm from "../components/FAQForm";
import { useState } from "react";

const Home = () => {
  const [faqs, setFaqs] = useState([]);

  const handleFAQAdded = (newFAQ) => {
    setFaqs([newFAQ, ...faqs]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">FAQ Management</h1>
      <FAQForm onFAQAdded={handleFAQAdded} />
      <FAQList />
    </div>
  );
};

export default Home;
