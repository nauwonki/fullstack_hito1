import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Divider,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';
import { instrumentsData } from '../data/instruments';
import { Accessory } from '../types';
import { DevPlaceholderImage } from '../components/common/DevPlaceholderImage';
import { StoreOffersList } from '../components/product/StoreOffersList';
import { AccessoriesSection } from '../components/product/AccessoriesSection';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);

  // Find matching instrument or fallback to Yamaha F310
  const instrument = instrumentsData.find((item) => item.id === id) || instrumentsData[0];

  const handleToggleAccessory = (acc: Accessory) => {
    setSelectedAccessories((prev) =>
      prev.some((item) => item.id === acc.id)
        ? prev.filter((item) => item.id !== acc.id)
        : [...prev, acc]
    );
  };

  if (!instrument) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Instrumento no encontrado
        </Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/')}>
          Volver a la Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2.5, mb: 8 }}>
      {/* Botón Volver y Breadcrumbs */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: '#9ca3af', '&:hover': { color: '#ffffff' } }}
        >
          Volver al Catálogo
        </Button>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" sx={{ color: '#4b5563' }} />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer', color: '#9ca3af', fontSize: '0.85rem' }}
          >
            Inicio
          </Link>
          <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            {instrument.categoriaRaiz}
          </Typography>
          <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            {instrument.subcategoria}
          </Typography>
          <Typography sx={{ color: '#1cba5e', fontWeight: 600, fontSize: '0.85rem' }}>
            {instrument.nombre}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Layout Principal de 2 Columnas */}
      <Grid container spacing={4}>
        {/* ================= COLUMNA IZQUIERDA (PRINCIPAL) ================= */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Imagen Grande Placeholder */}
          <Box sx={{ mb: 3 }}>
            <DevPlaceholderImage
              title={instrument.nombre}
              subtitle={`Marca: ${instrument.marca} | Familia: ${instrument.categoriaRaiz} > ${instrument.subcategoria}`}
              height={380}
              aspectRatio="16/9"
              dimensionLabel="DEV PLACEHOLDER 600 × 400"
            />
          </Box>

          {/* Ficha e Info Principal */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Chip
                label={instrument.marca}
                size="small"
                sx={{ bgcolor: '#1cba5e', color: '#ffffff', fontWeight: 700 }}
              />
              <Chip
                label={`${instrument.categoriaRaiz} / ${instrument.tipo}`}
                size="small"
                sx={{ bgcolor: '#1b2434', color: '#38bdf8', fontWeight: 600 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#1cba5e' }}>
                <VerifiedIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  Modelo Verificado en 4 Tiendas
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#ffffff',
                fontSize: { xs: '1.6rem', md: '2.3rem' },
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              {instrument.nombre}
            </Typography>

            <Typography variant="body1" sx={{ color: '#d1d5db', lineHeight: 1.7, fontSize: '1.05rem', mb: 3 }}>
              {instrument.descripcion}
            </Typography>

            {/* Tabla de Especificaciones Técnicas */}
            {instrument.especificaciones && (
              <Box sx={{ mt: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6', mb: 1.5 }}>
                  Especificaciones Técnicas
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    bgcolor: '#11151d',
                    border: '1px solid #1f2738',
                    borderRadius: 2,
                  }}
                >
                  <Table size="small">
                    <TableBody>
                      {Object.entries(instrument.especificaciones).map(([key, val]) => (
                        <TableRow key={key} sx={{ '&:nth-of-type(odd)': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                          <TableCell sx={{ color: '#9ca3af', fontWeight: 600, width: '35%', borderColor: '#1f2738' }}>
                            {key}
                          </TableCell>
                          <TableCell sx={{ color: '#f3f4f6', borderColor: '#1f2738' }}>{val}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            <Divider sx={{ my: 4, borderColor: '#1f2738' }} />

            {/* Sección de Accesorios y Cuerdas Relacionados */}
            <AccessoriesSection
              accessories={instrument.accesorios}
              selectedAccessories={selectedAccessories}
              onToggleAccessory={handleToggleAccessory}
            />
          </Box>
        </Grid>

        {/* ================= COLUMNA DERECHA (SIDEBAR DE COTIZACIÓN) ================= */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <StoreOffersList
            instrument={instrument}
            selectedAccessories={selectedAccessories}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
