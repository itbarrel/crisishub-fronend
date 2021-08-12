
export async function forgotPassword(body) {
  try {
    const response = await api.post("FORGOT_PASSWORD", body);
    log("Api call :: /password/forgot :: response", response);
    log("Api call :: /password/forgot :: response data", response.data);
    if (response?.status === 200) {
      const {
        data: { status, data },
      } = response;
      if (status) {
        return data;
      } else {
        throw response;
      }
    } else {
      log("Api call :: / :: api failed", response);
      throw response;
    }
  } catch (error) {
    log("Api call :: / :: error", error);
    log("Api call :: / :: error.response", error?.response);
    log(
      "Api call :: /sample-one :: error.response.data",
      error?.response?.data
    );
    throw error?.response?.data;
  }
}

