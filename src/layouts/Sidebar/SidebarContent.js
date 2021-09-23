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
import permissionCheck from "../../utils/PermissionGuard";

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

  console.log(permissionCheck({
    Accounts: ['update'],
    Accounts: ['create'],
    Users: ['update'],
    Roles: ['update'],

  }))
  const y = {
    Accounts: { update: true },
    Accounts: ['create'],
    Users: ['update'],
    Roles: ['update'],

  }

  // ['view', 'create', 'update', 'delete']

  // console.log(permissionCheck([]))

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
              <Menu.Item key={"/secure/dashboard"}>
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
            {<MenuItemGroup
              key="setting"
              className="gx-menu-group"
              title={<IntlMessages id="settings" />}
            >
              {/* Accounts */}
              {permissionCheck({ Accounts: ['view'] }) && <Menu.Item key="accounts">
                <Link href="/secure/accounts">
                  <a>
                    <i className="icon icon-crm" />
                    <span>
                      <IntlMessages id="accounts" />
                    </span>
                  </a>
                </Link>
              </Menu.Item>}

              {/* Users */}
              {permissionCheck({ Users: ['view'] }) && <Menu.Item key="users">
                <Link href="/secure/users">
                  <a>
                    <i className="icon icon-widgets" />
                    <span>
                      {/* <IntlMessages id="users" /> */}
                      Users
                    </span>
                  </a>
                </Link>
              </Menu.Item>}

              {/* roles */}
              {permissionCheck({ Roles: ['view'] }) && <Menu.Item key="roles">
                <Link href="/secure/roles">
                  <a>
                    <i className="icon icon-widgets" />
                    <span>
                      {/* <IntlMessages id="users" /> */}
                      Roles
                    </span>
                  </a>
                </Link>
              </Menu.Item>}

            </MenuItemGroup>}
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
