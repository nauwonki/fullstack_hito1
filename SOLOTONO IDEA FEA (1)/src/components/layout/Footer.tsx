import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#0b0d12', borderTop: '1px solid #1e2433', mt: 8, py: 5 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                bgcolor: '#1cba5e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GraphicEqIcon sx={{ color: '#ffffff', fontSize: 18 }} />
            </Box>
            <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, color: '#ffffff' }}>
              SOLOTONO
            </Typography>
            <Typography variant="caption" sx={{ color: '#1cba5e', fontWeight: 700, ml: 0.5 }}>
              PROTOTIPO DEV
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
            Frontend Cotizador y Comparador de Instrumentos Musicales — Datos Mock en Local
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#1b2230', mb: 3 }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            © {new Date().getFullYear()} SOLOTONO. Ambiente de pruebas y desarrollo frontend.
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            React + Vite + TypeScript + Material UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
