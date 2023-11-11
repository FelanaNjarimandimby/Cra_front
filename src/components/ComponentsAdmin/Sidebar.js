import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@mui/icons-material/Menu";

const Nav = styled.div`
  background: #fff;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  background: #fff;
  margin-right: 2rem;
  font-size: 2rem;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: right;
`;

const NavIcon1 = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #6d071a;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconButton value={{ color: "#fff" }}>
        <Menu onClick={showSidebar} />

        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon1 to="#">
              <CloseIcon onClick={showSidebar} />
            </NavIcon1>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconButton>
    </>
  );
};

export default Sidebar;
