import { removeToken } from "../src/lib/token";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function Logout() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function logout() {
    removeToken();
    navigate("/login");
  }

  return (
    <button
      onClick={logout}
      className="bg-[#0A61DE] text-white p-[10px] rounded"
    >
      {t('logout.button')}
    </button>
  );
}