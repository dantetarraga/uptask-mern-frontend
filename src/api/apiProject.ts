import api from "@/lib/axios";
import { dashboardProjectSchema, Project, projectFormData } from "../types";

export const createProject = async (data: projectFormData) => {
  return api.post("/projects", data)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

export const getProjects = async () => {
  return api.get("/projects")
    .then(response => {
      const result = dashboardProjectSchema.safeParse(response.data.data);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      return response.data.data;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export const getProjectById = async (projectId: string) => {
  return api.get(`/projects/${projectId}`)
    .then(response => response.data.data)
    .catch(error => {
      throw new Error(error);
    });
}

type ProjectApiData = {
  formData: projectFormData;
  projectId: Project["id"];
}

export const updateProject = async ({projectId, formData}: ProjectApiData) => {
  return api.put(`/projects/${projectId}`, formData)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

export const deleteProject = async (projectId: Project['id']) => {
  return api.delete(`/projects/${projectId}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}