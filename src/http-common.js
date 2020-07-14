import axios from "axios";

export default axios.create({
  baseURL: "https://5f083b639464ba0016dd3811.mockapi.io",
  headers: {
    "Content-type": "application/json"
  }
});