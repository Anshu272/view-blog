import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser} = useSelector((state) => state.user)
  console.log(currentUser)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (  
    <Sidebar className="w-full md:w-64 h-full shadow-lg">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="p-4">
          <div className="flex flex-col gap-4">
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                icon={HiChartPie}
                as="div"
                className={`flex items-center justify-start rounded-lg px-4 ${
                  tab === "dash" || !tab
                    ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                icon={HiUser}
                as="div"
                label={currentUser.isAdmin?'Admin':'User'}
                className={`flex items-center justify-start rounded-lg px-4 ${
                  tab === "profile"
                    ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-200  dark:hover:bg-gray-600"
                }`}
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                icon={HiDocumentText}
                as="div"
                className={`flex items-center justify-start rounded-lg px-4 ${
                  tab === "posts"
                    ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Posts
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=users">
              <Sidebar.Item

                icon={HiOutlineUserGroup}
                as="div"
                className={`flex items-center justify-start rounded-lg px-4 ${
                  tab === "users"
                    ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Users
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                icon={HiAnnotation}
                as="div"
                className={`flex items-center justify-start rounded-lg px-4 ${
                  tab === "comments"
                    ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Comments
              </Sidebar.Item>
            </Link>
            <div className="border-t dark:border-gray-700 border-gray-300 my-4"></div>
            <Sidebar.Item
              icon={HiArrowSmRight}
              className="flex items-center justify-start cursor-pointer rounded-lg px-4 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Sign Out
            </Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
