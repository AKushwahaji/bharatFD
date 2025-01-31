import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyCUqvkH5UMvY94D5yeUbdlwYWrXeIA9TMw"; // Replace with your API key

async function translateText(text, targetLanguage) {
  try {
    // Make a POST request to Google Translate API
    const response = await axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      null,
      {
        params: {
          q: text,                 // Text to be translated
          target: targetLanguage,  // Target language code (e.g., 'en', 'es', 'fr')
          key: GOOGLE_API_KEY,     // Your Google API key
        },
      }
    );

    // Extract the translated text from the response
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Translation failed");
  }
}
export default translateText;