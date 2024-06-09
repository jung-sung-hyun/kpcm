"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

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
  };

  return (
    selectMenuList && selectMenuList.map((data) => (
      <List
      key={data.menuId}
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', cursor: 'pointer' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data.menuLvl === "1" && (
        <ListItem sx={{ cursor: 'pointer' }} onClick={() => handleClick(data)}>
          <ListItemIcon sx={{ cursor: 'pointer' }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={data.menuNm} />
          {openItems[data.menuId] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      )}
      {data.menuLvl === "2" && (
        <Collapse in={openItems[data.upMenuId]} timeout="auto" unmountOnExit>
          <ListItem sx={{ cursor: 'pointer' }} onClick={() => handleClick(data)}>
            <ListItemIcon sx={{ cursor: 'pointer' }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={data.menuNm} />
            {!data.prgrmPath && (openItems[data.menuId] ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
        </Collapse>
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
    ))
  );
}

export default NestedList;