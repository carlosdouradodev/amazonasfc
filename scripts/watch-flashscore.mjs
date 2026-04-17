import { spawn } from "node:child_process";

const intervalMinutes = Number(process.env.FLASHSCORE_INTERVAL_MINUTES ?? 15);
const intervalMs = Math.max(5, intervalMinutes) * 60 * 1000;

let running = false;

function timestamp() {
  return new Date().toISOString();
}

function runScrape() {
  if (running) {
    console.log(`[${timestamp()}] scrape skipped because previous run is still active`);
    return;
  }

  running = true;
  console.log(`[${timestamp()}] scrape started`);

  const child = spawn(process.execPath, ["scripts/scrape-flashscore.mjs"], {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    running = false;
    if (code === 0) {
      console.log(`[${timestamp()}] scrape finished`);
      return;
    }

    console.error(`[${timestamp()}] scrape failed with exit code ${code}`);
  });
}

console.log(`[${timestamp()}] Flashscore watcher running every ${Math.max(5, intervalMinutes)} minutes`);
runScrape();
setInterval(runScrape, intervalMs);
