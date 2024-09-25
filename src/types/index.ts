import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string(),
  description: z.string(),
  projectName: z.string(),
  clientName: z.string()
})

export type Project = z.infer<typeof projectSchema>
export type projectFormData = Omit<Project, 'id'>