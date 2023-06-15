import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
  useTheme,
  Box,
} from '@mui/material';

type Props = {
  variant?: 'primary' | 'secondary' | 'text';
  loading?: boolean;
  pill?: boolean;
} & Omit<ButtonProps, 'variant'>;

const Button = (props: Props) => {
  const {
    variant = 'primary',
    disabled,
    loading,
    pill,
    sx,
    color,
    children,
    ...rest
  } = props;

  const theme = useTheme();

  if (variant === 'text') {
    return (
      <Box>
        <MuiButton
          disabled={!!disabled || !!loading}
          sx={{
            ...sx,
            borderRadius: pill ? 100 : 1,
            textTransform: 'none',
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
          {...rest}
          startIcon={loading ? null : rest.startIcon}
          variant="text"
        >
          {loading ? (
            <>
              <CircularProgress
                aria-label="Načítání..."
                sx={{ mr: 1 }}
                color="inherit"
                size={14}
                thickness={6}
              />
              Načítání...
            </>
          ) : (
            children
          )}
        </MuiButton>
      </Box>
    );
  }

  return (
    <Box>
      <MuiButton
        disabled={!!disabled || !!loading}
        sx={{
          ...sx,
          borderRadius: pill ? 100 : 1,
          fontWeight: 700,
        }}
        {...rest}
        startIcon={loading ? null : rest.startIcon}
        variant="contained"
        size="large"
        color={color ?? variant}
      >
        {loading ? (
          <>
            <CircularProgress
              aria-label="Načítání..."
              sx={{ mr: 1 }}
              color="inherit"
              size={14}
              thickness={6}
            />
            Načítání...
          </>
        ) : (
          children
        )}
      </MuiButton>
    </Box>
  );
};

export default Button;
