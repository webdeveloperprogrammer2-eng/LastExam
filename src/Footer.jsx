import { Box, Container, Typography } from "@mui/material";
import {
  FaTelegramPlane,
  FaVk,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWarehouse,
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { BsLayersFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Box className="bg-[#1d2026] text-white py-12">
      <Container maxWidth="lg">
        <Box className="grid md:grid-cols-3 gap-12">

          <Box className="border-r border-gray-700 pr-10">
            <Box className="flex items-center gap-2 mb-8">
              <BsLayersFill className="text-[#2F80ED] text-xl" />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                {t('footer.supplier')}
              </Typography>
            </Box>

            <Typography className="mb-3 text-gray-300">
              {t('footer.phone')}
            </Typography>

            <Typography className="mb-6 text-gray-400 text-sm">
              {t('footer.email')}
            </Typography>

            <Box className="flex gap-4 text-[#2F80ED] text-xl mb-8">
              <FaTelegramPlane className="cursor-pointer hover:text-white duration-300" />
              <FaVk className="cursor-pointer hover:text-white duration-300" />
              <FaInstagram className="cursor-pointer hover:text-white duration-300" />
            </Box>

            <Typography className="text-gray-500 text-xs">
              {t('footer.copyright')}
            </Typography>
          </Box>


          <Box>
            <Typography
              sx={{
                fontWeight: "700",
                marginBottom: "30px",
              }}
            >
              {t('footer.infoTitle')}
            </Typography>

            <Box className="flex flex-col gap-5 text-gray-400 text-sm">
              <Typography>{t('footer.infoPayment')}</Typography>
              <Typography>{t('footer.infoDelivery')}</Typography>
              <Typography>
                {t('footer.infoPrivacyPolicy')}
              </Typography>
              <Typography>
                {t('footer.infoPrivacyConsent')}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: "700",
                marginBottom: "30px",
              }}
            >
              {t('footer.officeTitle')}
            </Typography>

            <Box className="flex flex-col gap-6 text-sm text-gray-400">

              <Box className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#2F80ED] mt-1" />
                <Typography>
                  {t('footer.address')}
                </Typography>
              </Box>

              <Box className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#2F80ED]" />
                <Typography>{t('footer.phone')}</Typography>
              </Box>

              <Box className="flex items-start gap-3">
                <MdAccessTime className="text-[#2F80ED] text-lg mt-1" />
                <Typography>
                  {t('footer.workHours')}
                </Typography>
              </Box>

              <Box className="flex items-center gap-3">
                <FaWarehouse className="text-[#2F80ED]" />
                <Typography>{t('footer.regionalWarehouses')}</Typography>
              </Box>

            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
