import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@mui/material";
import image1 from "../../assets/block1.png";
import image2 from "../../assets/block2.png";
import image3 from "../../assets/block3.png";
import image4 from "../../assets/block4.png";
import image5 from "../../assets/block5.png";
import image6 from "../../assets/block6.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const rawProducts = [
  { id: "krovlya-1", price: 2491, titleKey: "productTitleClassic", badgeKey: "badgeGift", images: image1 },
  { id: "krovlya-2", price: 3200, titleKey: "productTitleClassic", badgeKey: null, images: image2 },
  { id: "krovlya-3", price: 1345, titleKey: "productTitleClassic", badgeKey: null, images: image3 },
  { id: "krovlya-4", price: 2600, titleKey: "productTitleClassic", badgeKey: null, images: image4 },
  { id: "krovlya-5", price: 2890, titleKey: "productTitle30", badgeKey: "badgeNew", images: image5 },
  { id: "krovlya-6", price: 1980, titleKey: "productTitleFoil", badgeKey: null, images: image6 },
];

function addToCart(product, qty) {
  const cart = JSON.parse(localStorage.getItem("myCart")) || [];
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  localStorage.setItem("myCart", JSON.stringify(cart));
}

function QtyStepper({ value, onChange, t }) {
  return (
    <Box className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-1">
      <IconButton
        size="small"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="!rounded-none"
        aria-label={t('common.decreaseQty')}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <InputBase
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          onChange(Number.isNaN(v) ? 1 : Math.max(1, v));
        }}
        inputProps={{
          inputMode: "numeric",
          className: "text-center text-sm w-full",
        }}
        className="border-x border-gray-200 h-[34px] w-full"
      />
      <IconButton
        size="small"
        onClick={() => onChange(value + 1)}
        className="!rounded-none"
        aria-label={t('common.increaseQty')}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

function ProductCard({ product, onAddedToCart, t }) {
  const [qty, setQty] = useState(1);

  const title = t(`common.${product.titleKey}`);
  const badge = product.badgeKey ? t(`common.${product.badgeKey}`) : null;

  const handleAddToCart = () => {
    addToCart({ id: product.id, title, price: product.price, images: product.images }, qty);
    onAddedToCart(title);
  };

  return (
    <Card
      elevation={0}
      className="border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <Box
        className="relative w-full aspect-[4/2.9]"
        sx={{
          background: product.images
            ? `url(${product.images}) center/cover no-repeat`
            : product.gradient,
        }}
      >
        {badge && (
          <Chip
            label={badge}
            size="small"
            className="!absolute !top-2 !left-2 !bg-rose-500 !text-white !font-bold !text-[10px]"
          />
        )}
      </Box>

      <CardContent className="!p-3.5 flex flex-col gap-2.5 flex-1">
        <Typography
          variant="body2"
          className="!text-[12.5px] !leading-snug !text-gray-600 !min-h-[34px]"
        >
          {title}
        </Typography>

        <Typography variant="subtitle1" className="!font-bold !text-blue-600">
          {product.price.toLocaleString("ru-RU")} {t('common.currency')}/{t('common.unitPc')}
        </Typography>

        <Box className="flex items-center gap-1.5 mt-auto">
          <QtyStepper value={qty} onChange={setQty} t={t} />
          <IconButton
            onClick={handleAddToCart}
            className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg !w-[38px] !h-[34px] !text-white"
            aria-label={t('common.addToCart')}
          >
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ProductCarousel() {
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = useState({ open: false, title: "" });

  const handleAdded = (title) => {
    setSnackbar({ open: true, title });
  };

  return (
    <Box className="max-w-[1200px] mx-auto p-6">
      <div className="max-w-[1200px] m-auto p-[10px] flex justify-between items-center">
        <Typography variant="h5">{t('home5.heading')}</Typography>
        <Button
          sx={{ backgroundColor: "#287FE8", marginTop: "10px" }}
          variant="contained"
        >
          {t('common.viewAll')}
        </Button>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        navigation={false}
        breakpoints={{
          480: { slidesPerView: 2.2, spaceBetween: 14 },
          768: { slidesPerView: 3.2, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 18 },
        }}
        className="!pb-10"
      >
        {rawProducts.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <ProductCard product={product} onAddedToCart={handleAdded} t={t} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {t('common.addedToCart')}
        </Alert>
      </Snackbar>
    </Box>
  );
}
