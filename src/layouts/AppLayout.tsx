import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"

const AppLayout = () => {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex-col flex lg:flex-row justify-between items-center">
          <div className="w-64"> 
            <Logo />
          </div>
        </div>
      </header>

      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer>
        <p className="text-center">
          {new Date().getFullYear()} - UpTask
        </p>
      </footer>
    </>
  )
}

export default AppLayout