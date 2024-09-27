import { z } from "zod";

export const fullProjectSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tasks: z.array(z.any()).optional() 
});

export const projectSchema = z.object({
  id: z.string(),
  description: z.string(),
  projectName: z.string(),
  clientName: z.string(),
});

export const dashboardProjectSchema = z.array(fullProjectSchema);

export type Project = z.infer<typeof projectSchema>;
export type projectFormData = Omit<Project, "id">;
