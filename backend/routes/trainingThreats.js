const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const {
  threatCategories,
  getRandomThreatFromCategory,
  getAllCategories,
  getRandomThreat,
} = require('../utils/threatData');

const router = express.Router();

const hasGemini = Boolean(process.env.GEMINI_API_KEY);
const genAI = hasGemini ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

async function generateThreatWithGemini(category) {
  if (!genAI) return null;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Generate one realistic cybersecurity threat in category "${category}".

Return valid JSON only:
{
  "title": "string",
  "description": "2-3 sentence realistic scenario",
  "riskLevel": "Low | Medium | High | Critical",
  "prevention": ["tip1", "tip2", "tip3"],
  "category": "${category}",
  "categoryTitle": "string",
  "cveExample": "CVE-XXXX-XXXXX or null"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(text);

    if (!parsed || !parsed.title || !parsed.description || !Array.isArray(parsed.prevention)) {
      return null;
    }

    return {
      ...parsed,
      category,
      categoryTitle: parsed.categoryTitle || threatCategories[category]?.title || category,
      source: 'gemini',
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn('[trainingThreats] Gemini failed:', error.message);
    return null;
  }
}

router.get('/threats/categories', (req, res) => {
  return res.json(getAllCategories());
});

router.get('/threats/generate', async (req, res) => {
  const requestedCategory = req.query.category;
  const all = Object.keys(threatCategories);
  const category = all.includes(requestedCategory)
    ? requestedCategory
    : all[Math.floor(Math.random() * all.length)];

  const generated = await generateThreatWithGemini(category);
  if (generated) return res.json(generated);

  const fallback = getRandomThreatFromCategory(category);
  if (!fallback) {
    return res.status(400).json({
      error: 'Invalid category',
      availableCategories: getAllCategories(),
    });
  }

  return res.json(fallback);
});

router.get('/threats/random', async (req, res) => {
  const categories = Object.keys(threatCategories);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  const generated = await generateThreatWithGemini(randomCategory);
  if (generated) return res.json(generated);

  return res.json(getRandomThreat());
});

module.exports = router;
