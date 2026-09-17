import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  Button,
  Grid,
  Divider,
  IconButton,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useQuote } from '../context/QuoteContext';
import { DevPlaceholderImage } from '../components/common/DevPlaceholderImage';

export const QuotePage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromQuote, clearQuote, totalPrice, itemCount } = useQuote();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cotizacion-solotono-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSnackbarMessage('Cotización exportada como archivo JSON');
  };

  const handleCopySummary = () => {
    const text = items
      .map(
        (i) =>
          `• ${i.instrumentNombre} — Tienda: ${i.storeName} — $${i.storePrice.toLocaleString('es-CL')}` +
          (i.accesoriosExtra && i.accesoriosExtra.length > 0
            ? `\n   Accesorios: ` + i.accesoriosExtra.map((a) => `${a.nombre} (+$${a.precio.toLocaleString('es-CL')})`).join(', ')
            : '')
      )
      .join('\n\n');
    const fullText = `RESUMEN DE COTIZACIÓN SOLOTONO:\n\n${text}\n\nTOTAL ESTIMADO: $${totalPrice.toLocaleString('es-CL')}`;
    navigator.clipboard.writeText(fullText);
    setSnackbarMessage('Resumen copiado al portapapeles');
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 8 }}>
      {/* Botón Volver */}
      <Button
        size="small"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ color: '#9ca3af', mb: 2, '&:hover': { color: '#ffffff' } }}
      >
        Volver al Catálogo
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ReceiptLongIcon sx={{ color: '#1cba5e', fontSize: 32 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff' }}>
              Mi Cotización de Instrumentos
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              {itemCount} {itemCount === 1 ? 'artículo cotizado' : 'artículos cotizados'} con los mejores precios de tiendas especializadas
            </Typography>
          </Box>
        </Box>

        {items.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopySummary}
              sx={{ borderColor: '#2b364c', color: '#cbd5e1' }}
            >
              Copiar Resumen
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportJson}
            >
              Exportar Cotización
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={clearQuote}
              sx={{ borderColor: '#ef444455' }}
            >
              Vaciar
            </Button>
          </Box>
        )}
      </Box>

      {items.length === 0 ? (
        <Card sx={{ bgcolor: '#121620', border: '1px solid #1f2738', p: 6, textAlign: 'center' }}>
          <ReceiptLongIcon sx={{ fontSize: 64, color: '#374151', mb: 2 }} />
          <Typography variant="h5" sx={{ color: '#e5e7eb', fontWeight: 700, mb: 1 }}>
            Aún no has agregado instrumentos a tu cotización
          </Typography>
          <Typography variant="body2" sx={{ color: '#9ca3af', maxWidth: 460, mx: 'auto', mb: 3 }}>
            Navega por las categorías de cuerdas, vientos y percusión para comparar ofertas de tiendas y sumarlas aquí.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ px: 3, py: 1 }}>
            Explorar Instrumentos
          </Button>
        </Card>
      ) : (
        <Grid container spacing={4}>
          {/* Lista de Instrumentos Cotizados */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map((item) => {
                const accTotal = (item.accesoriosExtra || []).reduce((sum, a) => sum + a.precio, 0);
                const itemTotal = item.storePrice + accTotal;

                return (
                  <Card
                    key={item.id}
                    sx={{
                      bgcolor: '#131720',
                      border: '1px solid #232a3b',
                      borderRadius: 2.5,
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                      {/* Dev Placeholder Mini */}
                      <Box sx={{ width: { xs: '100%', sm: 140 }, flexShrink: 0 }}>
                        <DevPlaceholderImage
                          title={item.instrumentNombre}
                          height={100}
                          dimensionLabel="MINI"
                        />
                      </Box>

                      {/* Info */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: '#f3f4f6',
                                fontSize: '1.05rem',
                                cursor: 'pointer',
                                '&:hover': { color: '#1cba5e' },
                              }}
                              onClick={() => navigate(`/producto/${item.instrumentId}`)}
                            >
                              {item.instrumentNombre}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.5 }}>
                              <StorefrontIcon sx={{ fontSize: 16, color: '#38bdf8' }} />
                              <Typography variant="body2" sx={{ color: '#38bdf8', fontWeight: 600 }}>
                                Oferta de: {item.storeName}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                (agregado {item.addedAt})
                              </Typography>
                            </Box>
                          </Box>

                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeFromQuote(item.id)}
                            title="Eliminar de cotización"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {/* Accesorios Extra incluidos */}
                        {item.accesoriosExtra && item.accesoriosExtra.length > 0 && (
                          <Box sx={{ mt: 1.5, p: 1, bgcolor: '#0e1117', borderRadius: 1.5, border: '1px solid #1c2436' }}>
                            <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 700, display: 'block', mb: 0.5 }}>
                              Accesorios adicionales seleccionados:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                              {item.accesoriosExtra.map((acc) => (
                                <Chip
                                  key={acc.id}
                                  label={`${acc.nombre} (+$${acc.precio.toLocaleString('es-CL')})`}
                                  size="small"
                                  sx={{ bgcolor: '#1a2233', color: '#d1d5db', fontSize: '0.7rem' }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5, pt: 1, borderTop: '1px solid #1e2638' }}>
                          <Typography variant="body2" sx={{ color: '#9ca3af', mr: 1, alignSelf: 'center' }}>
                            Subtotal ítem:
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#1cba5e', fontWeight: 800 }}>
                            ${itemTotal.toLocaleString('es-CL')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Grid>

          {/* Resumen Total Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card
              sx={{
                bgcolor: '#131720',
                border: '1px solid #232a3b',
                borderRadius: 3,
                p: 3,
                position: 'sticky',
                top: 90,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6', mb: 2 }}>
                Resumen de Cotización
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                  Total de Instrumentos:
                </Typography>
                <Typography variant="body2" sx={{ color: '#f3f4f6', fontWeight: 600 }}>
                  {itemCount}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                  Ahorro estimado en tiendas:
                </Typography>
                <Typography variant="body2" sx={{ color: '#1cba5e', fontWeight: 600 }}>
                  Comparación activa
                </Typography>
              </Box>

              <Divider sx={{ borderColor: '#202738', my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  Suma Total Estimada:
                </Typography>
                <Typography variant="h4" sx={{ color: '#1cba5e', fontWeight: 800 }}>
                  ${totalPrice.toLocaleString('es-CL')}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<FileDownloadIcon />}
                onClick={handleExportJson}
                sx={{ py: 1.2, mb: 1.5, fontWeight: 700 }}
              >
                Exportar / Descargar
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<PrintIcon />}
                onClick={() => window.print()}
                sx={{ borderColor: '#2e384e', color: '#9ca3af' }}
              >
                Imprimir Cotización
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarMessage(null)} severity="success" sx={{ width: '100%', bgcolor: '#14291c', color: '#4ade80' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
