import { getProjects } from "@/api/apiProject"
import ProjectCard from "@/components/projects/ProjectCard"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { Project } from "../types"

const DashboardView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading) return <p>Loading...</p>

  if (data) return (
    <>
      <h1 className="text-5xl font-black">My Projects</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Here you can manage your projects
      </p>

      <nav className="my-5">
        <Link 
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md" 
          to='/projects/create'
        >
          Create Project
        </Link>
      </nav>    

      <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
        {
          data.length > 0 ? (
            data.map((project: Project) => (
              <li className='flex justify-between gap-x-6 px-5 py-10'>
                <ProjectCard key={project.id} project={project} />
              </li>
            ))
          ) : (
            <p className="tex-center py-20">
              No projects found. <Link to='/projects/create' className="text-fuchsia-500 font-bold">Create one</Link>
            </p>
          )
        }
      </ul>
    </>
  )
}

export default DashboardView