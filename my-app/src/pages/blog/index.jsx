import axios from "axios";
import { useEffect, useState } from "react";
import PageHeader from "../../components/pageHeader";
import TableContent from "../../common/table";
import EditBlogDialog from "./blogEdit";
import Button from "../../common/buttonAdd";
import OpenBlogDialog from "./blogAdd";
import { toast } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";

function BlogPage() {
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
    { label: "Description", access: "description" },
    { label: "image", access: "image" },
    { label: "tags", access: "tags", type: "array" },
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


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Blog?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/blog/${id}`, {
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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/blog?page=${currentPage}&title=${query}`
      )
      .then((response) => {
        setData(response.data.data);
        setOnlyStringData(response.data.data.docs);
          setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [currentPage, query, refresh]);

  return (
    <>
      <PageHeader label="Blog" setSearchQuery={setQuery} />
      <Button onClick={() => handleSave()}></Button>
      <TableContent
        rows={onlyStringData}
        columns={columns}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={data?.totalPages||null }
        isLoading={isLoading}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <EditBlogDialog
        open={openEdit}
        onClose={handleEditClose}
        blogId={editId}
      />
      <OpenBlogDialog open={openSave} onClose={handleSaveClose} />
    </>
  );
}

export default BlogPage;
