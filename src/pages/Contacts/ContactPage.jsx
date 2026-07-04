import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useTranslation } from 'react-i18next';

const officeCoords = [
    [52.2605, 104.2810],
    [52.2450, 104.2300],
    [52.2605, 104.2810],
    [52.2450, 104.2300],
];

const ContactPage = () => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);
    const offices = t('contacts.offices', { returnObjects: true });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>{t('contacts.title')}</h2>

            {offices.map((item, idx) => (
                <section key={idx} style={{ display: 'flex', gap: '50px', marginBottom: '60px', borderBottom: '1px solid #eee', paddingBottom: '30px' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '24px', marginBottom: '30px', fontWeight: 'bold' }}>{item.title}</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '16px' }}>
                                <span style={{ fontSize: '24px', color: '#1E90FF', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}>📞</span>
                                {item.phone}
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '16px' }}>
                                <span style={{ fontSize: '24px', color: '#1E90FF', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}>✉️</span>
                                {item.email}
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '16px' }}>
                                <span style={{ fontSize: '24px', color: '#1E90FF', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}>📍</span>
                                {item.address}
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '16px' }}>
                                <span style={{ fontSize: '24px', color: '#1E90FF', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}>🕐</span>
                                {item.hours}
                            </li>
                        </ul>
                    </div>

                    <div style={{ flex: 2, height: '400px', borderRadius: '15px', overflow: 'hidden', background: '#f0f0f0' }}>
                        {isLoaded ? (
                            <YMaps query={{ load: 'package.map', apikey: 'ВАШ_КЛЮЧ' }}>
                                <Map
                                    state={{ center: officeCoords[idx], zoom: 15 }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Placemark geometry={officeCoords[idx]} />
                                </Map>
                            </YMaps>
                        ) : (
                            <div style={{ padding: '20px' }}>{t('contacts.mapLoading')}</div>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ContactPage;
