import { menus } from "../../config/menu";
import { MenuDataItem } from "@ant-design/pro-layout";
import checkAccess from "@/access/checkAccess";

const getMenuAccess = (loginUser: API.LoginUserVO, menus: MenuDataItem[]) => {
  return menus.filter((item) => {
    if (!checkAccess(loginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = getMenuAccess(loginUser, item.children);
    }
    return true;
  });
};
export default getMenuAccess;
