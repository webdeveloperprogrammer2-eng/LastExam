import {
  Card,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useNavigate } from "react-router";
import { axiosRequest } from "../lib/axiosRequest";
import { setToken } from "../lib/token";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [logined, setLogined] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let data = await axiosRequest.post("auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (!data.data.token) {
        return navigate("/login");
      }

      setToken(data.data.token);
      setLogined(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLogined(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#4F46E5,#7C3AED,#06B6D4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 15px 40px rgba(0,0,0,.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={1}
        >
          {t('login.welcome')}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          {t('login.subtitle')}
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            name="email"
            label={t('login.email')}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="password"
            label={t('login.password')}
            type="password"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
              background:
                "linear-gradient(90deg,#4F46E5,#7C3AED)",
              transition: ".3s",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0px 10px 25px rgba(79,70,229,.5)",
              },
            }}
          >
            {t('login.submit')}
          </Button>
        </form>
      </Card>
    </Box>
  );
}