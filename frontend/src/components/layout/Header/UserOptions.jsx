import React, { useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userActions';

const UserOptions = ({ user }) => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
  ];

  if (user.role === 'admin') {
    options.unshift({
      icon: <DashboardIcon />,
      name: 'Dashboard',
      func: dashboard,
    });
  }

  function dashboard() {
    history.push('/dashboard');
  }

  function orders() {
    history.push('/orders');
  }

  function account() {
    history.push('/account');
  }

  function logoutUser() {
    dispatch(logout());
    alert.success('Logged Out Successfully');
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: '10' }} />
      <SpeedDial
        className='speedDial'
        ariaLabel='SpeedDial'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: '11' }}
        direction='down'
        icon={
          <img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : '/Profile.png'}
            alt={'profile'}
          />
        }
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
