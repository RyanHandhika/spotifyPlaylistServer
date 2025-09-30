import mainRoute from "./routes/mainRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use((res, req, next) => {
//   console.log("Ini middleware pertama kali!");
//   next();
// });

// Routes
app.use("/api", mainRoute);

// Error Handling
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
