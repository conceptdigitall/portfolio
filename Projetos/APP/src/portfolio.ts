import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { PortfolioAsset } from "./types.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const PORTFOLIO_PATH = path.join(here, "..", "portfolio.json");

export function loadPortfolio(): PortfolioAsset[] {
  const raw = readFileSync(PORTFOLIO_PATH, "utf-8");
  const parsed = JSON.parse(raw) as PortfolioAsset[];
  return parsed;
}
