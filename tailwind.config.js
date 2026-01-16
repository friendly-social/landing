/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                accent: "rgb(var(--color-accent) / <alpha-value>)",
            },
        },
    },
};
