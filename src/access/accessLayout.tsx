import React from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { findAllMenuByPath } from "../../config/menu";
import AccessEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";

const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const path = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const menu = findAllMenuByPath(path);
  const needAccess = menu?.access ?? AccessEnum.NOT_LOGIN;
  const canAccess = checkAccess(loginUser, needAccess);
  if (!canAccess) {
    return <Forbidden />;
  }
  return children;
};
export default AccessLayout;
