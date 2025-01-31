import express from "express";
import { getFAQs, addFAQ } from "../controllers/faqController.js";

const router = express.Router();

router.get("/", getFAQs);   // Fetch FAQs (Supports ?lang=)
router.post("/", addFAQ);   // Add FAQ
// router.put("/:id", updateFAQ); // Update FAQ
// router.delete("/:id", deleteFAQ); // Delete FAQ

export default router;
