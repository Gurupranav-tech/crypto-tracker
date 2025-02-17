# 📊 Gurupranav Tech Crypto Tracker

A sleek and powerful cryptocurrency tracking application built with **Vite**, **React**, and **TypeScript**.

## 🚀 Features

- 📈 **Real-time cryptocurrency data**
- 🔍 **Search and filter** coins easily
- 🎨 **Dark/Light mode support**
- ⚡ **Optimized for performance** with Vite
- 💾 **Persistent settings** using local storage
- 🔄 **Dynamic currency conversion**
- 📱 **Responsive design** for all devices

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **State Management**: React Context API
- **Styling**: CSS Modules / Tailwind CSS (if applicable)
- **API**: CoinGecko (or any other crypto API)

## 📂 Project Structure

```
└── gurupranav-tech-crypto-tracker/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── public/
    └── src/
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
        ├── components/
        │   ├── Crypto.tsx
        │   ├── Filters.tsx
        │   ├── Modal.tsx
        │   ├── Navbar.tsx
        │   └── SearchBar.tsx
        ├── contexts/
        │   ├── CurrenciesContext.tsx
        │   ├── SettingsContext.tsx
        │   └── ThemeContext.tsx
        ├── hooks/
        │   ├── useLocalStorage.ts
        │   └── useScreenType.ts
        ├── lib/
        │   └── formatter.ts
        ├── pages/
        │   ├── coin.tsx
        │   └── home.tsx
        └── types/
            ├── coins.ts
            └── currencies.ts
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/gurupranav-tech-crypto-tracker.git
   cd gurupranav-tech-crypto-tracker
   ```
2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```
3. **Start the development server**
   ```sh
   npm run dev  # or yarn dev
   ```
4. **Build for production**
   ```sh
   npm run build  # or yarn build
   ```

## 🎨 Theming

- Light/Dark mode support via `ThemeContext.tsx`
- Custom styles using `index.css`

## 📬 Contact

For questions or collaboration, reach out at [gurupranav08@gmail.com](mailto:gurupranav08@gmail.com).
