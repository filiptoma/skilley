import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from '@mui/material';

type Props = {
  loading?: boolean;
  pill?: boolean;
} & ButtonProps;

const Button = (props: Props) => {
  const { disabled, loading, pill, children, ...rest } = props;
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
