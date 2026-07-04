import { useEffect, useState } from "react";
import { axiosRequest } from "../../lib/axiosRequest";
import { useTranslation } from "react-i18next";

import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    InputBase,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Skeleton,
    Snackbar,
    Alert,
    Pagination,
} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

function QtyStepper({ value, onChange }) {
    return (
        <Box className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-1">
            <IconButton
                size="small"
                onClick={() => onChange(Math.max(1, value - 1))}
            >
                <RemoveIcon fontSize="small" />
            </IconButton>
            <InputBase
                value={value}
                onChange={(e) =>
                    onChange(Math.max(1, Number(e.target.value) || 1))
                }
                inputProps={{ className: "text-center text-sm" }}
                className="border-x border-gray-300 h-[35px] w-[45px]"
            />
            <IconButton size="small" onClick={() => onChange(value + 1)}>
                <AddIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}

function addToCart(item, qty) {
    const cart = JSON.parse(localStorage.getItem("myCart")) || [];
    const existing = cart.find((c) => c.id === String(item.id));
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: String(item.id),
            title: item.name,
            price: item.price,
            images: item.image,
            qty,
        });
    }
    localStorage.setItem("myCart", JSON.stringify(cart));
}

function InfoModal({ item, open, onClose, t }) {
    if (!item) return null;
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "bold",
                }}
            >
                {item.name}
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                        width: "100%",
                        maxHeight: 280,
                        objectFit: "cover",
                        borderRadius: 2,
                        mb: 2,
                    }}
                />

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {item.catalogId && (
                        <Chip
                            label={t('catalog.categoryId', { id: item.catalogId })}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {item.unit && (
                        <Chip
                            label={t('catalog.unitLabel', { unit: item.unit })}
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Box>

                <Typography variant="h5" sx={{ color: "#287FE8", fontWeight: "bold", mb: 1 }}>
                    {item.price?.toLocaleString("ru-RU")} ₽/{item.unit}
                </Typography>

                {item.description && (
                    <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.7 }}>
                        {item.description}
                    </Typography>
                )}

                {!item.description && (
                    <Typography variant="body2" sx={{ color: "#888" }}>
                        {t('catalog.noDescription')}
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    {t('common.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function SkeletonCard() {
    return (
        <Card
            sx={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
            }}
            elevation={0}
        >
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" width="60%" height={30} sx={{ mt: 1 }} />
                <Skeleton variant="rectangular" height={36} sx={{ mt: 2, borderRadius: 1 }} />
            </CardContent>
        </Card>
    );
}

export default function CatalogPage() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [qty, setQty] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [snackbar, setSnackbar] = useState({ open: false, msg: "" });
    const [infoItem, setInfoItem] = useState(null);
    const LIMIT = 8;

    async function getProducts(currentPage = 1) {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosRequest.get("/products", {
                params: {
                    page: currentPage,
                    limit: LIMIT,
                },
                timeout: 10000,
            });

            const items = Array.isArray(data?.data)
                ? data.data
                : Array.isArray(data?.products)
                ? data.products
                : Array.isArray(data?.items)
                ? data.items
                : Array.isArray(data)
                ? data
                : [];

            setProducts(items);

            if (data?.total && data?.limit) {
                setTotalPages(Math.ceil(data.total / data.limit));
            } else if (data?.totalPages) {
                setTotalPages(data.totalPages);
            } else {
                setTotalPages(1);
            }
        } catch (err) {
            console.error("[CatalogPage] Failed to load /products", err);

            let msgKey = "catalog.errorLoad";

            if (err.code === "ECONNABORTED") {
                msgKey = "catalog.errorTimeout";
            } else if (err.message === "Network Error") {
                msgKey = "catalog.errorNetwork";
            } else if (err?.response?.status === 404) {
                msgKey = "catalog.error404";
            } else if (err?.response?.status === 500) {
                msgKey = "catalog.error500";
            } else if (err?.response?.status === 401 || err?.response?.status === 403) {
                msgKey = "catalog.errorAuth";
            }

            setError(t(msgKey));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts(page);
    }, [page]);

    const handleAddToCart = (item) => {
        const count = qty[item.id] || 1;
        addToCart(item, count);
        setSnackbar({ open: true, msg: t('catalog.addedToCartMsg', { name: item.name }) });
    };

    return (
        <Box className="max-w-[1200px] mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h5" fontWeight="bold">
                    {t('catalog.title')}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#287FE8", "&:hover": { backgroundColor: "#1565C0" } }}
                    onClick={() => getProducts(page)}
                >
                    {t('catalog.refresh')}
                </Button>
            </div>

            {error && (
                <Box
                    sx={{
                        p: 3,
                        mb: 3,
                        borderRadius: 2,
                        background: "#fff1f1",
                        border: "1px solid #fca5a5",
                        color: "#dc2626",
                        textAlign: "center",
                    }}
                >
                    {error}
                    <Button
                        sx={{ ml: 2 }}
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => getProducts(page)}
                    >
                        {t('catalog.retry')}
                    </Button>
                </Box>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading
                    ? Array.from({ length: LIMIT }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                    : products.map((item) => (
                        <Card
                            key={item.id}
                            elevation={0}
                            sx={{
                                borderRadius: "14px",
                                border: "1px solid #e5e7eb",
                                transition: "all .25s",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                "&:hover": {
                                    boxShadow: 6,
                                    transform: "translateY(-4px)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    aspectRatio: "4/3",
                                    background: "#f9f9f9",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                        e.target.src =
                                            "https://placehold.co/300x220?text=No+Image";
                                    }}
                                />

                                <IconButton
                                    size="small"
                                    onClick={() => setInfoItem(item)}
                                    sx={{
                                        position: "absolute",
                                        top: 6,
                                        right: 6,
                                        background: "rgba(255,255,255,0.85)",
                                        backdropFilter: "blur(4px)",
                                        "&:hover": {
                                            background: "#287FE8",
                                            color: "#fff",
                                        },
                                        transition: "all .2s",
                                    }}
                                >
                                    <InfoOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <CardContent
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    p: "12px !important",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "12.5px",
                                        color: "#555",
                                        minHeight: "38px",
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        lineHeight: 1.4,
                                        mb: 1,
                                    }}
                                >
                                    {item.name}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#287FE8",
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        mt: "auto",
                                        mb: 1,
                                    }}
                                >
                                    {item.price?.toLocaleString("ru-RU")} ₽
                                    {item.unit ? `/${item.unit}` : ""}
                                </Typography>

                                <Box className="flex items-center gap-2">
                                    <QtyStepper
                                        value={qty[item.id] || 1}
                                        onChange={(v) =>
                                            setQty((prev) => ({
                                                ...prev,
                                                [item.id]: v,
                                            }))
                                        }
                                    />
                                    <IconButton
                                        onClick={() => handleAddToCart(item)}
                                        sx={{
                                            background: "#287FE8",
                                            color: "#fff",
                                            borderRadius: "8px",
                                            width: 42,
                                            height: 36,
                                            flexShrink: 0,
                                            "&:hover": {
                                                background: "#1565C0",
                                            },
                                        }}
                                    >
                                        <ShoppingCartIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
            </div>

            {!loading && totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, v) => setPage(v)}
                        color="primary"
                        shape="rounded"
                    />
                </Box>
            )}

            {!loading && !error && products.length === 0 && (
                <Box
                    sx={{
                        textAlign: "center",
                        py: 10,
                        color: "#aaa",
                    }}
                >
                    <ShoppingCartIcon sx={{ fontSize: 70, mb: 2 }} />
                    <Typography variant="h6">{t('catalog.notFound')}</Typography>
                </Box>
            )}

            <InfoModal
                item={infoItem}
                open={Boolean(infoItem)}
                onClose={() => setInfoItem(null)}
                t={t}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={2500}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    sx={{ width: "100%" }}
                >
                    {snackbar.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
}
