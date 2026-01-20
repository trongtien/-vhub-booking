# VHub Booking - Microfrontend Platform

A modern microfrontend architecture built with **Turbo Repo**, **Next.js**, **React**, and **Module Federation**.

## 🏗️ Architecture Overview

This project implements a **Module Federation** microfrontend setup with:

- **app-shell** (Next.js 16) - Host application that orchestrates and loads microfrontends
- **shell-admin** (React + Webpack) - Admin portal microfrontend
- **order** (React + Webpack) - Order management microfrontend
- **app-core** - Shared React component library

## 📁 Project Structure

```
vhub-booking/
├── front-end/
│   ├── app-shell/           # Next.js host app (port 3000)
│   │   ├── app/
│   │   │   ├── page.tsx     # Landing page
│   │   │   ├── order/       # Order microfrontend route
│   │   │   └── shell-admin/ # Admin microfrontend route
│   │   └── next.config.js   # Module Federation config
│   ├── shell-admin/         # Admin React app (port 3001)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── pages/
│   │   │   └── components/
│   │   └── webpack.config.js
│   ├── order/               # Order React app (port 3002)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── pages/
│   │   │   └── components/
│   │   └── webpack.config.js
│   └── app-core/            # Shared components
├── config/                  # Shared configs (ESLint, TS, Jest)
├── turbo.json              # Turbo Repo configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18
- **pnpm**: 9.0.0

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Or run individual apps:

```bash
# Run only the host app (requires remotes to be running)
pnpm dev:fe

# Or run in separate terminals:
cd front-end/app-shell && pnpm dev      # Port 3000
cd front-end/shell-admin && pnpm dev    # Port 3001
cd front-end/order && pnpm dev          # Port 3002
```

### Access the Applications

- **Host App**: http://localhost:3000
- **Order Management**: http://localhost:3000/order
- **Admin Portal**: http://localhost:3000/shell-admin

#### Standalone Microfrontends (Dev Mode)

- **Shell Admin**: http://localhost:3001
- **Order**: http://localhost:3002

## 📦 Module Federation Configuration

### Host (app-shell)

```javascript
remotes: {
  shellAdmin: 'shellAdmin@http://localhost:3001/remoteEntry.js',
  order: 'order@http://localhost:3002/remoteEntry.js',
}
```

### Remote Apps (shell-admin & order)

Each microfrontend exposes its main App component:

```javascript
exposes: {
  './App': './src/App.tsx',
}
```

## 🛠️ Build

```bash
# Build all applications
pnpm build

# Build specific app
cd front-end/app-shell && pnpm build
```

## 📝 Available Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all applications for production
- `pnpm lint` - Lint all packages
- `pnpm check-types` - Type check all packages
- `pnpm format` - Format code with Prettier

## 🎯 Features

### Order Management Microfrontend
- Order list with filtering
- Order details view
- Create new orders
- Status management

### Admin Portal Microfrontend
- Admin dashboard with metrics
- User management
- Settings configuration
- Role-based views

### Host Application
- Route-based microfrontend loading
- Dynamic remote loading
- Error boundary handling
- Fallback UI for loading states

## 🔧 Technology Stack

- **Build System**: Turbo Repo
- **Host App**: Next.js 16 (App Router)
- **Microfrontends**: React 19, Webpack 5
- **Module Federation**: @module-federation/nextjs-mf & @module-federation/enhanced
- **Styling**: Tailwind CSS
- **Routing**: Next.js App Router (host), React Router (remotes)
- **Type Safety**: TypeScript 5.9
- **Package Manager**: pnpm

## 🔐 Shared Dependencies

All apps share singleton instances of:
- `react` (^19.2.0)
- `react-dom` (^19.2.0)
- `react-router-dom` (shared in remotes)

## 📚 Adding New Microfrontends

1. Create a new React app in `front-end/`
2. Configure Webpack with Module Federation
3. Expose components via `exposes` field
4. Add remote reference in `app-shell/next.config.js`
5. Create route in `app-shell/app/`
6. Update `microfrontends.json`

## 🐛 Troubleshooting

### Microfrontend Not Loading

1. Ensure all apps are running (host + remotes)
2. Check browser console for Module Federation errors
3. Verify remote URLs in `next.config.js`
4. Clear `.next` cache: `rm -rf .next`

### Type Errors

```bash
pnpm check-types
```

### Build Errors

```bash
# Clean all builds
pnpm clean

# Reinstall dependencies
rm -rf node_modules
pnpm install
```

## 📄 License

Private project

## 👥 Team

VHub Development Team
