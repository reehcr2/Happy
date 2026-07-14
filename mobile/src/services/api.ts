// src/services/api.ts
import { create } from "axios";

const api = create({
  baseURL: "http://10.0.2.2:3333",
});

export default api;
