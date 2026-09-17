import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Checkbox,
  Chip,
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { Accessory } from '../../types';
import { DevPlaceholderImage } from '../common/DevPlaceholderImage';

interface AccessoriesSectionProps {
  accessories: Accessory[];
  selectedAccessories: Accessory[];
  onToggleAccessory: (acc: Accessory) => void;
}

export const AccessoriesSection: React.FC<AccessoriesSectionProps> = ({
  accessories,
  selectedAccessories,
  onToggleAccessory,
}) => {
  if (!accessories || accessories.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BuildIcon sx={{ color: '#1cba5e', fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
            Accesorios y Cuerdas Compatibles
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
          Selecciona para sumar a tu cotización
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {accessories.map((acc) => {
          const isSelected = selectedAccessories.some((item) => item.id === acc.id);

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={acc.id}>
              <Card
                onClick={() => onToggleAccessory(acc)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: isSelected ? 'rgba(28, 186, 94, 0.08)' : '#121620',
                  border: isSelected ? '1px solid #1cba5e' : '1px solid #202738',
                  borderRadius: 2.5,
                  p: 1.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#1cba5e',
                    bgcolor: 'rgba(28, 186, 94, 0.05)',
                  },
                }}
              >
                {/* Dev Placeholder Image */}
                <Box sx={{ mb: 1 }}>
                  <DevPlaceholderImage
                    title={acc.nombre}
                    subtitle={acc.tipo}
                    height={110}
                    dimensionLabel="ACC PLACEHOLDER"
                  />
                </Box>

                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Chip
                        label={acc.tipo}
                        size="small"
                        sx={{ bgcolor: '#1c2436', color: '#38bdf8', fontSize: '0.65rem', height: 18, mb: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: '#e5e7eb',
                          fontSize: '0.85rem',
                          lineHeight: 1.2,
                          mb: 0.5,
                        }}
                      >
                        {acc.nombre}
                      </Typography>
                      {acc.descripcion && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#9ca3af',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontSize: '0.72rem',
                          }}
                        >
                          {acc.descripcion}
                        </Typography>
                      )}
                    </Box>

                    <Checkbox
                      checked={isSelected}
                      color="primary"
                      size="small"
                      sx={{
                        p: 0.5,
                        color: '#4b5563',
                        '&.Mui-checked': { color: '#1cba5e' },
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: 1, pt: 0.8, borderTop: '1px solid #1c2333', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                      Precio estimado:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1cba5e', fontWeight: 800 }}>
                      +${acc.precio.toLocaleString('es-CL')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
