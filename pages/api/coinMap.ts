import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export type Coin = {
  id: string;
  symbol: string;
  name: string;
};

export const loadCoinData = (): Coin[] => {
  const filePath = path.join(process.cwd(), "data", "coin-list.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const coins = loadCoinData();
    res.status(200).json(coins);
  } catch (error) {
    console.error("Error loading coin data:", error);
    res.status(500).json({ message: "Failed to load coin data" });
  }
}
