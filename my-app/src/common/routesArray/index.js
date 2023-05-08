import { Event, Home, Message, Restaurant } from "@mui/icons-material";
import HomePage from "../../pages/home";
import PlacesPage from "../../pages/places";
import BlogPage from "../../pages/blog";
import EventsPage from "../../pages/events";
import User from "../../pages/user";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AboutUs from '../../pages/about'
export const routes = [
  { path: "/home", label: "Dashboard", icon: <Home />, element: <HomePage /> },
  { path: "/about", label: "AboutUs", icon: <Home />, element: <AboutUs /> },
,
  {
    path: "/places",
    label: "Places",
    icon: <Restaurant />,
    element: <PlacesPage />,
  },
  {
    path: "/blog",
    label: "Blog",
    icon: <Message />,
    element: <BlogPage />,
  },
  {
    path: "/event",
    label: "Events",
    icon: <Event />,
    element: <EventsPage />,
  },

  {
    path: "/user",
    label: "ManageAdmin",
    icon: <AdminPanelSettingsIcon />,
    element: <User />,
  },
];
