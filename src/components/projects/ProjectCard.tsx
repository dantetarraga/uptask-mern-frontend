import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Project } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/api/apiProject";
import { toast } from "react-toastify";

interface Props {
  project: Project
}

const ProjectCard = ({ project }: Props) => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: deleteProject,
    onError: () => {
      toast.error('An error occurred while deleting the project')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projects']})
      toast.success('Project deleted successfully')
    }
  })

  return (
    <>
      <div className='flex min-w-0 gap-x-4'>
        <div className='min-w-0 flex-auto space-y-2'>
          <Link
            to={``}
            className='text-gray-600 cursor-pointer hover:underline text-3xl font-bold'
          >
            {project.projectName}
          </Link>
          <p className='text-sm text-gray-400'>Cliente: {project.clientName}</p>
          <p className='text-sm text-gray-400'>{project.description}</p>
        </div>
      </div>
      <div className='flex shrink-0 items-center gap-x-6'>
        <Menu as='div' className='relative flex-none'>
          <Menu.Button className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
            <span className='sr-only'>opciones</span>
            <EllipsisVerticalIcon className='h-9 w-9' aria-hidden='true' />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
              <Menu.Item>
                <Link
                  to={``}
                  className='block px-3 py-1 text-sm leading-6 text-gray-900'
                >
                  View Proyecto
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  to={`/projects/${project.id}/edit`}
                  className='block px-3 py-1 text-sm leading-6 text-gray-900'
                >
                  Edit Project
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  type='button'
                  className='block px-3 py-1 text-sm leading-6 text-red-500'
                  onClick={() => mutate(project.id)}
                >
                  Delete Project
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default ProjectCard;
