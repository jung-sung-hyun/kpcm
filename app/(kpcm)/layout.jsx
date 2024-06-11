"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
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
import NestedList from '../../components/NestedList';
import { Tabs, Tab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from "next/navigation";
import { format } from 'date-fns'; // date-fns 라이브러리를 사용하여 날짜를 포맷합니다.

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
      onClick={(event) => {
        event.preventDefault();
        props.onClick(event);
      }}
      {...props}
    />
  );
}

export default function Layout({ children }) {

  const searchParams = useSearchParams();
  const getConnectHash = searchParams.get("connectHash");
  console.log("=============handleSystemCommonClick===========getConnectHash====================");
  console.log(getConnectHash);
  const currentTime = new Date().getTime(); // 현재 시간을 밀리초로 저장

  const [open, setOpen] = useState(true);
  const [selectMenuList, setSelectMenuList] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState('/');
  const router = useRouter();
  const [logoutTime, setLogoutTime] = useState('');

  const handleLogout = () => {
    console.log("===================dd=====handleLogout====================");
    const now = new Date();
    localStorage.removeItem('loginTime'); // 로그인 시간 정보 삭제
    setLogoutTime(format(now, 'yyyy-MM-dd HH:mm:ss')); // 현재 시간을 '년-월-일 시:분:초' 형식으로 설정
    // // 로그아웃 로직을 여기에 추가
     router.push('/');
  };
  const checkSessionValidity = () => {
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = new Date().getTime();
    const timeLimit = 1 * 60 * 1000; // 30분
    // const timeLimit = 30 * 60 * 1000; // 30분

    if (currentTime - loginTime > timeLimit) {
      // 세션 시간 초과
      handleLogout(); // 로그아웃 처리 함수
    }
  };
  setInterval(checkSessionValidity, 5 * 60 * 1000); // 5분마다 검사

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuClick = (label, path) => {
    if (tabs.length >= 2) {
      alert('최대 열람가능한 탭 개수는 2개입니다.');
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
    setTabs(tabs.filter(tab => tab.path !== path));
    if (currentTab === path) {
      setCurrentTab(tabs.length > 1 ? tabs[0].path : '/');
      router.push(tabs.length > 1 ? tabs[0].path : '/');
    }
  };

  async function handleSystemCommonClick(props) {

    const param = {upMenuId:props, connectHash:getConnectHash};
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cm/cmsc01030000/selectList00`,{
      method : 'POST',
      cache:'no-store',
      headers : {
          'Content-Type' : 'application/json',
      },
      data: JSON.stringify(param),
      body : JSON.stringify({
        upMenuId : props,connectHash: getConnectHash
      })
    })
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }else {
        console.log('서버 에러 코드 전송 시 실행할 부분');
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
    if (!res ||res === 0 || res.errMessage != null || !res.connectHash) {
      console.log("========================res.errMessage=>>:{}",res.errMessage);
      return;
    }
    setSelectMenuList(res.dataList);
  }

  useEffect(() => {
    // getConnectHash가 null이면 로그인 페이지로 리디렉션
    setMounted(true);
    handleSystemCommonClick("00000000000000000000");
    //checkSessionValidity();
    localStorage.setItem('loginTime', currentTime);
    localStorage.setItem('connectHash', getConnectHash);
    const handleMouseMove = () => {
      localStorage.setItem('loginTime', new Date().getTime());//마이스움직일때 로그인시간 업데이트
      // console.log('마우스가 움직였습니다.');
    };
    const handleKeyDown = (event) => {
      localStorage.setItem('loginTime', new Date().getTime());//키보드 버튼 눌렸을때 로그인시간 업데이트
      // console.log(`키보드 버튼 '${event.key}'가 눌렸습니다.`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  return (mounted &&
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Navigation bar start */}
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
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
            로그아웃 {logoutTime && `(${logoutTime})`} {/* 로그아웃 시간 표시 */}
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
        {/* 메뉴리스트 */}
        {/* <Button onClick={() => handleSystemCommonClick("00000000000000000001")} color="inherit" sx={{ justifyContent: 'flex-start' }}>[시스템공통]</Button>
        <Button onClick={() => handleSystemCommonClick("00000000000000000003")} color="inherit" sx={{ justifyContent: 'flex-start' }}>[시스템관리]</Button> */}
        <NestedList selectMenuList={selectMenuList} onMenuClick={handleMenuClick} />
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              {/* mdi */}
              <Box sx={{ display: 'flex', height: '100vh' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Tabs
                    value={currentTab === '/' || !currentTab ? 0 : currentTab}
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
                        href={tab.path}
                        value={tab.path}
                      />
                    ))}
                    <Tab disabled label={`Tabs: ${tabs.length}/15`} />
                  </Tabs>
                  <Box sx={{ padding: 2 }}>
                    {tabs.length === 0 ? (
                      <Typography variant="h6">안녕하세요 사용자님 반갑읍니다.</Typography>
                    ) : (
                      <div key={currentTab}>
                        {children}
                      </div>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}