import FAQ from "../models/FAQ.js";
import translate from "../utils/translate.js";
import redisClient from "../config/redis.js";
const supportedLanguages = [
  "hi", "bn", "te", "ta", "mr", "gu", "kn", "ml", "or", "pa", "as", "ur", "ne", "si", "bg", "hi", "zu"
];
// Fetch FAQs with language selection
export const getFAQs = async (req, res) => {
  const lang = req.params.lang || req.query.lang || req.body.lang || "en";  // Get language from request, default to "en"

  // Check if FAQs for the requested language are in cache
  try {
    const cachedFAQs = await redisClient.get(`faqs_${lang}`);
    if (cachedFAQs) {
      // If cached, return the FAQs from the cache
      return res.json(JSON.parse(cachedFAQs));
    }

    // If not cached, fetch all FAQs from the database
    let faqs = await FAQ.find();

    // Filter and map FAQs to only return question/answer in requested language
    faqs = faqs.map((faq) => {
      return {
        question: faq.translations[lang] || faq.question,  // Fallback to English if translation is missing
        answer: faq.translations[lang] || faq.answer,      // Fallback to English if translation is missing
      };
    });

    // Store the translated FAQs in the cache for future requests
    await redisClient.set(`faqs_${lang}`, JSON.stringify(faqs), 'EX', 3600);  // Set cache with 1 hour expiry

    // Return the translated FAQs
    return res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return res.status(500).json({ message: error.message });
  }
};





// Add new FAQ with automatic translation
export const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Create a translations object for all supported languages
    const translations = {};

    // Loop through the languages and translate the question and answer
    for (const lang of supportedLanguages) {
      translations[lang] = {
        question: await translate(question, lang),
        answer: await translate(answer, lang)
      };
    }

    // Create the new FAQ entry with the translated data
    const newFAQ = await FAQ.create({ question, answer, translations });

    // Invalidate cache for all languages
    await redisClient.del(...supportedLanguages.map(lang => `faqs_${lang}`));
    res.status(201).json(newFAQ);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};
