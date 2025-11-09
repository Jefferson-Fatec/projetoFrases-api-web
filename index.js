const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 🔹 Frases motivacionais
const frases = [
  "A persistência é o caminho do êxito.",
  "Acredite no seu potencial.",
  "O sucesso é a soma de pequenos esforços.",
  "Grandes coisas nunca vieram de zonas de conforto.",
  "Você é mais forte do que imagina."
];

// ===========================================
//  CONFIGURAÇÃO DO MORGAN
// ===========================================

// Token para capturar o IP real do cliente
morgan.token("ip", (req) => req.headers["x-forwarded-for"] || req.socket.remoteAddress);

// Token para capturar o User-Agent
morgan.token("user-agent", (req) => req.headers["user-agent"]);

// Token para identificar o tipo de cliente (Postman, navegador, mobile, etc)
morgan.token("cliente", (req) => {
  const ua = req.headers["user-agent"] || "";
  if (ua.includes("Postman")) return "Postman";
  if (ua.includes("Android")) return "App Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "App iOS";
  if (ua.includes("Expo")) return "React Native (Expo)";
  if (ua.includes("Mozilla")) return "Navegador Web";
  return "Outro";
});

// 🔹 Formato personalizado de log
const formatoLog =
  ":date[iso] | :method :url :status |  :cliente |  :ip |  :response-time ms |  :user-agent";

// Exibir logs apenas no console
app.use(morgan(formatoLog));

// ===========================================
//  ROTAS
// ===========================================

// GET → retorna frase aleatória
app.get("/frase", (req, res) => {
  const aleatoria = frases[Math.floor(Math.random() * frases.length)];
  res.json({ frase: aleatoria });
});

// ===========================================
//  SERVIDOR
// ===========================================
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ API rodando na porta ${port}`);
});