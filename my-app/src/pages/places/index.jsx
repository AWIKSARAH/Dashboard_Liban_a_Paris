import axios from "axios";
import { useEffect, useState } from "react";
import PageHeader from "../../components/pageHeader";
import TableContent from "../../common/table";
// import { Loader } from "../../components/loader";
import EditPlaceDialog from "./placeEdit";
import { toast } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import Button from "../../common/buttonAdd";
import OpenPlaceDialog from './placeAdd'
function PlacesPage() {
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
    { label: "Title", access: "title" },
    { label: "Email", access: "email" },
    { label: "Description", access: "description" },
    { label: "Location", access: "location" },
    { label: "Type", access: "placeType" },
    { label: "Tel", access: "tel" },
    { label: "Tags", access: "tags", type: "array" },
    { label: "Confirmation", access: "confirmation", type: "boolean" },
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

  const handleSaveClose = (ref = false) => {
    setOpenSave(false);
    if (ref) {
      setRefresh(!refresh);
    }
  };
  const handleSave = () => {
    setOpenSave(true);
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/places/all/all?page=${currentPage}&title=${query}`,
        { headers: { Authorization: authHeader() } }
      )
      .then((response) => {
        setData(response.data);
        setOnlyStringData(response.data.docs);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, query, refresh]);
  const handleConfirmationChange = (value, id) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/places/confirm/${id}`,
        {
          confirmation: value,
        },
        { headers: { Authorization: authHeader() } }
      )
      .then((response) => {
        response.data.success && toast.success("Confirmation Updated!");
      })
      .catch((e) => toast.error("Something went wrong"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/places/${id}`, {
          headers: { Authorization: authHeader() },
        })
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

  return (
    <>
      <PageHeader label="Places" setSearchQuery={setQuery} />
      <Button onClick={() => handleSave()}></Button>
      <TableContent
        rows={onlyStringData}
        columns={columns}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={data?.totalPages || null}
        isLoading={isLoading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleConfirmationChange={handleConfirmationChange}
      />
      <EditPlaceDialog
        open={openEdit}
        onClose={handleEditClose}
        placeId={editId}
      />
            <OpenPlaceDialog open={openSave} onClose={handleSaveClose} />

    </>
  );
}

export default PlacesPage;
