import { API } from "../../backend";

export default function getAllProducts() {
  return fetch(`${API}/product/get-all-product`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
