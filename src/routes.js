const express = require("express");
const { login, protectedContent, gastos, segredos } = require("./controllers/authController");

const router = express.Router();

// Rota pública
router.get("/", (request, response) => {
  response.json({ message: "Endpoint que não exige autenticação!" });
});

// Rota de login
router.post("/login", login);

// Rota protegida
router.get("/protected", protectedContent);

// Rota informações secretas
router.get("/gastos", gastos);

router.get("/segredos", segredos);

module.exports = router;
