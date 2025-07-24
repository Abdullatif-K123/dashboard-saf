import { useSearchParams } from "react-router-dom";

const useActionSearchParams = ({
  idKey = "id",
  addKey = "add",
  editKey = "edit",
  removeKey = "remove",
} = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = [addKey, editKey, removeKey].includes(
    searchParams.get("mode") ?? ""
  );
  const isEdit = searchParams.get("mode") === editKey;
  const isRemove = searchParams.get("mode") === removeKey;
  const id = isEdit ? searchParams.get(idKey) : "";
  const clearActionParams = () => {
    searchParams.delete(idKey);
    searchParams.delete("mode");
    setSearchParams(searchParams);
  };
  return { id, isActive, isEdit, isRemove, clearActionParams };
};
export default useActionSearchParams;
