import { Home } from "@mui/icons-material";
import HomePage from "../../pages/home";
import Table from "../table";
import PlacesPage from "../../pages/places";
import BlogPage from "../../pages/blog";

export const rows = [
  {
    _id: "41",
    name: "Cupcake",
    calories: 305,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "51",
    name: "Gingerbread",
    calories: 356,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "11",
    name: "Frozen yoghurt",
    calories: 159,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "21",
    name: "Ice cream sandwich",
    calories: 237,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "41",
    name: "Cupcake",
    calories: 305,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "51",
    name: "Gingerbread",
    calories: 356,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "21",
    name: "Ice cream sandwich",
    calories: 237,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "41",
    name: "Cupcake",
    calories: 305,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "51",
    name: "Gingerbread",
    calories: 356,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "21",
    name: "Ice cream sandwich",
    calories: 237,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "41",
    name: "Cupcake",
    calories: 305,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "51",
    name: "Gingerbread",
    calories: 356,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "21",
    name: "Ice cream sandwich",
    calories: 237,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "41",
    name: "Cupcake",
    calories: 305,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "51",
    name: "Gingerbread",
    calories: 356,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "21",
    name: "Ice cream sandwich",
    calories: 237,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "41",
    name: "Cupcake",
    calories: 305,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "51",
    name: "Gingerbread",
    calories: 356,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "21",
    name: "Ice cream sandwich",
    calories: 237,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "41",
    name: "Cupcake",
    calories: 305,
    name1: "Eclair",
    calories2: 262,
  },
  {
    _id: "51",
    name: "Gingerbread",
    calories: 356,
    name1: "Eclair",
    calories2: 262,
  },
];

export const cells = ["hello", "world", "bye", "d", "dw"];

export const routes = [
  { path: "/home", label: "Dashboard", icon: <Home />, element: <HomePage /> },
  {
    path: "/places",
    label: "Places",
    icon: <Home />,
    element: (
      <PlacesPage/>
    ),
  },
  {  path: "/blog",
  label: "Blog",
  icon: <Home />,
  element: (
    <BlogPage/>
  ), },
  { path: "/4", label: "Menu Item 4", icon: <Home />, element: <HomePage /> },
  { path: "/5", label: "Menu Item 5", icon: <Home />, element: <HomePage /> },
  { path: "/6", label: "Menu Item 6", icon: <Home />, element: <HomePage /> },
];
