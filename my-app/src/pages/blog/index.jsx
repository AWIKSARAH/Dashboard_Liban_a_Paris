import axios from "axios";
import { useEffect, useState } from "react";
import PageHeader from "../../components/pageHeader";
import TableContent from "../../common/table";
// import { Loader } from "../../components/loader";
import EditBlogDialog from "./blogEdit";

function BlogPage() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [onlyStringData, setOnlyStringData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const columns = [{label:"_id",access:"_id"}, {label:"Title",access:"title"}, {label:"Description",access:"description"}, {label:"image",access:"image"}, {label:"tags",access:"tags"}];
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
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/blog?page=${currentPage}&title=${query}`
      )
      .then((response) => {
       

        setData(response.data);
        setOnlyStringData(response.data.data.docs);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [currentPage, query, refresh]);

  return (
    <>
      <PageHeader label="Places" setSearchQuery={setQuery} />
      <TableContent
        rows={onlyStringData}
        columns={columns}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={data?.totalPages || null}
        isLoading={isLoading}
        handleEdit={handleEdit}
      />
      <EditBlogDialog open={openEdit} onClose={handleEditClose} blogId={editId} />
    </>
  );
}

export default BlogPage;
