import { useState } from "react";
import image1 from "../src/assets/Group 42.png";
import Drawer from "./Drawer";
import { Outlet } from "react-router";
import {
  Typography,
  IconButton,
  Select,
  MenuItem,
  Drawer as MuiDrawer,
  Box,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PermPhoneMsgOutlinedIcon from "@mui/icons-material/PermPhoneMsgOutlined";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Logout from "./Logout";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Select
      value={i18n.resolvedLanguage || i18n.language || "ru"}
      onChange={handleChange}
      size="small"
      sx={{ minWidth: 90, height: 36 }}
    >
      <MenuItem value="ru">RU</MenuItem>
      <MenuItem value="en">EN</MenuItem>
    </Select>
  );
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bottomNavRoutes = ["/dostavka", "/Oplata", "/contacts", "/Karzinka"];
  const activeBottomValue = bottomNavRoutes.includes(location.pathname)
    ? location.pathname
    : false;

  return (
    <>
      <header className="w-[100%] border-b border-gray-200">
        <div className="flex justify-between items-center max-w-[1200px] m-auto p-[15px]">
          <NavLink to="/">
            <img src={image1} alt="Logo" className="h-[40px]" />
          </NavLink>

          <div className="lg:flex gap-[30px] items-center hidden">
            <NavLink
              to="/dostavka"
              className="text-gray-700 hover:text-[#0A61DE] transition-colors font-medium"
            >
              {t("layout.delivery")}
            </NavLink>
            <NavLink
              to="/Oplata"
              className="text-gray-700 hover:text-[#0A61DE] transition-colors font-medium"
            >
              {t("layout.payment")}
            </NavLink>
            <NavLink
              to="/contacts"
              className="text-gray-700 hover:text-[#0A61DE] transition-colors font-medium"
            >
              {t("layout.contacts")}
            </NavLink>
            <Logout />
            <Typography variant="h6" className="font-bold">
              {t("layout.phone")}
            </Typography>
            <LanguageSwitcher />
            <IconButton color="primary" aria-label="add to shopping cart">
              <ShoppingCartOutlinedIcon
                fontSize="large"
                onClick={() => navigate("Karzinka")}
              />
            </IconButton>
          </div>

          <div className="flex lg:hidden items-center gap-[8px]">
            <LanguageSwitcher />
            <IconButton
              color="primary"
              aria-label={t("layout.menu")}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </div>
        </div>

        <div className="w-[100%] bg-[#F9F9F9] p-[10px]">
          <div className="max-w-[1200px] m-auto flex justify-between items-center gap-[20px]">
            <Drawer />
            <input
              placeholder={t("layout.searchPlaceholder")}
              className="lg:w-[900px] w-[100%] h-[45px] px-[20px] rounded-full border border-gray-300 focus:outline-none focus:border-[#0A61DE] transition-all"
              type="search"
            />
          </div>
        </div>
      </header>

      <MuiDrawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              py: 2,
            }}
          >
            <Typography variant="h6" className="font-bold">
              {t("layout.phone")}
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} aria-label={t("common.close")}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
            }}
          >
            <Box onClick={() => setMobileMenuOpen(false)} sx={{ width: "100%" }}>
              <Logout />
            </Box>
          </Box>
        </Box>
      </MuiDrawer>

      <main className="min-h-[60vh] max-w-[1200px] m-auto p-[20px] pb-[90px] lg:pb-[20px]">
        <Outlet />
      </main>

      <Footer />

      <Box
        className="lg:hidden"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <BottomNavigation
          showLabels
          value={activeBottomValue}
          onChange={(event, newValue) => {
            navigate(newValue);
          }}
          sx={{ height: 68 }}
        >
          <BottomNavigationAction
            label={t("layout.delivery")}
            value="/dostavka"
            icon={<LocalShippingOutlinedIcon />}
          />
          <BottomNavigationAction
            label={t("layout.payment")}
            value="/Oplata"
            icon={<PaymentOutlinedIcon />}
          />
          <BottomNavigationAction
            label={t("layout.contacts")}
            value="/contacts"
            icon={<PermPhoneMsgOutlinedIcon />}
          />
          <BottomNavigationAction
            label={t("layout.cart")}
            value="/Karzinka"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </BottomNavigation>
      </Box>
    </>
  );
}
