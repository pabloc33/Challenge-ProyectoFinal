// ===============================
// Puerto
// ===============================
process.env.PORT = process.env.PORT || 3000;

// ===============================
// Vencimiento del Token
// ===============================
process.env.CADUCIDAD_TOKEN = "48h";

// ===============================
// SEED de autenticación
// ===============================
process.env.SECRET = "ASDFG";

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// base de datos
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/evento";
} else {
  urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
