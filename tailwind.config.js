/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        fontFamily: {
            display: ["Inter", "system-ui", "sans-serif"],
            sans: ["Inter", "system-ui", "sans-serif"],
        },
        colors: {
            primary: "#388087",
            secondary: "#badfe7",
            tertiary: "#6fb3b8",
            background: "#f1f1f4",
        },
    },
    plugins: [],
};
