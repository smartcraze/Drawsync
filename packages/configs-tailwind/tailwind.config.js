import { config } from "tailwindcss";

export default config({
    content: [
        "../../packages/*/src/**/*.{js,ts,jsx,tsx}",
        "../../apps/*/src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
});

