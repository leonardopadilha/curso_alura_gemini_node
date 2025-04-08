import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function inicializaModelo(modelo) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: modelo });
  return model;
}
