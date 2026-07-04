import { useEffect } from "react";
import { useNavigate } from "react-router";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useTranslation } from "react-i18next";

export default function Oformleniye() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.removeItem("myCart");
  }, []);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        }}
      >
        <CheckCircleOutlinedIcon
          sx={{
            fontSize: 90,
            color: "#0A61DE",
            mb: 3,
          }}
        />
      </div>

      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#1a1a1a",
          margin: "0 0 12px",
        }}
      >
        {t('oformleniye.successTitle')}
      </h1>

      <p
        style={{
          fontSize: "13px",
          color: "#9ca3af",
          maxWidth: 360,
          lineHeight: 1.6,
          margin: "0 0 32px",
        }}
      >
        {t('oformleniye.successText')}
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "14px 40px",
          backgroundColor: "#0A61DE",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "1px",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#1565C0")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0A61DE")}
      >
        {t('oformleniye.backHome')}
      </button>

      <style>{`
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.4); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
