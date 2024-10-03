import { getProjectById } from "@/api/apiProject"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const ProjectDetailsView = () => {
  const params = useParams()
  const projectId = params.projectId as string

  const {data, isLoading, isError} = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  return (
    <div>ProjectDetailsView</div>
  )
}

export default ProjectDetailsView