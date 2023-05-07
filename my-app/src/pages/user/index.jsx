import axios from "axios";
import { useEffect, useState } from "react";
import PageHeader from "../../components/pageHeader";
import TableContent from "../../common/table";
// import { Loader } from "../../components/loader";
import EditUserDialog from "./userEdit";
import OpenUserDialog from "./userAdd";
import { toast } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import Button from "../../pages/user/userAdd/buttonAdd";

function UsersPage() {

  const authHeader = useAuthHeader();
  const [data, setData] = useState(null);
  const [query, setQuery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [onlyStringData, setOnlyStringData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openSave, setOpenSave] = useState(false);

  const columns = [
    { label: "_id", access: "_id" },
    { label: "name", access: "name" },
    { label: "Email", access: "email" },
    { label: "IsAdmin", access: "IsAdmin", type: "boolean" },
    { label: "Password", access: "password" },
  ];

  const handleEdit = (id) => {
    setEditId(id);
    setOpenEdit(true);
  };
  const handleEditClose = (ref = false) => {
    setEditId("");
    setOpenEdit(false);
    if (ref) {
      setRefresh(!refresh);
    }
  };


  const handleSave = (id) => {
    setOpenSave(true);
  };
  const handleSaveClose = (ref = false) => {
    setOpenSave(false);
    if (ref) {
      setRefresh(!refresh);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/user/${id}`,
          { headers: { Authorization: authHeader() } }
        )
        .then((response) => {
          response.data.success && toast.success("Confirmation Delete!");
          setRefresh(!refresh);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ooops --Something went wrong during the Delete!");
        });
    }
  };
  
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: { Authorization: authHeader() },
      })
      .then((response) => {
        setData(response.data.message);
        setOnlyStringData(response.data.message.docs);
        console.log(response);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, query, refresh]);
  const handleConfirmationChange = (value, id) => {
    console.log("value: " + value + "id: " + id);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/user/conf/${id}`,
        {
          IsAdmin: value,
        },
        { headers: { Authorization: authHeader() } }
      )
      .then((response) => {
        response.data.success && toast.success("Confirmation Updated!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong");
      });
  };
  return (
    <>
      <PageHeader label="Users" setSearchQuery={setQuery} />
      <Button onClick={() => handleSave()}>
            </Button>
      <TableContent
        rows={onlyStringData}
        columns={columns}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={data?.totalPages || null}
        isLoading={isLoading}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleConfirmationChange={handleConfirmationChange}
      />
      <EditUserDialog
        open={openEdit}
        onClose={handleEditClose}
        UserId={editId}
      />
       <OpenUserDialog
        open={openSave}
        onClose={handleSaveClose}
      />
    </>
  );
}

export default UsersPage;
