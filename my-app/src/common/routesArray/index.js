import { Home } from "@mui/icons-material";
import HomePage from "../../pages/home";
import Table from "../table";

const rows = [
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

const cells = ["hello", "world", "bye", "d", "dw"];

export const routes = [
  { path: "/home", label: "Dashboard", icon: <Home />, element: <HomePage /> },
  {
    path: "/2",
    label: "Menu Item 2",
    icon: <Home />,
    element: (
      <Table
        rows={rows}
        cells={cells}
        pageCount={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        title="Example"
      />
    ),
  },
  { path: "/3", label: "Menu Item 3", icon: <Home />, element: <HomePage /> },
  { path: "/4", label: "Menu Item 4", icon: <Home />, element: <HomePage /> },
  { path: "/5", label: "Menu Item 5", icon: <Home />, element: <HomePage /> },
  { path: "/6", label: "Menu Item 6", icon: <Home />, element: <HomePage /> },
];
