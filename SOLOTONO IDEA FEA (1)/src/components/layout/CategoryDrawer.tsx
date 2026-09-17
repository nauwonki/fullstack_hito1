import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Chip,
  Badge,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TuneIcon from '@mui/icons-material/Tune';
import { categoriesData } from '../../data/categories';
import { instrumentsData } from '../../data/instruments';

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelectCategoryFilter?: (filter: { root?: string; sub?: string; type?: string }) => void;
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  open,
  onClose,
  onSelectCategoryFilter,
}) => {
  const navigate = useNavigate();

  // State to track expanded nodes
  const [openRoots, setOpenRoots] = useState<Record<string, boolean>>({
    'cat-cuerda': true, // open Cuerda by default
  });
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({
    'sub-guitarra': true, // open Guitarra by default
  });

  const toggleRoot = (id: string) => {
    setOpenRoots((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSub = (id: string) => {
    setOpenSubs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInstrumentClick = (instrumentId: string) => {
    onClose();
    navigate(`/producto/${instrumentId}`);
  };

  const handleCategoryFilter = (root: string, sub?: string, type?: string) => {
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter({ root, sub, type });
    }
    onClose();
    navigate('/');
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: 320, sm: 380 },
            backgroundColor: '#0e1219',
            color: '#f3f4f6',
            borderRight: '1px solid #222938',
          },
        },
      }}
    >
      {/* Header del Drawer */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #222938',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TuneIcon sx={{ color: '#1cba5e' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#f3f4f6' }}>
            Explorar Categorías
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#9ca3af' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Subtítulo instructivo */}
      <Box sx={{ px: 2.5, py: 1.5, bgcolor: '#141822', borderBottom: '1px solid #1e2433' }}>
        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
          Haz clic en cualquier categoría para filtrar la Home, o expande para ver instrumentos específicos.
        </Typography>
      </Box>

      {/* Árbol Navegable */}
      <List component="nav" sx={{ p: 1 }}>
        {categoriesData.map((category) => {
          const isRootOpen = !!openRoots[category.id];
          const countInRoot = instrumentsData.filter((i) => i.categoriaRaiz === category.nombre).length;

          return (
            <React.Fragment key={category.id}>
              {/* Nivel 1: Categoría Raíz (ej: Cuerda, Aire, Percusión) */}
              <ListItemButton
                onClick={() => toggleRoot(category.id)}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  bgcolor: isRootOpen ? 'rgba(28, 186, 94, 0.08)' : 'transparent',
                  border: isRootOpen ? '1px solid rgba(28, 186, 94, 0.2)' : '1px solid transparent',
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: '#1cba5e' }}>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {category.nombre}
                      </Typography>
                      <Chip
                        label={`${countInRoot} inst.`}
                        size="small"
                        sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#1c2433', color: '#9ca3af' }}
                      />
                    </Box>
                  }
                />
                {isRootOpen ? <ExpandLess sx={{ ml: 1 }} /> : <ExpandMore sx={{ ml: 1 }} />}
              </ListItemButton>

              {/* Botón rápido para filtrar por toda la categoría raíz */}
              <Collapse in={isRootOpen} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 4, pr: 1, pb: 0.5 }}>
                  <Typography
                    variant="caption"
                    onClick={() => handleCategoryFilter(category.nombre)}
                    sx={{
                      cursor: 'pointer',
                      color: '#1cba5e',
                      textDecoration: 'underline',
                      fontWeight: 600,
                      display: 'inline-block',
                      mb: 1,
                      '&:hover': { color: '#4ade80' },
                    }}
                  >
                    👉 Ver todos los de "{category.nombre}" en Home
                  </Typography>
                </Box>

                {/* Nivel 2: Subcategoría (ej: Guitarra, Bajo, Viento madera) */}
                <List component="div" disablePadding sx={{ pl: 2 }}>
                  {category.subcategorias.map((sub) => {
                    const isSubOpen = !!openSubs[sub.id];

                    return (
                      <React.Fragment key={sub.id}>
                        <ListItemButton
                          onClick={() => toggleSub(sub.id)}
                          sx={{
                            borderRadius: 1,
                            py: 0.6,
                            pl: 2,
                            mb: 0.3,
                            bgcolor: isSubOpen ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#e5e7eb' }}>
                                {sub.nombre}
                              </Typography>
                            }
                          />
                          {isSubOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                        </ListItemButton>

                        {/* Nivel 3: Tipos (ej: Acústica, Eléctrica, Clásica) */}
                        <Collapse in={isSubOpen} timeout="auto" unmountOnExit>
                          <List disablePadding sx={{ pl: 3 }}>
                            {sub.tipos.map((tipo) => {
                              const matchingInstruments = instrumentsData.filter(
                                (inst) =>
                                  inst.categoriaRaiz === category.nombre &&
                                  inst.subcategoria === sub.nombre &&
                                  inst.tipo === tipo.nombre
                              );

                              return (
                                <Box key={tipo.id} sx={{ mb: 1, mt: 0.5 }}>
                                  {/* Encabezado del Tipo */}
                                  <Box
                                    onClick={() => handleCategoryFilter(category.nombre, sub.nombre, tipo.nombre)}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      cursor: 'pointer',
                                      py: 0.4,
                                      px: 1,
                                      borderRadius: 1,
                                      '&:hover': { bgcolor: 'rgba(28, 186, 94, 0.12)' },
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        fontWeight: 700,
                                        color: '#38bdf8',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                      }}
                                    >
                                      • {tipo.nombre}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                      {matchingInstruments.length} items
                                    </Typography>
                                  </Box>

                                  {/* Instrumentos directos (Hojas del árbol) */}
                                  {matchingInstruments.map((inst) => (
                                    <ListItemButton
                                      key={inst.id}
                                      onClick={() => handleInstrumentClick(inst.id)}
                                      sx={{
                                        py: 0.4,
                                        pl: 2,
                                        pr: 1,
                                        borderRadius: 1,
                                        '&:hover': {
                                          bgcolor: 'rgba(28, 186, 94, 0.15)',
                                        },
                                      }}
                                    >
                                      <ListItemIcon sx={{ minWidth: 22, color: '#9ca3af' }}>
                                        <MusicNoteIcon sx={{ fontSize: 14 }} />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              color: '#d1d5db',
                                              display: 'block',
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap',
                                              fontWeight: inst.id === 'yamaha-f310' ? 700 : 400,
                                            }}
                                          >
                                            {inst.nombre}
                                          </Typography>
                                        }
                                        secondary={
                                          <Typography variant="caption" sx={{ color: '#1cba5e', fontSize: '0.7rem' }}>
                                            desde ${inst.precioBase.toLocaleString('es-CL')}
                                          </Typography>
                                        }
                                      />
                                    </ListItemButton>
                                  ))}
                                </Box>
                              );
                            })}
                          </List>
                        </Collapse>
                      </React.Fragment>
                    );
                  })}
                </List>
              </Collapse>
              <Divider sx={{ my: 1, borderColor: '#1f2636' }} />
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};
