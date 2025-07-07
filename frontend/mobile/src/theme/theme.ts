import { MD3LightTheme } from "react-native-paper"

export const colors = {
  primaryOrange: "#FF6B35",
  primaryGreen: "#4CAF50",
  secondary: "#FFA726",
  background: "#FFFFFF",
  surface: "#F5F5F5",
  text: "#212121",
  textSecondary: "#757575",
  border: "#E0E0E0",
  error: "#F44336",
  success: "#4CAF50",
  warning: "#FF9800",
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
}

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primaryOrange,
    secondary: colors.secondary,
    surface: colors.surface,
    background: colors.background,
    onSurface: colors.text,
    onBackground: colors.text,
  },
}

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "bold" as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold" as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: "normal" as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: "normal" as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: "normal" as const,
    lineHeight: 16,
  },
}
