import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        teal: colors.cyan,
        green: colors.emerald,
        red: colors.rose,
        purple: colors.purple,
        pink: colors.pink,
        yellow: colors.yellow,
        neutral: colors.neutral,
        sky: colors.sky,
        slate: colors.slate,
        gray: {
          50: "#F6F6F9",
          100: "#EDECF3",
          150: "#E6E3EF",
          200: "#E1DDEC",
          250: "#C9C5D5",
          300: "#b2adbe",
          400: "#918c9e",
          500: "#716c7f",
          600: "#565165",
          700: "#433e52",
          800: "#363145",
          900: "#252336",
          1000: "#1c1b2e"
        },
        blue: {
          50: "#DCEEFF",
          100: "#B4DBFF",
          200: "#85C5FE",
          300: "#4EABFE",
          400: "#2296fe",
          500: "#0084FF",
          600: "#0574e4",
          700: "#0D5DBD",
          800: "#144696",
          900: "#1D2C6C",
          1000: "#241748"
        },
        orange: {
          200: "#EB7752",
          300: "#EA6C45",
          400: "#E85C30",
          500: "#EC4815",
          600: "#DC4419",
          700: "#D04017",
          800: "#C1360F"
        }
      },
      screens: {
        "fhd": "1900px"
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        apple: "cubic-bezier(0.25,0.1,0.25,1.0)"
      },
      textDecoration: ["active"],
      zIndex: {
        "-1": "-1"
      },
      fontSize: {
        xs: ["0.875rem", "1.25rem"],
        sm: ["1rem", "1.5rem"],
        base: ["1.125rem", "1.75rem"],
        lg: ["1.25rem", "1.75rem"],
        xl: ["1.5rem", "2rem"],
        "2xl": ["1.875rem", "2.25rem"],
        "3xl": ["2.25rem", "2.5rem"],
        "4xl": ["3rem", "2.5rem"],
        "5xl": ["3.75rem", 1],
        "6xl": ["4.5rem", 1]
      },
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
        nunito: ["Nunito", ...defaultTheme.fontFamily.sans],
        lato: ["Lato", ...defaultTheme.fontFamily.sans]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: "1.125rem",
            lineHeight: 1.75,
            pre: {
              "background-color": "transparent"
            },
            "code::before": {
              content: "none" // don’t generate the pseudo-element
            },
            "code::after": {
              content: "none"
            },
            code: {
              "font-weight": 400,
              "font-size": "0.875rem",
              "line-height": "1.25rem",
              "background-color": "transparent"
            },
            a: {
              "text-decoration-line": "none"
            },
            h1: {
              fontWeight: 500,
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: 1.5
            },
            h2: {
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: 1.5
            },
            h3: {
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: 1.5
            },
            h4: {
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: 1.5
            },
            h5: {
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: 1.5
            },
            h6: {
              marginTop: "1rem",
              marginBottom: "1rem"
            },
            p: {
              // fontSize: "1.125rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              lineHeight: 1.75
            },
            ul: {
              marginTop: "0rem",
              marginBottom: "0rem"
            }
          }
        }
        // dark: {
        //   css: {
        //     color: theme("colors.gray.200"),
        //     "[class~=\"lead\"]": { color: theme("colors.gray.400") },
        //     a: { color: theme("colors.gray.100") },
        //     strong: { color: theme("colors.gray.100") },
        //     "ul > li::before": { backgroundColor: theme("colors.gray.700") },
        //     hr: { borderColor: theme("colors.gray.800") },
        //     blockquote: {
        //       color: theme("colors.gray.100"),
        //       borderLeftColor: theme("colors.gray.800")
        //     },
        //     h1: {
        //       color: theme("colors.gray.100"), marginTop: "0.5rem",
        //       marginBottom: "0.5rem"
        //     },
        //     h2: {
        //       color: theme("colors.gray.100"), marginTop: "0.5rem",
        //       marginBottom: "0.5rem"
        //     },
        //     h3: {
        //       color: theme("colors.gray.100"), marginTop: "0.5rem",
        //       marginBottom: "0.5rem"
        //     },
        //     h4: {
        //       color: theme("colors.gray.100"), marginTop: "0.5rem",
        //       marginBottom: "0.5rem"
        //     },
        //     code: {
        //       color: theme("colors.gray.100"),
        //       backgroundColor: theme("colors.gray.1000")
        //     },
        //     "a code": { color: theme("colors.gray.100") },
        //     pre: {
        //       color: theme("colors.gray.200"),
        //       backgroundColor: theme("colors.gray.900")
        //     },
        //     thead: {
        //       color: theme("colors.gray.100"),
        //       borderBottomColor: theme("colors.gray.700")
        //     },
        //     "tbody tr": { borderBottomColor: theme("colors.gray.800") }
        //   }
        // },
        // primary: {
        //   css: {
        //     color: theme("colors.gray.50"),
        //     "[class~=\"lead\"]": { color: theme("colors.gray.400") },
        //     a: { color: theme("colors.gray.100") },
        //     strong: { color: theme("colors.gray.100") },
        //     "ul > li::before": { backgroundColor: theme("colors.gray.700") },
        //     hr: { borderColor: theme("colors.gray.800") },
        //     blockquote: {
        //       color: theme("colors.gray.100"),
        //       borderLeftColor: theme("colors.gray.800")
        //     },
        //     h1: { color: theme("colors.gray.100") },
        //     h2: { color: theme("colors.gray.100") },
        //     h3: { color: theme("colors.gray.100") },
        //     h4: { color: theme("colors.gray.100") },
        //     code: {
        //       color: theme("colors.gray.100"),
        //       backgroundColor: "rgba(0,0,0,0.15)"
        //     },
        //     "a code": { color: theme("colors.gray.100") },
        //     pre: {
        //       color: theme("colors.gray.200"),
        //       backgroundColor: "rgba(0,0,0,0.15)"
        //     },
        //     thead: {
        //       color: theme("colors.gray.100"),
        //       borderBottomColor: theme("colors.gray.700")
        //     },
        //     "tbody tr": { borderBottomColor: theme("colors.gray.800") }
        //   }
        // }
      })
    }
  },
  variants: {
    extend: { typography: ["tint", "dark", "primary"] }
  },
  plugins: [require("@tailwindcss/typography")]
};
