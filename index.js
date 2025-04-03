import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta } from "./pergunta.js";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = await fazerPergunta(
    "Me fale sobre o destino que deseja conhecer: "
  );

  const parts = [
    {
      text: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser perguntado sobre algum destino, seja bairro, cidade, país ou continente, por exemplo, você poderá fornecer informações. Caso seja perguntado sobre algo que não corresponda a viagens, informe que não pode responder a respeito",
    },
    {
      text: "input: me fale sobre o flamengo, bairro tradicional do Rio de Janeiro",
    },
    {
      text: "output: O Flamengo é um bairro charmoso e tradicional da Zona Sul do Rio de Janeiro, oferecendo uma mistura interessante de história, beleza natural e vida urbana. Localizado entre o centro da cidade e as famosas praias de Copacabana e Ipanema, o bairro tem muito a oferecer aos visitantes. Pontos Turísticos e Atrações: Parque do Flamengo (Aterro do Flamengo): Um extenso parque à beira-mar com jardins, áreas de lazer, museus e vistas deslumbrantes para a Baía de Guanabara e o Pão de Açúcar. Perfeito para caminhadas, ciclismo, piqueniques e atividades ao ar livre. Abriga importantes museus, como o Museu de Arte Moderna (MAM) e o Museu do Carmo. Marina da Glória: Um porto esportivo que já sediou importantes eventos, incluindo as competições de vela dos Jogos Olímpicos de 2016. Oferece vistas panorâmicas da cidade e opções de restaurantes. Palácio do Catete: Um imponente palácio que serviu como sede do governo federal. Hoje abriga o Museu da República, que conta a história do Brasil republicano. Largo do Machado: Um movimentado centro comercial e gastronômico, com lojas, bares e restaurantes. Praia do Flamengo: Embora não seja própria para banho, a Praia do Flamengo oferece um calçadão agradável para caminhadas e corridas, com vista para o mar. Gastronomia: O Flamengo possui uma variedade de restaurantes, bares e cafés, oferecendo opções para todos os gostos e orçamentos. Desde restaurantes sofisticados com vista para a baía até botequins tradicionais e lanchonetes. Hospedagem: O bairro oferece uma gama de hotéis e pousadas, desde opções econômicas até acomodações de luxo. Como chegar: O Flamengo é facilmente acessível por transporte público, incluindo ônibus, metrô (estações Largo do Machado e Flamengo) e táxis. Dicas para visitantes: Caminhe ou ande de bicicleta pelo Parque do Flamengo para apreciar a vista e o ambiente. Visite os museus da região, como o MAM e o Museu da República. Explore o Largo do Machado e experimente a gastronomia local. Reserve sua hospedagem com antecedência, principalmente durante a alta temporada. Se você busca um bairro tranquilo, com belas paisagens, fácil acesso a outras áreas da cidade e uma atmosfera carioca autêntica, o Flamengo é uma excelente escolha para sua viagem ao Rio de Janeiro. Consulte nossos pacotes de viagem para o Rio de Janeiro e inclua o Flamengo em seu roteiro!",
    },
    { text: `input: me fale sobre o destino ${prompt}` },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
  });

  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
