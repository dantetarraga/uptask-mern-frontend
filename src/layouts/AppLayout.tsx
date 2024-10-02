import { Link, Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavMenu from "@/components/NavMenu"
import { ToastContainer } from "react-toastify"

const AppLayout = () => {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex-col flex lg:flex-row justify-between items-center">
          <div className="w-64"> 
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <NavMenu />
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

      <ToastContainer 
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  )
}

export default AppLayout