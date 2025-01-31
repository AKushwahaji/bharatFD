import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/faqs";

// Fetch FAQs with optional language selection
export const fetchFAQs = async (language = "en") => {
  try {
    const response = await axios.get(`${API_URL}?lang=${language}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
};

// Add a new FAQ
export const addFAQ = async (faqData) => {
  try {
    const response = await axios.post(API_URL, faqData);
    return response.data;
  } catch (error) {
    console.error("Error adding FAQ:", error);
    return null;
  }
};
