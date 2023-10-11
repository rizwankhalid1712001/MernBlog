import React from 'react';
import { Link } from 'react-router-dom';
import { authActions } from '../store';
import {
  AppBar, Typography, Toolbar, Box, Button, Tabs, Tab,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          'linear-gradient(90deg, rgba(9,113,121,1) 3%, rgba(205,110,231,1) 100%)',
      }}
    >
      <Toolbar>
        <Link to="/blogs" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h4">BlogsApp</Typography>
        </Link>
        {isLoggedIn && (
          <Box display="flex" marginLeft={'auto'} marginRight="auto">
            <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="login/"
                sx={{ margin: 1, fontWeight: 'bold', color: 'white', borderRadius: 10 }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="login/"
                sx={{ margin: 1, fontWeight: 'bold', color: 'white', borderRadius: 10 }}
              >
                SignUp
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
