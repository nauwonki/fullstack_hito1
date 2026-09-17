import React from 'react';
import { Box, Typography } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

interface DevPlaceholderImageProps {
  title: string;
  subtitle?: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  dimensionLabel?: string;
}

export const DevPlaceholderImage: React.FC<DevPlaceholderImageProps> = ({
  title,
  subtitle,
  width = '100%',
  height = '100%',
  aspectRatio = '16/10',
  dimensionLabel = '600 × 400',
}) => {
  return (
    <Box
      sx={{
        width,
        height,
        aspectRatio,
        backgroundColor: '#11151c',
        backgroundImage: `
          linear-gradient(rgba(34, 41, 56, 0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 41, 56, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        border: '1px solid #222938',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Dev tag in the corner */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'rgba(28, 186, 94, 0.1)',
          border: '1px solid #1cba5e',
          color: '#1cba5e',
          fontSize: '0.65rem',
          fontWeight: 700,
          px: 0.8,
          py: 0.2,
          borderRadius: 1,
          fontFamily: 'monospace',
        }}
      >
        DEV PLACEHOLDER
      </Box>

      {/* Center Icon */}
      <ImageNotSupportedIcon sx={{ fontSize: 44, color: '#4b5563', mb: 1 }} />

      {/* Title */}
      <Typography
        variant="subtitle2"
        sx={{
          color: '#e5e7eb',
          fontWeight: 700,
          maxWidth: '90%',
          lineHeight: 1.2,
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      {/* Subtitle / Category */}
      {subtitle && (
        <Typography variant="caption" sx={{ color: '#9ca3af', mb: 1 }}>
          {subtitle}
        </Typography>
      )}

      {/* Dimension watermark */}
      <Typography
        variant="caption"
        sx={{
          color: '#6b7280',
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          bgcolor: '#0c0e12',
          px: 1,
          py: 0.2,
          borderRadius: 0.5,
          border: '1px solid #1f2937',
        }}
      >
        {dimensionLabel}
      </Typography>
    </Box>
  );
};
