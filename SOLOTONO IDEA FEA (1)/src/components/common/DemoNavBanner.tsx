import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Chip,
  FormControlLabel,
  Switch,
  Container,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { useDevSettings } from '../../context/DevSettingsContext';
import { useQuote } from '../../context/QuoteContext';

export const DemoNavBanner: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchFilterEnabled, toggleSearchFilter, demoInstrumentId } = useDevSettings();
  const { itemCount } = useQuote();

  const isHome = location.pathname === '/';
  const isProduct = location.pathname.startsWith('/producto');
  const isQuote = location.pathname === '/cotizacion';

  return (
    <Box
      sx={{
        backgroundColor: '#171d15',
        borderBottom: '2px dashed #1cba5e',
        py: 1.2,
        px: 2,
        position: 'sticky',
        top: 0,
        zIndex: 1300,
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          {/* Tag de Dev / Placeholder */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={<BuildCircleIcon sx={{ color: '#1cba5e !important' }} />}
              label="DEV TESTING PANEL"
              size="small"
              sx={{
                bgcolor: 'rgba(28, 186, 94, 0.15)',
                color: '#1cba5e',
                fontWeight: 800,
                border: '1px solid #1cba5e',
                letterSpacing: '0.05em',
              }}
            />
            <Typography variant="caption" sx={{ color: '#9ca3af', display: { xs: 'none', md: 'inline' } }}>
              Navegación de prueba rápida:
            </Typography>
          </Box>

          {/* Botones Grandes Placeholder */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant={isHome ? 'contained' : 'outlined'}
              color="primary"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                fontWeight: 800,
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                py: 0.8,
                px: 2.2,
                borderWidth: 2,
                '&:hover': { borderWidth: 2 },
              }}
            >
              [ 🏠 IR A HOME ]
            </Button>

            <Button
              variant={isProduct ? 'contained' : 'outlined'}
              color="secondary"
              size="large"
              startIcon={<MusicNoteIcon />}
              onClick={() => navigate(`/producto/${demoInstrumentId}`)}
              sx={{
                fontWeight: 800,
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                py: 0.8,
                px: 2.2,
                borderWidth: 2,
                borderColor: '#38bdf8',
                color: isProduct ? '#ffffff' : '#38bdf8',
                backgroundColor: isProduct ? '#0284c7' : 'transparent',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#7dd3fc',
                  backgroundColor: isProduct ? '#0369a1' : 'rgba(56, 189, 248, 0.1)',
                },
              }}
            >
              [ 🎸 IR A PRODUCTO DE PRUEBA ]
            </Button>

            <Button
              variant={isQuote ? 'contained' : 'outlined'}
              size="large"
              startIcon={<ReceiptLongIcon />}
              onClick={() => navigate('/cotizacion')}
              sx={{
                fontWeight: 800,
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                py: 0.8,
                px: 1.8,
                borderColor: '#f59e0b',
                color: isQuote ? '#000000' : '#f59e0b',
                backgroundColor: isQuote ? '#f59e0b' : 'transparent',
                '&:hover': {
                  borderColor: '#fbbf24',
                  backgroundColor: isQuote ? '#d97706' : 'rgba(245, 158, 11, 0.1)',
                },
              }}
            >
              [ 📋 COTIZACIÓN {itemCount > 0 ? `(${itemCount})` : ''} ]
            </Button>
          </Box>

          {/* Interruptor Buscador Activo / Mock (pedido por usuario) */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={searchFilterEnabled}
                  onChange={toggleSearchFilter}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography variant="caption" sx={{ color: searchFilterEnabled ? '#1cba5e' : '#9ca3af', fontWeight: 600 }}>
                  Buscador: {searchFilterEnabled ? 'Filtro Activo' : 'Mock Estático'}
                </Typography>
              }
              sx={{ m: 0 }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
