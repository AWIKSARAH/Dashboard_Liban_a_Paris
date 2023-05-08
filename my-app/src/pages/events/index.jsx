import axios from "axios";
import { useEffect, useState } from "react";
import PageHeader from "../../components/pageHeader";
import TableContent from "../../common/table";
// import { Loader } from "../../components/loader";
import EditEventDialog from "./eventEdit";
import { toast } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";

function EventsPage() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [onlyStringData, setOnlyStringData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [ error,setError]= useState(false);
  const columns = [
    { label: "_id", access: "_id" },
    { label: "Title", access: "title" },
    { label: "Category", access: "category" },
    { label: "Description", access: "description" },
    { label: "Location", access: "location" },
    { label: "Type", access: "type" },
    { label: "Tel", access: "tel" },
    { label: "Tags", access: "tags",type:"array" },
    { label: "Image", access: "image" },
    { label: "Start Date", access: "start_date" },
    { label: "End Date", access: "end_date" },
    { label: "Confirmation", access: "confirmation",type:"boolean" },
  ];
  function cleanAndConvertToStrings(data) {
    const cleanedData = {};
    for (const key in data) {
      if (typeof data[key] !== "undefined"||typeof data[key] !== "boolean") {
        cleanedData[key] = String(data[key]);
      }
    }
    return cleanedData;
  }
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Event?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/events/Delete/${id}`, {
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
  const authHeader=useAuthHeader()
  useEffect(() => {
    setIsLoading(true);
    axios
    .get(
        `${process.env.REACT_APP_API_URL}/events/all/all?page=${currentPage}&q=${query}`,{headers:{Authorization:authHeader()}}
      )
      .then((response) => {
        setData(response.data);
        setOnlyStringData(response.data.data.docs);
        setIsLoading(false);
      }).catch(e=>{
        console.log(e)
      setIsLoading(false);
      setError(e.response.status===404?e.response.data.message:e.message)

      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentPage, query, refresh]);
  const handleConfirmationChange = (value, id) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/events/confirm/${id}`, {
        confirmation: value,
      },{headers:{Authorization:authHeader()}})
      .then((response) => {
        response.data.success && toast.success("Confirmation Updated!");
      })
      .catch((e) => toast.error("Something went wrong"));
  };
  return (
    <>
      <PageHeader label="Events" setSearchQuery={setQuery} />
      
      <TableContent
        rows={onlyStringData}
        columns={columns}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={data?.totalPages || null}
        isLoading={isLoading}
        error={error}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleConfirmationChange={handleConfirmationChange}
      />
      <EditEventDialog
        open={openEdit}
        onClose={handleEditClose}
        eventId={editId}
      />
    </>
  );
}

export default EventsPage;
