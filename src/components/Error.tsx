import { Alert, AlertTitle } from '@mui/material';

const Error = () => (
  <Alert severity="error">
    <AlertTitle>
      <strong>Nastala neočekávaná chyba</strong>
    </AlertTitle>
    Zkuste obnovit stránku nebo opakovat operaci. Pokud chyba přetrvává,
    kontaktujte administrátora.
  </Alert>
);

export default Error;
