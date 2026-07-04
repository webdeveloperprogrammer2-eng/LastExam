import image1 from "../../assets/vata.png";
import image2 from "../../assets/vata2.png";
import image3 from "../../assets/vata3.png";

import { Typography, Button } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

const bannerImages = [image1, image2, image3];

export default function Home1() {
  const { t } = useTranslation();
  const banners = t('home1.banners', { returnObjects: true });

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop={true}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <section className="bgimage w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[400px]">
            <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:flex-row lg:px-4 lg:py-10">
              <div className="w-full text-center text-white lg:w-auto lg:max-w-[500px] lg:text-left">
                <Typography
                  color="white"
                  variant="h4"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem", lg: "2.5rem" },
                    lineHeight: 1.2,
                    textAlign: { xs: "center", lg: "left" },
                  }}
                >
                  {banner.title}
                </Typography>

                <Typography
                  color="white"
                  variant="h6"
                  sx={{
                    mt: 2,
                    fontSize: { xs: "1rem", sm: "1.125rem", lg: "1.25rem" },
                    textAlign: { xs: "center", lg: "left" },
                  }}
                >
                  {banner.subtitle}
                </Typography>

                <Typography
                  color="white"
                  variant="h4"
                  sx={{
                    mt: 2,
                    fontSize: { xs: "1.25rem", sm: "1.5rem", lg: "2rem" },
                    textAlign: { xs: "center", lg: "left" },
                  }}
                >
                  {banner.price}
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    background: "#287FE8",
                    width: { xs: "100%", sm: "auto" },
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.2 },
                    "&:hover": {
                      background: "#1f6cc8",
                    },
                  }}
                >
                  {t('home1.more')}
                </Button>
              </div>

              <img
                src={bannerImages[index]}
                alt={banner.title}
                className="h-auto w-full max-w-[280px] object-contain sm:max-w-[320px] lg:max-w-[400px]"
              />
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
