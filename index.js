require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = "Me fale sobre a Alemanha";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
