import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Stepper(theme: Theme) {
  return {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          minHeight: theme.spacing(6),
          borderColor: theme.palette.divider,
        },
      },
    },
  };
}
