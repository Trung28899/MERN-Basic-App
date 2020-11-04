import axios from "axios";

const url = "http://localhost:5000/products";
export const sendId = async (id, currentDate, setValue, setReturnDate) => {
  await axios.post(url, { id: id, currentDate: currentDate }).then((res) => {
    setValue(res.data);
    setReturnDate(true);
  });
};
