import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { projectFormData } from "types";
import { createProject } from "@/api/apiProject";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const initialValues: projectFormData = {
  projectName: "",
  clientName: "",
  description: "",
};

const CreateProjectView = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });
  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Project created successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("An error occurred while creating the project");
    }
  })

  const onSubmit = async (formData: projectFormData) => {
    await mutation.mutateAsync(formData);
  };

  return (
    <>
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
            value='Create Project'
            className='bg-fuchsia-600 w-full hover:bg-fuchsia-700 p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md'
          />
        </form>
      </div>
    </>
  );
};

export default CreateProjectView;
