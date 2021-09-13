import { memo } from "react";
import withLayout from '../../layouts/app-layout'
import getlanguage from "../../components/hoc/withLang";


const Dashboard = memo(() => {
    return (
        <div>Hello</div>
    );
});

Dashboard.displayName = Dashboard;

export default getlanguage(withLayout(Dashboard))
