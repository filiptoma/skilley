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
            borderRadius: pill ? 100 : 2,
            textTransform: 'none',
            color: theme.palette.text.primary,
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
    <MuiButton
      disabled={!!disabled || !!loading}
      sx={{
        borderRadius: pill ? 100 : 2,
      }}
      {...rest}
      startIcon={loading ? null : rest.startIcon}
      variant="contained"
      size="large"
      color={variant === 'primary' ? 'primary' : 'secondary'}
    >
      {loading ? (
        <>
          <CircularProgress
            aria-label="Načítání..."
            sx={{ mr: 1 }}
            color="inherit"
            size={14}
          />
          Načítání...
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;
