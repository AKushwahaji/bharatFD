import translate from "@vitalets/google-translate-api";

export default async function translateText(text, targetLang) {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text
  }
}
