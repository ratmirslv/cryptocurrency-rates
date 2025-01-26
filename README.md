# Cryptocurrency Rates

## Overview

Cryptocurrency Rates is a single-page application built with **React** and **TypeScript**. It fetches and displays cryptocurrency rates relative to USD using the **YouHodler API** for price data and chart visualization, and allows users to view detailed information for individual cryptocurrencies. The app integrates the **CoinGecko API** for cryptocurrency images.

<div align="center" style="margin: 30px 0;">
  <img
    width="500"
    height="300"
    src="assets/main-page.png"
    style="border-radius: 10px; margin: 0 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
    alt="Main Page"
  />
  <img
    width="500"
    height="300"
    src="assets/second-page.png"
    style="border-radius: 10px; margin: 0 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
    alt="Details Page"
  />
<br />
  <a href="https://github.com/ratmirslv/cryptocurrency-rates/actions/workflows/production.yaml">
    <img src="https://github.com/ratmirslv/cryptocurrency-rates/actions/workflows/production.yaml/badge.svg?branch=main" alt="Vercel Production Deployment" />
  </a>
</div>

## Stacks & Tools

<a target="_blank" rel="noopener noreferrer" href="https://nextjs.org"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js logo" width="50" height="50" style="max-width:100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://react.dev"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React logo" width="50" height="50" style="max-width:100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript logo" width="50" height="50" style="max-width:100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://tailwindcss.com">
<img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
</a>
<a target="_blank" rel="noopener noreferrer" href="https://tanstack.com/query/latest"><img src="https://tanstack.com/_build/assets/logo-color-600w-Er4SOkq1.png" alt="React Query logo" width="50" height="50" style="max-width:100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://zod.dev"><img src="https://zod.dev/logo.svg" alt="Zod logo" width="50" height="50" style="max-width:100%;"></a>

---

## Features

- **Cryptocurrency List Page (`/`)**

  - Displays a list of cryptocurrencies with basic details: Name, Ticker, Price, and Chart.
  - Links to detailed pages for each cryptocurrency.

- **Cryptocurrency Details Page (`/${ticker}`)**

  - Provides detailed information about the selected cryptocurrency: Rate, Ask Price, Bid Price, and 24-Hour Price Movement.
  - Fetches and displays the cryptocurrency's logo using the CoinGecko API.
  - Displays interactive charts of historical rates using data from the YouHodler API.

- **Error Handling**

  - Gracefully handles API failures and invalid data.

- **Responsive Design**
  - Ensures a seamless user experience across devices.

---

## Bonus Features

- **Filtering**: Allows users to filter the cryptocurrency list by specific criteria, improving usability and accessibility.
- **Interactive Charts**: Displays historical price trends with data from the YouHodler API.

---

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
```

2. Navigate to the project directory:

```bash
cd cryptocurrency-rates
```

3. Install dependencies:

```bash
npm install
```

---

## Scripts

### Development

Start the application in development mode:

```bash
npm run dev
```

### Build

Build the application for production:

```bash
npm run build
```

### Start

Start the production server:

```bash
npm run start
```

### Linting

Lint the codebase:

```bash
npm run lint
```

### Type Checking

Check TypeScript types:

```bash
npm run check-types
```

---

## Deployment

The application is deployed using [Vercel](https://vercel.com). For deployment, follow these steps:

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `.next` folder to your chosen hosting platform.

---

## Author

**Ratmir Aitov**
[Email](mailto:ratmirslv@gmail.com)

---

## License

This project is licensed under the MIT License.
