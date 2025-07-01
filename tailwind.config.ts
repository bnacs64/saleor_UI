import TypographyPlugin from "@tailwindcss/typography";
import FormPlugin from "@tailwindcss/forms";
import ContainerQueriesPlugin from "@tailwindcss/container-queries";
import { type Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// Chaldal-inspired color scheme
				primary: {
					50: "#f0fdf4",
					100: "#dcfce7",
					200: "#bbf7d0",
					300: "#86efac",
					400: "#4ade80",
					500: "#00B853", // Chaldal main green
					600: "#00A04B", // Chaldal dark green
					700: "#008A3F",
					800: "#007533",
					900: "#006027",
				},
				secondary: {
					50: "#fff7ed",
					100: "#ffedd5",
					200: "#fed7aa",
					300: "#fdba74",
					400: "#fb923c",
					500: "#FF6B35", // Chaldal orange
					600: "#E55A2B",
					700: "#CC4A21",
					800: "#B23A17",
					900: "#992A0D",
				},
				accent: {
					50: "#fefce8",
					100: "#fef9c3",
					200: "#fef08a",
					300: "#fde047",
					400: "#facc15",
					500: "#eab308",
					600: "#ca8a04",
					700: "#a16207",
					800: "#854d0e",
					900: "#713f12",
				},
				// Chaldal-specific colors
				chaldal: {
					green: "#00B853",
					"green-dark": "#00A04B",
					orange: "#FF6B35",
					"gray-light": "#F8F9FA",
					"gray-medium": "#6C757D",
					"gray-dark": "#343A40",
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [TypographyPlugin, FormPlugin, ContainerQueriesPlugin],
};

export default config;
