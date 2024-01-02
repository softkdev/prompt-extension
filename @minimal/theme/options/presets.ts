// @mui

// theme
import { palette as themePalette } from "@minimal/theme/palette"
import { alpha } from "@mui/material/styles"

// ----------------------------------------------------------------------

export function presets(presetsColor: string) {
  const primary = primaryPresets.find((i) => i.name === presetsColor)

  const theme = {
    palette: {
      primary
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(`${primary?.main}`, 0.24)}`
    }
  }

  return theme
}

// ----------------------------------------------------------------------

const palette = themePalette("light")

export const primaryPresets = [
  // DEFAULT
  {
    name: "default",
    ...palette.primary
  },
  // CYAN
  {
    name: "cyan",
    lighter: "#CCF4FE",
    light: "#68CDF9",
    main: "#078DEE",
    dark: "#0351AB",
    darker: "#012972",
    contrastText: "#FFFFFF"
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#FFFFFF"
  },
  // BLUE
  {
    name: "blue",
    lighter: "#D1E9FC", // default: #D1E9FC
    light: "#3072B3", // default: #76B0F1
    main: "#0B66C2", // default:  #2065D1
    dark: "#004182", // default: #103996
    darker: "#002C5F", // default: #061B64
    contrastText: "#FFFFFF"
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.grey[800]
  },
  // RED
  {
    name: "red",
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#FFFFFF"
  }
]
