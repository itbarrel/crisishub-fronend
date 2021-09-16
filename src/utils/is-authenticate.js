import { useSelector } from "react-redux";
import { CookieService } from "../services/storage.service";

const IsAuthenticate = () => {
    const { isauthenticate } = useSelector(({ auth }) => auth);
    const token = CookieService.getToken();

    const validate = isauthenticate && token;
    return validate;
};

export default IsAuthenticate;
