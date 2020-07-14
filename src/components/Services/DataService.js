import http from "../../http-common";

class DataService {
  getRecords() {
    return http.get("/record");
  }
  
  create(data) {
    return http.post("/record", data);
  }
  delete(id) {
    return http.delete(`/record/${id}`);
  }

  edit(id) {
    return http.get(`/record/${id}`);
  }

  update(id, data) {
    return http.put(`/record/${id}`, data);
  }
}

export default new DataService();
