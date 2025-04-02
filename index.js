import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta } from "./pergunta.js";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  let prompt =
    "Você é um site de viagens e deve responder somente sobre esse assunto " +
    "Caso o usuário pergunte sobre algo diferente diga que não pode responder." +
    " O usuário escolheu: ";

  prompt += await fazerPergunta(
    "Me fale sobre o destino que deseja conhecer: "
  );

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
