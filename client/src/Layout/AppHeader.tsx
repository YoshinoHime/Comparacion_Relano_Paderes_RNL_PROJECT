import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHeader } from "../context/HeaderContext";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../contexts/AuthContext";

const AppHeader = () => {
  const { isOpen, toggleUserMenu } = useHeader();
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Unexpected server error occurred during logging user out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserFullNameFormat = () => {
    if (!user) return "Guest User";

    const userData = user; 
    let fullName = `${userData.last_name}, ${userData.first_name}`;

    if (userData.middle_name) {
      fullName += ` ${userData.middle_name.charAt(0)}.`;
    }

    if (userData.suffix_name) {
      fullName += ` ${userData.suffix_name}`;
    }

    return fullName;
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={toggleUserMenu} />
      )}

      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
              </button>
              <Link to="/genders" className="flex ms-2 md:me-24">
                <img src="https://flowbite.com/images/logo.svg" className="h-8 me-3" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  My App
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3 relative">
                <button
                  type="button"
                  onClick={toggleUserMenu}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/images/people/profile-picture-5.jpg"
                    alt="user"
                  />
                </button>

                <div
                  className={`absolute right-0 top-10 min-w-[200px] z-50 ${
                    isOpen ? "block" : "hidden"
                  } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {handleUserFullNameFormat()}
                    </p>
                    <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                      {user?.username || "user@example.com"}
                    </p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {isLoading ? "Signing out..." : "Sign out"}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppHeader;