const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // статика
app.use("/screenshots", express.static(path.join(__dirname, "screenshots")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/screenshot", async (req, res) => {
  const { url, width } = req.body;
  const height = 800; // фиксированная высота

  const parsedWidth = parseInt(width);
  if (isNaN(parsedWidth) || parsedWidth <= 0) {
    return res.json({ success: false, message: "Некорректная ширина" });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent("");
    await page.setViewport({
      width: parsedWidth,
      height: height,
    });

    // Загружаем страницу и ждем полной загрузки
    await page.goto(url, { waitUntil: "load", timeout: 1200000 });

    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const pathname = urlObj.pathname.replace(/\//g, "_"); // заменяем слэши на подчеркивания

    // Генерация уникального имени файла, включая путь страницы
    const screenshotDir = path.join(__dirname, "screenshots", domain);
    const screenshotPath = path.join(
      screenshotDir,
      `${domain}${pathname}_${parsedWidth}.png`
    );

    fs.mkdirSync(screenshotDir, { recursive: true });

    await page.screenshot({ path: screenshotPath, fullPage: true });

    res.json({
      success: true,
      image: `/screenshots/${domain}/${domain}${pathname}_${parsedWidth}.png`,
    });

    await browser.close();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
