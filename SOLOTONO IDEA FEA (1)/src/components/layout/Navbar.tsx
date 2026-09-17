import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Badge,
  Button,
  Container,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ClearIcon from '@mui/icons-material/Clear';
import { useQuote } from '../../context/QuoteContext';
import { useDevSettings } from '../../context/DevSettingsContext';

interface NavbarProps {
  onOpenDrawer: () => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDrawer,
  searchTerm = '',
  onSearchChange,
}) => {
  const navigate = useNavigate();
  const { itemCount } = useQuote();
  const { searchFilterEnabled } = useDevSettings();

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid #222938', zIndex: 1100 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1, gap: { xs: 1, md: 2 } }}>
          {/* Botón Menú Hamburguesa */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menú categorías"
            onClick={onOpenDrawer}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              '&:hover': { bgcolor: 'rgba(28, 186, 94, 0.15)', color: '#1cba5e' },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo SOLOTONO */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              userSelect: 'none',
              mr: { xs: 0, md: 2 },
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                bgcolor: '#1cba5e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(28, 186, 94, 0.3)',
              }}
            >
              <GraphicEqIcon sx={{ color: '#ffffff', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: '#ffffff',
                  lineHeight: 1,
                }}
              >
                SOLOTONO
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#1cba5e',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                COTIZADOR DE INSTRUMENTOS
              </Typography>
            </Box>
          </Box>

          {/* Buscador */}
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: 580,
              mx: { xs: 0.5, md: 'auto' },
            }}
          >
            <Tooltip
              title={
                searchFilterEnabled
                  ? 'Filtro en tiempo real activo (prueba buscar: yamaha, fender, bajo, etc.)'
                  : 'Modo Mock estático activo (el texto no filtra el grid)'
              }
              placement="bottom"
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#161b24',
                  border: '1px solid #283244',
                  borderRadius: 2.5,
                  px: 1.5,
                  py: 0.5,
                  transition: 'border-color 0.2s',
                  '&:focus-within': {
                    borderColor: '#1cba5e',
                    boxShadow: '0 0 0 2px rgba(28, 186, 94, 0.2)',
                  },
                }}
              >
                <SearchIcon sx={{ color: searchFilterEnabled ? '#1cba5e' : '#6b7280', mr: 1, fontSize: 20 }} />
                <InputBase
                  placeholder={
                    searchFilterEnabled
                      ? 'Buscar guitarras, bajos, saxofón, marca o tienda...'
                      : 'Buscador de instrumentos (Mock UI - Desactivado en Dev Switch)'
                  }
                  value={searchTerm}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  sx={{
                    color: '#f3f4f6',
                    width: '100%',
                    fontSize: '0.9rem',
                    '& input::placeholder': {
                      color: '#6b7280',
                      opacity: 1,
                    },
                  }}
                />
                {searchTerm && (
                  <IconButton
                    size="small"
                    onClick={() => onSearchChange && onSearchChange('')}
                    sx={{ color: '#9ca3af', p: 0.5 }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Tooltip>
          </Box>

          {/* Botón Cotización */}
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <Badge badgeContent={itemCount} color="error" overlap="circular">
                <ReceiptLongIcon />
              </Badge>
            }
            onClick={() => navigate('/cotizacion')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              borderRadius: 2,
              px: { xs: 1.2, sm: 2 },
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              whiteSpace: 'nowrap',
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Cotización
            </Box>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
