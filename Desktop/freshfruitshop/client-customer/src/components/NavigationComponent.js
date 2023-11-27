import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Stack,
  Menu,
  MenuItem,
  InputBase,
} from "@mui/material";
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import withRouter from "../utils/withRouter";

const StyledMenu = styled(Menu)({
  "& .MuiList-root": {
    minWidth: "200px",
    backgroundColor: "#006f45",
  },
});

class NavigationComponent extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: "",
      anchorEl: null,
    };
  }
  handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSearchClick(); // Gọi hàm xử lý tìm kiếm khi nhấn Enter
    }
  };
  
  handleSearchClick = () => {
    // Xử lý tìm kiếm ở đây, ví dụ:
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  };

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { token, customer, mycart } = this.context;
    const { categories } = this.state;

    const cates = categories.map((item) => {
      return (
        <MenuItem key={item._id} onClick={this.handleMenuClose}>
          <Link
            to={"/product/category/" + item._id}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
              <span style={{ marginRight: "8px" }}>{item.name}</span>
            </Box>
          </Link>
        </MenuItem>
      );
    });

    return (
      <AppBar position="sticky" color="primary" sx={{ backgroundColor: "#006f45" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={this.handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleMenuClose}
            >
              {cates}
            </StyledMenu>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                component="div"
                style={{ color: "white" }}
              >
                Fresh Fruit
              </Typography>
            </Link>
          </Box>
          <div class="search_icon" style={{ display: "flex", alignItems: "center" }}>
            <IconButton color="red" onClick={this.handleSearchClick}>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search"
              value={this.state.txtKeyword}
              onChange={(e) => {
                this.setState({ txtKeyword: e.target.value });
              }}
              onKeyPress={this.handleSearchKeyPress} // Thêm sự kiện onKeyPress
            />
          </div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {token === "" ? (
              <Stack direction="row" spacing={2}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button style={{ color: "white" }}>Login</Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button style={{ color: "white" }}>Sign up</Button>
                </Link>
                <Link to="/active" style={{ textDecoration: "none" }}>
                  <Button style={{ color: "white" }}>Active</Button>
                </Link>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body1" color="inherit" component="div">
                  Hello{" "}
                  <IconButton
                    component={Link}
                    to="/myprofile"
                    color="inherit"
                    size="small"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Typography variant="subtitle1" component="span">
                    {customer?.name}
                  </Typography>
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    component={Link}
                    to="/myorders"
                    color="inherit"
                    size="small"
                  >
                    <Typography variant="body2" component="div">
                      My Orders
                    </Typography>
                  </IconButton>
                  <IconButton
                    onClick={this.handleLogoutClick}
                    color="inherit"
                    size="small"
                  >
                    <Typography variant="body2" component="div">
                      Logout
                    </Typography>
                  </IconButton>
                </Stack>
              </Stack>
            )}

            <Link to="/mycart"  style={{ textDecoration: "none",width:"40px"}}>
              <IconButton color="" class="">
                <Badge badgeContent={mycart.length} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  handleLogoutClick = () => {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
  };
}

export default withRouter(NavigationComponent);