import { memo } from "react";
import withLayout from '../../layouts/app-layout'

const Dashboard = memo(() => {
    return (
        <div>Hello</div>
    );
});

Dashboard.displayName = Dashboard;

export default withLayout(Dashboard)
