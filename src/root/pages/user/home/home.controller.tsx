import constantHelper from "@/helper/constant.helper";
import axios, { AxiosError } from "axios";
import { Service } from "./interface";



class HomeController {
  async getServices(): Promise<Service[]> {
    try {
      const response = await axios.get(`${constantHelper.url}/services/v1/all`);
      console.log("Fetched services:", response.data.data);
      return response.data.data || [];
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error("API Error:", e.message);
      } else {
        console.error("Unexpected Error:", e);
      }
      return [];
    }
  }

  async getServiceDetail(id:number): Promise<Service | null> {
    try {
      const response = await axios.get(`${constantHelper.url}/services/v1/${id}`);
      console.log("Fetched services:", response.data.data);
      return response.data.data || [];
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error("API Error:", e.message);
      } else {
        console.error("Unexpected Error:", e);
      }
      return null;
    }
  }
}

export const HomeControllerUser = new HomeController();
