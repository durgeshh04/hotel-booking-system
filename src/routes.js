import authRoutes from "./modules/auth/auth.routes.js";

export default (app) => {
  app.use("/auth", authRoutes);
};
