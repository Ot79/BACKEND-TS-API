import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/backend-ts-api";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
      console.log("Conectando a MongoDB...");
    mongoose.connection.on("connected", () => {
      console.log("Conexión a MongoDB exitosa.");
    });
    mongoose.connection.on("error", (err) => {
      console.error("Error de conexión a MongoDB:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Desconectado de MongoDB.");
    }
    );
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Termina el proceso si no se puede conectar
  }
};