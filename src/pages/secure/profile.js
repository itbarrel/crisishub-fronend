import React, { memo } from "react";
import { Col, Row } from "antd";
import withLayout from "../../layouts/app-layout";
import SEO from "../../components/seo/";
import ProfileHeader from "../../components/resources/profile/profileHeader";
import About from "../../components/resources/profile/about.js";
import Contact from "../../components/resources/profile/contact.js";

const User = memo(() => {
	return (
		<>
			<ProfileHeader />
			<SEO title={"Profile"} />
			<div className="gx-profile-content">
				<Row>
					<Col xl={16} lg={14} md={14} sm={24} xs={24}>
						<About />
					</Col>

					<Col xl={8} lg={10} md={10} sm={24} xs={24}>
						<Contact />
					</Col>
				</Row>
			</div>
		</>
	);
});

User.displayName = User;
export default withLayout(User);
