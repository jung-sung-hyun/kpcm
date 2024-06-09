"use client";
import Link from "next/link"
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

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
  };

  return (
    selectMenuList && selectMenuList.map((data) => (
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
    ))
  );
}

export default NestedList;