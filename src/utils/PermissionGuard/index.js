import { useSelector } from "react-redux";
import verifyPermission from './checker'

const permissionCheck = (permissionsToChk) => {
    const { permissions } = useSelector(({ auth }) => auth);
    let granted = false

    if (permissionsToChk && Object.keys(permissionsToChk).length > 0) {
        granted = verifyPermission(permissions, permissionsToChk)

        if (granted) { return true }
        else { return false }
    } else { return false }
}

module.exports = permissionCheck
