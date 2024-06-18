"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NestedList from '../../components/NestedList';
import Main from '../../app/(kpcm)/(cmsc00)/main/page';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Tabs, Tab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from "next/navigation";
import { format } from 'date-fns';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function LinkTab(props) {
  return (
    <Tab
      component="a"
      {...props}
    />
  );
}

const LayoutWrapper = ({ children }) => {
  const searchParams = useSearchParams();
  const getConnectHash = searchParams.get("connectHash");
  const currentTime = new Date().getTime();

  const [open, setOpen] = useState(true);
  const [selectMenuList, setSelectMenuList] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState('/');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [logoutTime, setLogoutTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    const now = new Date();
    localStorage.removeItem('loginTime');
    setLogoutTime(format(now, 'yyyy-MM-dd HH:mm:ss'));
    router.push('/');
  };

  const checkSessionValidity = () => {
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = new Date().getTime();
    const timeLimit = 1 * 60 * 100000;

    if (currentTime - loginTime > timeLimit) {
      handleLogout();
    }
  };

  useEffect(() => {
    const interval = setInterval(checkSessionValidity, 5 * 60 * 100000);
    return () => clearInterval(interval);
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuClick = (label, path) => {
    if (tabs.length > 10) {
      alert('최대 열람가능한 탭 개수는 10개입니다.');
      return;
    }
    if (!tabs.find(tab => tab.path === path)) {
      setTabs([...tabs, { label, path }]);
    }
    setCurrentTab(path);
    router.push(path);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    router.push(newValue);
  };

  const handleTabClose = (event, path) => {
    event.stopPropagation();
    const newTabs = tabs.filter(tab => tab.path !== path);

    if (currentTab === path) {
      const newPath = newTabs.length > 0 ? newTabs[0].path : `/main?connectHash=${getConnectHash}`;
      setCurrentTab(newPath);
      if (router.pathname !== newPath) {
        router.push(newPath);
      }
    }
    setTabs(newTabs);
  };

  async function handleSystemCommonClick(props) {
    setIsLoading(true);
    const param = { upMenuId: props, connectHash: getConnectHash };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cm/cmsc01030000/selectList00`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(param),
      body: JSON.stringify({
        upMenuId: props, connectHash: getConnectHash
      })
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log('서버 에러 코드 전송 시 실행할 부분');
        }
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
    if (!res || res === 0 || res.errMessage != null || !res.connectHash) {
      setIsLoading(false);
      return;
    }
    setSelectMenuList(res.dataList);
    setIsLoading(false);
  }

  useEffect(() => {
    setMounted(true);
    handleSystemCommonClick("00000000000000000000");
    localStorage.setItem('loginTime', currentTime);
    localStorage.setItem('connectHash', getConnectHash);
    const handleMouseMove = () => {
      localStorage.setItem('loginTime', new Date().getTime());
    };
    const handleKeyDown = (event) => {
      localStorage.setItem('loginTime', new Date().getTime());
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    mounted && (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button onClick={handleLogout} color="inherit">
              로그아웃 {logoutTime && `(${logoutTime})`}
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          {/* 메뉴목록 리스트  */}
          <NestedList selectMenuList={selectMenuList} onMenuClick={handleMenuClick} />
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Container maxWidth="lg" sx={{ mt: 8, mb: 8, ml: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', height: '100vh' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    {isLoading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Tabs
                        value={currentTab === '/' || currentTab.includes('null') || !currentTab ? 0 : currentTab}
                        onChange={handleTabChange}
                        aria-label="nav tabs example"
                      >
                        {tabs.map((tab) => (
                          <LinkTab
                            key={tab.path}
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {tab.label}
                                <CloseIcon
                                  sx={{ ml: 1 }}
                                  onClick={(event) => handleTabClose(event, tab.path)}
                                />
                              </Box>
                            }
                            value={tab.path}
                          />
                        ))}
                        <Tab disabled label={`Tabs: ${tabs.length}/15`} />
                      </Tabs>
                    )}
                    {!isLoading && (
                      <Box sx={{ padding: 2 }}>
                        {tabs.length === 0 ? (
                          <Main/>
                        ) : (
                          tabs.map(tab => (
                            <div key={tab.path} style={{ display: currentTab === tab.path ? 'block' : 'none' }}>
                              {/* 메뉴 페이지 */}
                              {children}
                            </div>
                          ))
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    )
  );
};

export default LayoutWrapper;