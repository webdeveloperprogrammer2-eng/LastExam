import { useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Delivery() {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const zones = t('dostavka.zones', { returnObjects: true });

  return (
    <section
      className="max-w-[1200px] mx-auto px-5 py-10"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <Typography
          variant="h3"
          fontWeight={600}
          sx={{ fontSize: { xs: "30px", md: "42px" } }}
        >
          {t('dostavka.title')}
        </Typography>

        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            minHeight: "45px",

            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: "15px",
            },
          }}
        >
          <Tab label={t('dostavka.tabRules')} />
          <Tab label={t('dostavka.tabPrice')} />
        </Tabs>
      </div>

      {value === 0 && (
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <Typography fontWeight={600} mb={3}>
              {t('dostavka.rulesTitle')}
            </Typography>

            <Typography color="text.secondary" lineHeight={2}>
              {t('dostavka.rulesText1')}

              <br />
              <br />

              {t('dostavka.rulesText2')}

              <br />
              <br />

              {t('dostavka.rulesText3')}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography fontWeight={600} mb={2}>
              {t('dostavka.requiredTitle')}
            </Typography>

            <ul className="list-disc pl-5 text-gray-600 leading-8">
              <li>{t('dostavka.requiredItem1')}</li>
              <li>{t('dostavka.requiredItem2')}</li>
              <li>{t('dostavka.requiredItem3')}</li>
              <li>{t('dostavka.requiredItem4')}</li>
            </ul>

            <Divider sx={{ my: 4 }} />

            <Typography fontWeight={600} mb={2}>
              {t('dostavka.pickupTitle')}
            </Typography>

            <Typography color="text.secondary" lineHeight={2}>
              {t('dostavka.pickupText')}
            </Typography>
          </div>

          <div>
            <Typography fontWeight={600} mb={3}>
              {t('dostavka.irkutskTitle')}
            </Typography>

            <Typography color="text.secondary" lineHeight={2}>
              {t('dostavka.irkutskText')}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography fontWeight={600} mb={3}>
              {t('dostavka.russiaTitle')}
            </Typography>

            <Typography color="text.secondary" lineHeight={2}>
              {t('dostavka.russiaText')}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography fontWeight={600}>
              {t('dostavka.freeTitle')}
            </Typography>

            <Typography color="text.secondary" lineHeight={2}>
              {t('dostavka.freeText')}
            </Typography>
          </div>
        </div>
      )}


      {value === 1 && (
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <Typography fontWeight={600} mb={4}>
              {t('dostavka.priceTitle')}
            </Typography>

            {zones.map((zone, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-dashed py-3"
              >
                <Typography color="text.secondary">
                  {zone.name}
                </Typography>

                <Typography fontWeight={600}>{zone.price}</Typography>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="w-[350px] h-[350px] bg-gray-100 rounded-3xl flex items-center justify-center text-[180px] text-gray-300 font-bold">
              E
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
