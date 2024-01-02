// components
import { useSettingsContext } from "@minimal/components/settings"
// locales
import { useLocales } from "@minimal/locales"
// @mui
import CssBaseline from "@mui/material/CssBaseline"
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions
} from "@mui/material/styles"
import merge from "lodash/merge"
import { useMemo } from "react"

import { customShadows } from "./custom-shadows"
import { contrast } from "./options/contrast"
import { darkMode } from "./options/dark-mode"
// options
import { presets } from "./options/presets"
import RTL, { direction } from "./options/right-to-left"
import { componentsOverrides } from "./overrides"
// system
import { palette } from "./palette"
import { shadows } from "./shadows"
import { typography } from "./typography"

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
  const { currentLang } = useLocales()

  const settings = useSettingsContext()

  const darkModeOption = darkMode(settings.themeMode)

  const presetsOption = presets(settings.themeColorPresets)

  const contrastOption = contrast(
    settings.themeContrast === "bold",
    settings.themeMode
  )

  const directionOption = direction(settings.themeDirection)

  const baseOption = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 750,
          md: 1024,
          lg: 1080,
          xl: 1920
        }
      },
      palette: palette("light"),
      shadows: shadows("light"),
      customShadows: customShadows("light"),
      typography,
      shape: { borderRadius: 8 }
    }),
    []
  )

  const memoizedValue = useMemo(
    () =>
      merge(
        // Base
        baseOption,
        // Direction: remove if not in use
        directionOption,
        // Dark mode: remove if not in use
        darkModeOption,
        // Presets: remove if not in use
        presetsOption,
        // Contrast: remove if not in use
        contrastOption.theme
      ),
    [
      baseOption,
      directionOption,
      darkModeOption,
      presetsOption,
      contrastOption.theme
    ]
  )

  const theme = createTheme(memoizedValue as ThemeOptions)

  theme.components = merge(
    componentsOverrides(theme),
    contrastOption.components
  )

  const themeWithLocale = useMemo(
    () => createTheme(theme, currentLang.systemValue),
    [currentLang.systemValue, theme]
  )

  return (
    <MuiThemeProvider theme={themeWithLocale}>
      <RTL themeDirection={settings.themeDirection}>
        <CssBaseline />
        {children}
      </RTL>
    </MuiThemeProvider>
  )
}
