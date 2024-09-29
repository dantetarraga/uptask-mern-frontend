import { projectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/apiProject";
import { toast } from "react-toastify";

interface Props {
  project: projectFormData;
  projectId: string;
}

const EditProjectForm = ({project, projectId}: Props) => {
  const initialValues: projectFormData = {
    projectName: project.projectName,
    clientName: project.clientName,
    description: project.description
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: updateProject,
    onError: () => {
      toast.error('An error occurred while updating the project')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      queryClient.invalidateQueries({queryKey: ['projects']})
      toast.success('Project updated successfully')
      navigate('/')
    }
  })

  const onSubmit = async (formData: projectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-5xl font-black'>Create Project</h1>
      <p className='text-2xl font-light text-gray-500 mt-5'>
        Fill the form to create a new
      </p>

      <nav className='my-5'>
        <Link
          className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md'
          to='/'
        >
          Return to Dashboard
        </Link>
      </nav>

      <form
        className='mt-10 bg-white shadow-lg p-10 rounded-lg'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <ProjectForm errors={errors} register={register} />
        <input
          type='submit'
          value='Save Project'
          className='bg-fuchsia-600 w-full hover:bg-fuchsia-700 p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md'
        />
      </form>
    </div>
  );
};

export default EditProjectForm;
