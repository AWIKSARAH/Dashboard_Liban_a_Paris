import { Event, Home, Message, Restaurant } from "@mui/icons-material";
import HomePage from "../../pages/home";
import PlacesPage from "../../pages/places";
import BlogPage from "../../pages/blog";
import EventsPage from "../../pages/events";



export const routes = [
  { path: "/home", label: "Dashboard", icon: <Home />, element: <HomePage /> },
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
  { path: "/4", label: "Menu Item 4", icon: <Home />, element: <HomePage /> },
  { path: "/5", label: "Menu Item 5", icon: <Home />, element: <HomePage /> },
  { path: "/6", label: "Menu Item 6", icon: <Home />, element: <HomePage /> },
];
