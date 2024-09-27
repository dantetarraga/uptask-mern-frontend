import api from "@/lib/axios";
import { projectFormData } from "../types";

export const createProject = async (data: projectFormData) => {
  return api.post("/projects", data)
    .then(response => response.data)
    .catch(error => console.error(error));
}