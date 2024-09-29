import { getProjectById } from "@/api/apiProject"
import EditProjectForm from "@/components/projects/EditProjectForm"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

const EditProjectView = () => {
  const params = useParams()
  const projectId = params.projectId as string
  const {data, isLoading, isError} = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectId ? getProjectById(projectId) : Promise.reject(new Error('Project ID is undefined')),
    retry: false
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <Navigate to='/404' />

  if (data) return <EditProjectForm project={data} projectId={projectId} />
}

export default EditProjectView