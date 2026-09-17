import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Instrument } from '../../types';
import { DevPlaceholderImage } from '../common/DevPlaceholderImage';

interface InstrumentCardProps {
  instrument: Instrument;
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({ instrument }) => {
  const navigate = useNavigate();

  // Find lowest price among offers
  const availableOffers = instrument.ofertas.filter((o) => o.inStock);
  const lowestPrice =
    availableOffers.length > 0
      ? Math.min(...availableOffers.map((o) => o.price))
      : instrument.precioBase;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#131720',
        borderRadius: 3,
        border: '1px solid #232a3b',
        position: 'relative',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: '#1cba5e',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/producto/${instrument.id}`)}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {/* Placeholder Dev Image */}
        <Box sx={{ p: 1.5, pb: 0 }}>
          <DevPlaceholderImage
            title={instrument.nombre}
            subtitle={`${instrument.marca} • ${instrument.tipo}`}
            height={190}
            dimensionLabel="PLACEHOLDER 400 × 250"
          />
        </Box>

        <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Breadcrumb / Chips */}
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
            <Chip
              label={instrument.categoriaRaiz}
              size="small"
              sx={{ bgcolor: '#1e2638', color: '#9ca3af', fontSize: '0.7rem', height: 20 }}
            />
            <Chip
              label={instrument.tipo}
              size="small"
              sx={{ bgcolor: '#1e2638', color: '#38bdf8', fontSize: '0.7rem', height: 20 }}
            />
            <Chip
              label={instrument.marca}
              size="small"
              sx={{ bgcolor: '#1b2d22', color: '#1cba5e', fontSize: '0.7rem', height: 20, fontWeight: 700 }}
            />
          </Box>

          {/* Nombre */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              color: '#f3f4f6',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {instrument.nombre}
          </Typography>

          {/* Descripción corta */}
          <Typography
            variant="caption"
            sx={{
              color: '#9ca3af',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4,
              flexGrow: 1,
            }}
          >
            {instrument.descripcion}
          </Typography>

          {/* Tiendas disponibles */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1 }}>
            <StorefrontIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
            <Typography variant="caption" sx={{ color: '#9ca3af' }}>
              {instrument.ofertas.length} tiendas comparadas
            </Typography>
          </Box>

          {/* Precio "desde" */}
          <Box
            sx={{
              mt: 'auto',
              pt: 1,
              borderTop: '1px solid #1f2738',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', fontSize: '0.7rem' }}>
                Precio desde
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#1cba5e',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  lineHeight: 1,
                }}
              >
                ${lowestPrice.toLocaleString('es-CL')}
              </Typography>
            </Box>

            <Button
              size="small"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
              sx={{
                color: '#38bdf8',
                fontSize: '0.75rem',
                p: 0,
                minWidth: 'auto',
                fontWeight: 700,
              }}
            >
              Comparar
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
