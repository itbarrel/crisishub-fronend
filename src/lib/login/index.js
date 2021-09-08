import { USER_SIGNIN } from "../../constants/api-endpoints";
import ApiService, { api } from "../../services/api/api.config";
import { log } from "../../utils/console-log";

export async function AuthLoginAPI(data) {
  try {
    const query = {
      domain: "",
      credentials: {
        // email: data.email,
        // password: data.password,
        email: "superadmin@crisishub.com",
        password: "crisishub12345",
      },
    };

    // await ApiService.setAuthorization(token);
    const response = await api.post(`${USER_SIGNIN}`, query);
    // const response = await secureapi.get(USER_PROFILE);
    log("Api call :: /Login :: response", response);
    log("Api call :: /Login :: response data", response.data);
    if (response?.status === 200) {
      if (response.data && response.data.message) {
        return response.data;
      } else {
        throw response;
      }
    } else {
      log("Api call :: /Login :: api failed wrong or expired token", response);
      throw response;
    }
  } catch (error) {
    log("Api call :: /Login :: error", error);
    throw error;
  }
}
