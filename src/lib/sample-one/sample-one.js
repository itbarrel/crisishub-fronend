import { BRAINTREE_CHECKOUT } from "../../../constants/api-endpoints";
import ApiService, { api } from "../../../services/api.config";
import { log } from "../../../utils/console-log";

export async function braintreeCheckout(token, body) {
  try {
    await ApiService.setAuthorization(token);
    const response = await api.post(BRAINTREE_CHECKOUT, body);
    // const response = await secureapi.get(USER_PROFILE);
    log("Api call :: /me :: response", response);
    log("Api call :: /me :: response data", response.data);
    if (response?.status === 200) {
      if (response.data.status) {
        return response.data;
      } else {
        throw response;
      }
    } else {
      log("Api call :: /me :: api failed wrong or expired token", response);
      throw response;
    }
  } catch (error) {
    log("Api call :: /me :: error", error);
    throw error;
  }
}
