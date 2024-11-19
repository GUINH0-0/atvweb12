const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (request, response) => {
  const { username, password } = request.body;

  if (username === "professor.lucas" && password === "1234") {
    const payload = {
      sub: username,
      name: "Lucas José de Souza",
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return response.json({ message: "Login bem-sucedido!", token });
  }

  response.status(401).json({ message: "Credenciais inválidas" });
};

const protectedContent = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "Conteúdo protegido acessado!", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const gastos = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "Gastos referêntes aos ultimos 3 anos da empresa !@#$%¨&*", gastos_2024: "R$ 10.000.000", gastos_2023: "R$ 54.000.000", gastos_2022: "R$ 999.999.999" });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};


const segredos = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ AVISO: "As informações aqui são confidenciais", Número_Planetas_Habitáveis_Descobertos: "63", Espécies_Alienigenas_Conhecidas: "27", Contatos_Bem_Sucedidos: "9", Contatos_Mal_Sucedidos: "4", Número_Óbitos_Humanos: "1.340.900.000" });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado"  });
  }
};

module.exports = { login, protectedContent, gastos, segredos };
