// import { useSelector } from "react-redux";
import { CookieService } from "../services/storage.service";

export const IsAuthenticate = () => {
    // const { isauthenticate } = useSelector(({ auth }) => auth);
    const token = CookieService.getToken();

    const validate = token ? true : false;
    return validate;
};
