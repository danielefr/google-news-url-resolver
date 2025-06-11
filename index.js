const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = process.env.PORT || 3000;

app.get("/resolve", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: "Missing ?url=" });
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
    const finalUrl = page.url();
    await browser.close();
    res.json({ finalUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
