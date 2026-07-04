import {
    Box,
    Typography,
    Divider,
} from "@mui/material";

import {
    BsQrCode,
    BsWallet2,
} from "react-icons/bs";

import {
    HiOutlineDocumentText,
} from "react-icons/hi2";
import { useTranslation } from "react-i18next";

export default function Payment() {
    const { t } = useTranslation();
    return (
        <Box className="w-full bg-white py-14 px-5">
            <Box className="max-w-[1200px] mx-auto">

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 600,
                        mb: 6,
                        fontSize: {
                            xs: "34px",
                            md: "48px",
                        },
                    }}
                >
                    {t('oplata.title')}
                </Typography>

                <Box className="grid lg:grid-cols-3 gap-12">

                    <Box className="space-y-10">

                        <Box className="flex gap-5">
                            <BsQrCode
                                size={48}
                                className="text-blue-600 mt-1"
                            />

                            <Box>
                                <Typography
                                    fontWeight={700}
                                    fontSize={22}
                                    mb={1}
                                >
                                    {t('oplata.qrTitle')}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8,
                                        fontSize: 15,
                                    }}
                                >
                                    {t('oplata.qrText')}
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="flex gap-5">
                            <BsWallet2
                                size={48}
                                className="text-blue-600 mt-1"
                            />

                            <Box>
                                <Typography
                                    fontWeight={700}
                                    fontSize={22}
                                    mb={1}
                                >
                                    {t('oplata.cashTitle')}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8,
                                        fontSize: 15,
                                    }}
                                >
                                    {t('oplata.cashText')}
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="flex gap-5">
                            <HiOutlineDocumentText
                                size={48}
                                className="text-blue-600 mt-1"
                            />

                            <Box>
                                <Typography
                                    fontWeight={700}
                                    fontSize={22}
                                    mb={1}
                                >
                                    {t('oplata.bankTitle')}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8,
                                        fontSize: 15,
                                    }}
                                >
                                    {t('oplata.bankText')}
                                </Typography>
                            </Box>
                        </Box>

                    </Box>

                    <Box
                        className="space-y-8"
                        sx={{
                            color: "#666",
                            fontSize: "15px",
                            lineHeight: 2,
                        }}
                    >
                        <Typography>
                            {t('oplata.paragraph1')}
                        </Typography>

                        <Divider />

                        <Typography>
                            {t('oplata.paragraph2')}
                        </Typography>
                    </Box>

                    <Box>

                        <Typography
                            fontWeight={700}
                            fontSize={24}
                            mb={3}
                        >
                            {t('oplata.requisitesTitle')}
                        </Typography>

                        <Box
                            sx={{
                                color: "#666",
                                lineHeight: 2.3,
                                fontSize: "15px",
                            }}
                        >
                            <Typography>{t('oplata.companyName')}</Typography>

                            <Typography>
                                {t('oplata.inn')}
                            </Typography>

                            <Typography>
                                {t('oplata.account')}
                            </Typography>

                            <Typography>
                                {t('oplata.bank')}
                            </Typography>

                            <Typography>
                                {t('oplata.corrAccount')}
                            </Typography>

                            <Typography>
                                {t('oplata.bik')}
                            </Typography>
                        </Box>

                    </Box>

                </Box>

            </Box>
        </Box>
    );
}
