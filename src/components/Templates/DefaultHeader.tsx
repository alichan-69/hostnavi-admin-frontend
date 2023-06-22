import { useRouter } from 'next/dist/client/router';
import { MouseEvent, useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer } from '@mui/material';
import {
  AiOutlineMenu,
  AiOutlineCalendar,
  AiOutlineAreaChart,
  AiOutlineHome,
  AiOutlineCheckSquare,
  AiOutlineFundView,
} from 'react-icons/ai';
import { MdOutlineMessage, MdOutlineRateReview } from 'react-icons/md';
import { RiMoneyCnyBoxLine } from 'react-icons/ri';
import { BsCardList } from 'react-icons/bs';
import { IoTodayOutline } from 'react-icons/io5';
import { BiAddToQueue } from 'react-icons/bi';
import DefaultMenu from './DefaultMenu';
import { LinkList, DefaultListItems } from './List';
import DefaultLogo from '../Parts/DefaultLogo';
import type { MenuItemsType } from '../Parts/MenuItems';
import { useAuth } from '../../hooks/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { getUser } from '../../utils/api/userUser';
import { FaRegUserCircle } from 'react-icons/fa';

// AppBarのcolorのpropにthirdlyを追加
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    thirdly: true;
  }
}

const ICON_SIZE = 24;
const items: DefaultListItems = [
  {
    text: '今日の予約一覧',
    href: '/',
    icon: <IoTodayOutline size={ICON_SIZE} />,
    isDivided: true,
    inset: false,
  },
  {
    text: '最新のメッセージ一覧',
    href: '/message/list',
    icon: <MdOutlineMessage size={ICON_SIZE} />,
    isDivided: true,
    inset: false,
  },
  {
    text: 'カレンダー',
    href: '/calender',
    icon: <AiOutlineCalendar size={ICON_SIZE} />,
    isDivided: true,
    inset: false,
  },
  {
    text: '実績',
    icon: <AiOutlineAreaChart size={ICON_SIZE} />,
    isDivided: true,
    children: [
      { icon: <MdOutlineRateReview size={ICON_SIZE} />, text: 'レビュー一覧', href: '/achievement/review/list' },
      { icon: <RiMoneyCnyBoxLine size={ICON_SIZE} />, text: '収入グラフ', href: '/achievement/income' },
      { icon: <AiOutlineFundView size={ICON_SIZE} />, text: 'ビュー数グラフ', href: '/achievement/view' },
    ],
  },
  {
    text: '宿泊施設',
    icon: <AiOutlineHome size={ICON_SIZE} />,
    isDivided: true,
    children: [
      { icon: <BsCardList size={ICON_SIZE} />, text: '宿泊施設一覧', href: '/inn/list' },
      { icon: <BiAddToQueue size={ICON_SIZE} />, text: '宿泊施設追加', href: '/inn/add' },
    ],
  },
  {
    text: '予約一覧',
    icon: <AiOutlineCheckSquare size={ICON_SIZE} />,
    href: '/reservation/list',
    isDivided: true,
    inset: false,
  },
];

const DefaultHeader = function render() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState('');

  const { userId } = useAuth();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'click' || event.type === 'keydown') {
      setIsOpen(open);
    }
  };

  const handleMenuOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClickLogOut = () => {
    Cookies.remove('X-AUTH-TOKEN');
    router.push('/auth/login');
  };

  const onClickAccount = () => {
    handleMenuClose();
    router.push('/user/myAccount');
  };

  const menuItems: MenuItemsType = [
    { label: 'アカウント', onClick: onClickAccount },
    { label: 'ログアウト', onClick: onClickLogOut },
  ];

  useEffect(() => {
    if (!userId) return;
    const getImage = async () => {
      const response = await getUser(userId);
      setIcon(response.imageUrl);
    };

    getImage();
  }, [userId]);

  return (
    <>
      <AppBar color="thirdly" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className="justify-between">
          <div className="flex">
            {userId ? (
              <IconButton onClick={toggleDrawer(true)}>
                <AiOutlineMenu size={28} />
              </IconButton>
            ) : (
              <></>
            )}
            <DefaultLogo width={245} height={50} />
          </div>
          {userId ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                {icon ? <Image src={icon} width={45} height={45} className="rounded-full" /> : <FaRegUserCircle size={28} />}
              </IconButton>
              <DefaultMenu anchorEl={anchorEl} handleClose={handleMenuClose} menuItems={menuItems} />
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <div className="mt-14">
          <LinkList items={items} />
        </div>
      </Drawer>
    </>
  );
};

export default DefaultHeader;
