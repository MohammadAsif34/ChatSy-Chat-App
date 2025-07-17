import cors from "cors";
export const origins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://chatsy-mohammadasif34.netlify.app",
];
export const corsConfig = () => {
  const config = { origin: origins, credentials: true };
  return cors(config);
};
