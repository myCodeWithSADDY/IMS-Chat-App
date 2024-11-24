const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  credentials: true,
};
const gandu_token = "gandu-token";

export { corsOptions, gandu_token };
