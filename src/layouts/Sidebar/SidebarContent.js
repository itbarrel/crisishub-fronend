import React, { useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";

import { useRouter } from "next/router";
import CustomScrollbars from "../../utils/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../utils/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import { setPathName } from "../../store/slices/ui/settings";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SidebarContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { navStyle, themeType, pathname } = useSelector(({ ui }) => ui.settings);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  useEffect(() => {
    dispatch(setPathName(router.pathname));
  }, [router.pathname]);

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          {/* <AppsNavigation /> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          {/* side bar */}
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            {/* Main text */}
            <MenuItemGroup
              key="main"
              className="gx-menu-group"
              title={<IntlMessages id="sidebar.main" />}
            >
              {/* dashboard */}
              <Menu.Item key="/secure/dashboard">
                <Link href="/secure/dashboard">
                  <a>
                    <i className="icon icon-widgets" />
                    <span>
                      <IntlMessages id="dashBoard" />
                    </span>
                  </a>
                </Link>
              </Menu.Item>
            </MenuItemGroup>
            {/* settings */}
            <MenuItemGroup
              key="setting"
              className="gx-menu-group"
              title={<IntlMessages id="settings" />}
            >
              {/* Accounts */}
              <Menu.Item key="settings">
                <Link href="/secure/accounts">
                  <a>
                    <i className="icon icon-widgets" />
                    <span>
                      <IntlMessages id="accounts" />
                    </span>
                  </a>
                </Link>
              </Menu.Item>
            </MenuItemGroup>
            {/* <SubMenu
                key="dashboard"
                popupClassName={getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <i className="icon icon-dasbhoard" />
                    <span>
                      <IntlMessages id="sidebar.dashboard" />
                    </span>
                  </span>
                }
              >
                <Menu.Item key="main/dashboard/crypto">
                  <Link href="/main/dashboard/crypto">
                    <a>
                      <i className="icon icon-crypto" />
                      <span>
                        <IntlMessages id="sidebar.dashboard.crypto" />
                      </span>
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="main/dashboard/crm">
                  <Link href="/main/dashboard/crm">
                    <a>
                      <i className="icon icon-crm" />
                      <span>
                        <IntlMessages id="sidebar.dashboard.crm" />
                      </span>
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="main/dashboard/listing">
                  <Link href="/main/dashboard/listing">
                    <a>
                      <i className="icon icon-listing-dbrd" />
                      <span>
                        <IntlMessages id="sidebar.dashboard.listing" />
                      </span>
                    </a>
                  </Link>
                </Menu.Item>
              </SubMenu> */}
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
