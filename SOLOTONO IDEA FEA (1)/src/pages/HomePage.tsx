import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
  Alert,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';
import { Instrument } from '../types';
import { InstrumentCard } from '../components/product/InstrumentCard';
import { useDevSettings } from '../context/DevSettingsContext';

interface HomePageProps {
  instruments: Instrument[];
  searchTerm: string;
  activeFilter: { root?: string; sub?: string; type?: string } | null;
  onClearFilter: () => void;
  onOpenDrawer: () => void;
  onQuickFilter: (root: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  instruments,
  searchTerm,
  activeFilter,
  onClearFilter,
  onOpenDrawer,
  onQuickFilter,
}) => {
  const { searchFilterEnabled } = useDevSettings();

  // Apply filtering
  const filteredInstruments = instruments.filter((inst) => {
    // Category filter
    if (activeFilter?.root && inst.categoriaRaiz !== activeFilter.root) return false;
    if (activeFilter?.sub && inst.subcategoria !== activeFilter.sub) return false;
    if (activeFilter?.type && inst.tipo !== activeFilter.type) return false;

    // Search filter (only if enabled via dev toggle)
    if (searchFilterEnabled && searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchName = inst.nombre.toLowerCase().includes(q);
      const matchBrand = inst.marca.toLowerCase().includes(q);
      const matchCategory = inst.categoriaRaiz.toLowerCase().includes(q);
      const matchSub = inst.subcategoria.toLowerCase().includes(q);
      const matchType = inst.tipo.toLowerCase().includes(q);
      const matchStore = inst.ofertas.some((o) => o.storeName.toLowerCase().includes(q));

      return matchName || matchBrand || matchCategory || matchSub || matchType || matchStore;
    }

    return true;
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 6 }}>
      {/* Hero / Header informativo de la vista */}
      <Box
        sx={{
          p: { xs: 2.5, md: 4 },
          mb: 4,
          borderRadius: 3,
          bgcolor: '#121620',
          border: '1px solid #1f2738',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <Chip
            label="COTIZADOR Y COMPARADOR DE TIENDAS"
            size="small"
            sx={{
              bgcolor: 'rgba(28, 186, 94, 0.15)',
              color: '#1cba5e',
              fontWeight: 800,
              fontSize: '0.7rem',
              mb: 1.5,
              border: '1px solid rgba(28, 186, 94, 0.4)',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#ffffff',
              mb: 1,
              letterSpacing: '-0.02em',
              fontSize: { xs: '1.5rem', md: '2.1rem' },
            }}
          >
            Encuentra el mejor precio para tu instrumento musical
          </Typography>
          <Typography variant="body1" sx={{ color: '#9ca3af', lineHeight: 1.5, mb: 2.5 }}>
            Comparamos en tiempo real ofertas entre las principales tiendas del país para que ahorres y elijas la mejor alternativa.
          </Typography>

          {/* Filtros rápidos por Categoría Raíz */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600, mr: 0.5 }}>
              Filtrar por familia:
            </Typography>
            <Button
              size="small"
              variant={activeFilter?.root === 'Cuerda' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => onQuickFilter('Cuerda')}
              sx={{ borderRadius: 2 }}
            >
              🎸 Cuerdas
            </Button>
            <Button
              size="small"
              variant={activeFilter?.root === 'Aire' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => onQuickFilter('Aire')}
              sx={{ borderRadius: 2 }}
            >
              🎷 Vientos / Aire
            </Button>
            <Button
              size="small"
              variant={activeFilter?.root === 'Percusión' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => onQuickFilter('Percusión')}
              sx={{ borderRadius: 2 }}
            >
              🥁 Percusión
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<TuneIcon />}
              onClick={onOpenDrawer}
              sx={{ borderRadius: 2, color: '#38bdf8', borderColor: '#26425a' }}
            >
              Ver Árbol Completo
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Barra de Filtro Activo */}
      {(activeFilter || (searchTerm && searchFilterEnabled)) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            mb: 3,
            borderRadius: 2,
            bgcolor: '#161d28',
            border: '1px solid #233147',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <FilterAltIcon sx={{ color: '#1cba5e', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#e5e7eb', fontWeight: 600 }}>
              Filtro aplicado:
            </Typography>
            {activeFilter?.root && (
              <Chip
                label={`Familia: ${activeFilter.root}`}
                size="small"
                onDelete={onClearFilter}
                sx={{ bgcolor: '#1cba5e22', color: '#1cba5e', fontWeight: 700 }}
              />
            )}
            {activeFilter?.sub && (
              <Chip
                label={`Subcategoría: ${activeFilter.sub}`}
                size="small"
                sx={{ bgcolor: '#38bdf822', color: '#38bdf8', fontWeight: 700 }}
              />
            )}
            {activeFilter?.type && (
              <Chip
                label={`Tipo: ${activeFilter.type}`}
                size="small"
                sx={{ bgcolor: '#f59e0b22', color: '#f59e0b', fontWeight: 700 }}
              />
            )}
            {searchTerm && searchFilterEnabled && (
              <Chip
                label={`Búsqueda: "${searchTerm}"`}
                size="small"
                sx={{ bgcolor: '#ffffff15', color: '#ffffff', fontWeight: 600 }}
              />
            )}
          </Box>

          <Button
            size="small"
            color="inherit"
            startIcon={<ClearIcon />}
            onClick={onClearFilter}
            sx={{ color: '#9ca3af', '&:hover': { color: '#ffffff' } }}
          >
            Limpiar Filtros
          </Button>
        </Box>
      )}

      {/* Conteo de Resultados */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
          Instrumentos Destacados{' '}
          <Typography component="span" variant="body2" sx={{ color: '#9ca3af', fontWeight: 400 }}>
            ({filteredInstruments.length} instrumentos disponibles)
          </Typography>
        </Typography>
      </Box>

      {/* Grid de Cards */}
      {filteredInstruments.length > 0 ? (
        <Grid container spacing={3}>
          {filteredInstruments.map((inst) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={inst.id}>
              <InstrumentCard instrument={inst} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert
          severity="info"
          sx={{ bgcolor: '#131924', color: '#9ca3af', border: '1px solid #232d3f', borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={onClearFilter}>
              Restablecer
            </Button>
          }
        >
          No se encontraron instrumentos con los criterios de búsqueda actuales.
        </Alert>
      )}
    </Container>
  );
};
