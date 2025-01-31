import FAQ from "../models/FAQ.js";
import translate from "../utils/translate.js";
import redisClient from "../config/redisClient.js";

// Fetch FAQs with language selection
export const getFAQs = async (req, res) => {
  const lang = req.query.lang || "en";

  // Check cache first
  try {
    const cachedFAQs = await redisClient.get(`faqs_${lang}`);
    if (cachedFAQs) {
      return res.json(JSON.parse(cachedFAQs));
    }

    let faqs = await FAQ.find();
    if (lang !== "en") {
      faqs = faqs.map((faq) => ({
        ...faq.toObject(),
        question: faq.translations[lang] || faq.question,
        answer: faq.translations[lang] || faq.answer,
      }));
    }

    // Store in Redis Cache
    await redisClient.setEx(`faqs_${lang}`, 3600, JSON.stringify(faqs));
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new FAQ with automatic translation
export const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Translate to Hindi & Bengali
    const translations = {
      hi: await translate(question, "hi"),
      bn: await translate(question, "bn"),
    };

    const newFAQ = await FAQ.create({ question, answer, translations });

    // Invalidate cache
    await redisClient.del("faqs_en", "faqs_hi", "faqs_bn");

    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
