import { memo } from "react";
import withLayout from "../../layouts/app-layout";
import Widget from "../../components/Widget";

const Dashboard = memo(() => {
	return (
		<>
			<Widget title="Dashboard">
				<h1>DashBoard</h1>
			</Widget>
		</>
	);
});

Dashboard.displayName = Dashboard;

export default withLayout(Dashboard);
