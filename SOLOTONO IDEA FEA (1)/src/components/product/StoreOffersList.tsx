import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import { Instrument, StoreOffer, Accessory } from '../../types';
import { useQuote } from '../../context/QuoteContext';

interface StoreOffersListProps {
  instrument: Instrument;
  selectedAccessories?: Accessory[];
}

export const StoreOffersList: React.FC<StoreOffersListProps> = ({
  instrument,
  selectedAccessories = [],
}) => {
  const { addToQuote } = useQuote();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastAddedStore, setLastAddedStore] = useState<string>('');

  // Sorted offers: in stock first, then lowest price
  const sortedOffers = [...instrument.ofertas].sort((a, b) => {
    if (a.inStock && !b.inStock) return -1;
    if (!a.inStock && b.inStock) return 1;
    return a.price - b.price;
  });

  const bestOffer = sortedOffers.find((o) => o.inStock) || sortedOffers[0];

  const handleAdd = (offer: StoreOffer) => {
    addToQuote(instrument, offer, selectedAccessories);
    setLastAddedStore(offer.storeName);
    setSnackbarOpen(true);
  };

  return (
    <Card
      sx={{
        bgcolor: '#131720',
        borderRadius: 3,
        border: '1px solid #232a3b',
        position: 'sticky',
        top: 90,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Encabezado */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StorefrontIcon sx={{ color: '#1cba5e' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
              Comparar Precios
            </Typography>
          </Box>
          <Chip
            label={`${instrument.ofertas.length} tiendas`}
            size="small"
            sx={{ bgcolor: '#1e2638', color: '#9ca3af', fontWeight: 600 }}
          />
        </Box>

        {/* Precio más bajo destacado arriba */}
        {bestOffer && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(28, 186, 94, 0.1)',
              border: '1px solid rgba(28, 186, 94, 0.4)',
              mb: 2.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
              <StarIcon sx={{ color: '#1cba5e', fontSize: 18 }} />
              <Typography
                variant="caption"
                sx={{
                  color: '#1cba5e',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Mejor Oferta Disponible
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ color: '#1cba5e', fontWeight: 800, lineHeight: 1 }}>
                  ${bestOffer.price.toLocaleString('es-CL')}
                </Typography>
                <Typography variant="caption" sx={{ color: '#d1d5db', mt: 0.5, display: 'block' }}>
                  en <strong>{bestOffer.storeName}</strong>
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<AddShoppingCartIcon />}
                disabled={!bestOffer.inStock}
                onClick={() => handleAdd(bestOffer)}
                sx={{ fontWeight: 700 }}
              >
                Agregar
              </Button>
            </Box>
          </Box>
        )}

        <Typography variant="subtitle2" sx={{ color: '#9ca3af', fontWeight: 600, mb: 1.5 }}>
          Todas las tiendas analizadas:
        </Typography>

        {/* Lista de Ofertas por Tienda */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {sortedOffers.map((offer) => {
            const isBest = offer.storeId === bestOffer?.storeId;

            return (
              <Box
                key={offer.storeId}
                sx={{
                  p: 1.8,
                  borderRadius: 2,
                  bgcolor: isBest ? 'rgba(255, 255, 255, 0.03)' : '#0f1218',
                  border: isBest ? '1px solid rgba(28, 186, 94, 0.3)' : '1px solid #1e2535',
                  transition: 'border-color 0.2s',
                  '&:hover': {
                    borderColor: '#38bdf8',
                  },
                }}
              >
                {/* Tienda y Estado */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
                    {offer.storeName}
                  </Typography>

                  {offer.inStock ? (
                    <Chip
                      icon={<CheckCircleIcon sx={{ fontSize: '14px !important', color: '#1cba5e !important' }} />}
                      label="En Stock"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(28, 186, 94, 0.1)',
                        color: '#1cba5e',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        height: 22,
                      }}
                    />
                  ) : (
                    <Chip
                      icon={<CancelIcon sx={{ fontSize: '14px !important', color: '#ef4444 !important' }} />}
                      label="Agotado"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        height: 22,
                      }}
                    />
                  )}
                </Box>

                {/* Envío */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
                  <LocalShippingIcon sx={{ fontSize: 15, color: '#9ca3af' }} />
                  <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                    {offer.shipping}
                  </Typography>
                </Box>

                {/* Precio y Botones */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1, borderTop: '1px dashed #202738' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: offer.inStock ? '#ffffff' : '#6b7280' }}>
                      ${offer.price.toLocaleString('es-CL')}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<OpenInNewIcon sx={{ fontSize: 13 }} />}
                      onClick={() => alert(`[DEMO MOCK] Navegando a la oferta de ${offer.storeName} (${offer.url})`)}
                      sx={{
                        fontSize: '0.75rem',
                        color: '#9ca3af',
                        borderColor: '#2e374d',
                        '&:hover': { borderColor: '#9ca3af', color: '#ffffff' },
                      }}
                    >
                      Ver oferta
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      disabled={!offer.inStock}
                      onClick={() => handleAdd(offer)}
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      + Cotizar
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', bgcolor: '#14291c', color: '#4ade80' }}>
          ¡Instrumento cotizado con éxito con oferta de {lastAddedStore}!
        </Alert>
      </Snackbar>
    </Card>
  );
};
