"use client";
<<<<<<< HEAD
import Link from "next/link"
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
>>>>>>> f8bc43ef24249fb44a94a1f5830809baade8d01a
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
<<<<<<< HEAD

import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
=======
import InboxIcon from '@mui/icons-material/MoveToInbox';
>>>>>>> f8bc43ef24249fb44a94a1f5830809baade8d01a
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

<<<<<<< HEAD
function NestedList({ selectMenuList }) {
  console.log("===========================upMenuId");
  console.log(selectMenuList);
  console.log("===========================upMenuId");
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const handleClick = (id) => {
    setOpen(!open);
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
=======
// navigation 메뉴 목록
function NestedList({ selectMenuList, onMenuClick }) {
  console.log("===========================upMenuId", selectMenuList);
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const router = useRouter();

  const handleClick = (data) => {
    console.log("menu click: ", data.menuId);
    setOpen(!open);
    setOpenItems(prev => ({
      ...prev,
      [data.menuId]: !prev[data.menuId]
    }));

    if (data.prgrmPath) {
      onMenuClick(data.menuNm, data.prgrmPath);
    }
>>>>>>> f8bc43ef24249fb44a94a1f5830809baade8d01a
  };

  return (
    selectMenuList && selectMenuList.map((data) => (
<<<<<<< HEAD
      <List key={data.menuId}
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {data.menuLvl === "2" && (
          <ListItem button onClick={() => handleClick(data.menuId)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={data.menuNm} />
            {!data.prgrmPath && (openItems[data.menuId] ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
        )}
        {data.menuLvl === "3" && openItems[data.upMenuId] && (
          <Collapse in={openItems[data.upMenuId]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={data.menuNm} />
              </ListItem>
            </List>
          </Collapse>
        )}
      </List>
=======
      <List
      key={data.menuId}
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', cursor: 'pointer' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data.menuLvl === "2" && (
        <ListItem sx={{ cursor: 'pointer' }} onClick={() => handleClick(data)}>
          <ListItemIcon sx={{ cursor: 'pointer' }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={data.menuNm} />
          {!data.prgrmPath && (openItems[data.menuId] ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
      )}
      {data.menuLvl === "3" && openItems[data.upMenuId] && (
        <Collapse in={openItems[data.upMenuId]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4, cursor: 'pointer' }} onClick={() => handleClick(data)}>
              <ListItemIcon sx={{ cursor: 'pointer' }}>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={data.menuNm} />
            </ListItem>
          </List>
        </Collapse>
      )}
    </List>
>>>>>>> f8bc43ef24249fb44a94a1f5830809baade8d01a
    ))
  );
}

export default NestedList;