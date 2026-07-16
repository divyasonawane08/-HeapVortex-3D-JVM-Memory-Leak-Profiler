import axios from "axios";
const API_URL = "http://localhost:8080/api/metrics";

export async function getMetrics() {

    const response = await axios.get(API_URL);

    return response.data;

}