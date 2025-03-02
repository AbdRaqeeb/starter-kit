import type { Config } from "tailwindcss"
import baseConfig from "@workspace/ui/tailwind.config"

// @ts-ignore
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [baseConfig as any],
}

export default config
