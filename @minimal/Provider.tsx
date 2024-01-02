// i18n
import "@minimal/locales/i18n"

// auth
import { AuthConsumer, AuthProvider } from "@minimal/auth/context/jwt"
import MotionLazy from "@minimal/components/animate/motion-lazy"
// components
import ProgressBar from "@minimal/components/progress-bar"
import { SettingsDrawer, SettingsProvider } from "@minimal/components/settings"
import SnackbarProvider from "@minimal/components/snackbar/snackbar-provider"
// sections
import { CheckoutProvider } from "@minimal/sections/checkout/context"
// theme
import ThemeProvider from "@minimal/theme"
// ----------------------------------------------------------------------

// @mui
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

// import { AuthProvider, AuthConsumer } from '@minimal/auth/context/auth0';
// import { AuthProvider, AuthConsumer } from '@minimal/auth/context/amplify';
// import { AuthProvider, AuthConsumer } from '@minimal/auth/context/firebase';

// ----------------------------------------------------------------------

export const MinimalProvider = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SettingsProvider
        defaultSettings={{
          themeMode: "light", // 'light' | 'dark'
          themeDirection: "ltr", //  'rtl' | 'ltr'
          themeContrast: "default", // 'default' | 'bold'
          themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: "blue", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false
        }}>
        <ThemeProvider>{children}</ThemeProvider>
      </SettingsProvider>
    </LocalizationProvider>
  )
}
