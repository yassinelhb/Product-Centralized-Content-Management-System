/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Detail Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Websites from "views/Websites.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import UserPage from "views/User.jsx";
import UpgradeToPro from "views/Upgrade.jsx";
import Pages from "views/pages/page";
import Theme from "views/themes/theme";
import Component from "views/Component.jsx";
import register from "views/register/register.jsx"
import Login from "views/Login/Login.jsx";
import productTypes from "views/productType/productTypes";
import productSubTypes from "./views/productSubType/ProductSubTypes";
import productProperties from "./views/productProperty/productProperties";

import Ads_banner from "./views/Ads_banner/Ads_banner";
import Web from "./views/website_editor/Website";
import Users from "./views/Users/Users.jsx"
import AddProduct from "./views/product/AddProduct";
import Products from "./views/product/Products";
import CountryProducts from "./views/product/CountryProducts";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Icons,
    layout: "/admin",
    Roles: ["Administrator","Content coordinator","Content director","Sales manager","Freelancer","Content Editor"]
  },
  {
    path: "/register",
    name: "register",
    icon: "nc-icon nc-single-02",
    component: register,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/Users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/pages",
    name: "Pages",
    icon: "nc-icon nc-single-copy-04",
    component: Pages,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/themes",
    name: "Theme",
    icon: "nc-icon nc-single-copy-04",
    component: Theme,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/productTypes",
    name: "Product Types",
    icon: "nc-icon nc-single-copy-04",
    component: productTypes,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },
  {
    path: "/productSubTypes",
    name: "Product Sub-Types",
    icon: "nc-icon nc-single-copy-04",
    component: productSubTypes,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },

  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-single-copy-04",
    component: Products,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },
  {
    path: "/countryproducts",
    name: "Country Products",
    icon: "nc-icon nc-single-copy-04",
    component: CountryProducts,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },
  {
    path: "/productProperties",
    name: "Product Properties",
    icon: "nc-icon nc-single-copy-04",
    component: productProperties,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },

  {

    path: "/Websites",
    name: "Websites",
    icon: "nc-icon nc-globe",
    component: Web,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },
  {
    path: "/Ads_banner",
    name: "Ads_banner",
    icon: "nc-icon nc-calendar-60",
    component: Ads_banner,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },
  {
    path: "/component",
    name: "Component",
    icon: "nc-icon nc-tile-56",
    component: Component,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },

  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  }

];
export default routes;
