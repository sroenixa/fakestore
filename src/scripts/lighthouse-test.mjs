// src/scripts/lighthouse-test.mjs
import fs from "fs"
import path from "path"
import { launch } from "chrome-launcher"
import lighthouse from "lighthouse"

const OUTPUT_DIR = "lighthouse-reports"
const BASE_URL   = "http://localhost:3000"

async function runLighthouse() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    }

    const chrome = await launch({ chromeFlags: ["--headless"] })
    const options = {
        logLevel: "info",
        output: "html",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        port: chrome.port,
    }

    const urls = [BASE_URL, `${BASE_URL}/products/1`]
    const results = {}

    for (const url of urls) {
        console.log(`Running Lighthouse for ${url}...`)
        const runnerResult = await lighthouse(url, options)

        const scores = {
            performance:     Math.round(runnerResult.lhr.categories.performance.score * 100),
            accessibility:   Math.round(runnerResult.lhr.categories.accessibility.score * 100),
            bestPractices:   Math.round(runnerResult.lhr.categories["best-practices"].score * 100),
            seo:             Math.round(runnerResult.lhr.categories.seo.score * 100),
        }
        results[url] = scores

        const safeName   = url.replace(BASE_URL, "").replace(/\//g, "_") || "_home"
        const reportPath = path.join(OUTPUT_DIR, `report${safeName}.html`)
        fs.writeFileSync(reportPath, runnerResult.report)

        console.log(`Scores for ${url}:`, scores)
        console.log(`→ Saved HTML report to ${reportPath}`)
    }

    await chrome.kill()

    const summary = {
        timestamp: new Date().toISOString(),
        results,
        averageScores: {
            performance:   avg(results, "performance"),
            accessibility: avg(results, "accessibility"),
            bestPractices: avg(results, "bestPractices"),
            seo:           avg(results, "seo"),
        },
    }

    const summaryPath = path.join(OUTPUT_DIR, "lighthouse-summary.json")
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))

    console.log("\n=== LIGHTHOUSE SUMMARY ===")
    console.table(summary.averageScores)
    console.log(`Summary JSON saved to ${summaryPath}`)
    console.log("Target: 90+ for all categories")
}

function avg(results, key) {
    const total = Object.values(results).reduce((sum, s) => sum + s[key], 0)
    return Math.round(total / Object.keys(results).length)
}

/* doğrudan çalıştır */
await runLighthouse()
