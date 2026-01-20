# VHub Booking - Microfrontend Quick Start

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development

**Option A: Start all apps at once** (Recommended)
```bash
pnpm dev
```

This will start:
- app-shell (Next.js host) on http://localhost:3000
- shell-admin (React remote) on http://localhost:3001  
- order (React remote) on http://localhost:3002

**Option B: Start apps individually**
```bash
# Terminal 1 - Order microfrontend
pnpm dev:order

# Terminal 2 - Admin microfrontend  
pnpm dev:admin

# Terminal 3 - Host application
pnpm dev:fe
```

### 3. Access Applications

- **Main App**: http://localhost:3000
- **Order Management**: http://localhost:3000/order
- **Admin Portal**: http://localhost:3000/shell-admin

## 📋 Architecture Summary

```
┌─────────────────────────────────────────┐
│     app-shell (Next.js - Port 3000)     │
│           Host Application              │
│                                         │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │    /order    │  │  /shell-admin   │ │
│  │              │  │                 │ │
│  │   (Remote)   │  │    (Remote)     │ │
│  └──────┬───────┘  └────────┬────────┘ │
└─────────┼──────────────────┼───────────┘
          │                  │
          ▼                  ▼
   ┌──────────────┐   ┌──────────────┐
   │    order     │   │ shell-admin  │
   │ Port 3002    │   │  Port 3001   │
   │ (React)      │   │  (React)     │
   └──────────────┘   └──────────────┘
```

## 🔑 Key Files

### Host Configuration
- [front-end/app-shell/next.config.js](front-end/app-shell/next.config.js) - Module Federation config
- [front-end/app-shell/app/components/RemoteComponent.tsx](front-end/app-shell/app/components/RemoteComponent.tsx) - Remote loader

### Remote Configurations
- [front-end/shell-admin/webpack.config.js](front-end/shell-admin/webpack.config.js)
- [front-end/order/webpack.config.js](front-end/order/webpack.config.js)

### Routing
- [microfrontends.json](microfrontends.json) - Route definitions
- [front-end/app-shell/app/order/[[...slug]]/page.tsx](front-end/app-shell/app/order/[[...slug]]/page.tsx)
- [front-end/app-shell/app/shell-admin/[[...slug]]/page.tsx](front-end/app-shell/app/shell-admin/[[...slug]]/page.tsx)

## ⚙️ Module Federation Setup

### Host (app-shell - Next.js)
```javascript
remotes: {
  shellAdmin: 'shellAdmin@http://localhost:3001/remoteEntry.js',
  order: 'order@http://localhost:3002/remoteEntry.js',
}
```

### Remotes (React Apps)
```javascript
exposes: {
  './App': './src/App.tsx',
}
```

## 🎯 Features by Microfrontend

### 📦 Order Microfrontend
Routes:
- `/order/list` - Order listing
- `/order/detail/:id` - Order details
- `/order/create` - Create new order

### ⚙️ Shell-Admin Microfrontend  
Routes:
- `/shell-admin/dashboard` - Dashboard with metrics
- `/shell-admin/users` - User management
- `/shell-admin/settings` - System settings

## 🛠️ Development Commands

```bash
pnpm dev              # Start all apps
pnpm dev:fe           # Start host only
pnpm dev:admin        # Start admin remote only
pnpm dev:order        # Start order remote only
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm check-types      # Type check all
```

## ❗ Troubleshooting

### Remote Not Loading
1. Ensure all 3 apps are running
2. Check browser console for errors
3. Verify ports: 3000, 3001, 3002 are available

### Module Federation Error
```bash
# Clear cache and restart
rm -rf front-end/app-shell/.next
pnpm dev
```

### Type Errors
```bash
pnpm check-types
```

## 📦 Tech Stack

- **Turbo Repo** - Monorepo management
- **Next.js 16** - Host application (SSR + App Router)
- **React 19** - Microfrontend apps
- **Webpack 5** - Module Federation for remotes
- **TypeScript 5.9** - Type safety
- **Tailwind CSS** - Styling
- **pnpm** - Package manager

## 📁 Project Structure

```
vhub-booking/
├── front-end/
│   ├── app-shell/        # Next.js host (3000)
│   ├── shell-admin/      # Admin remote (3001)
│   ├── order/            # Order remote (3002)
│   └── app-core/         # Shared components
├── config/               # Shared configs
├── turbo.json           # Turbo config
├── microfrontends.json  # Route config
└── package.json
```

## 🔐 Shared Dependencies

- `react` ^19.2.0 (singleton)
- `react-dom` ^19.2.0 (singleton)
- `react-router-dom` (shared in remotes)

## 📚 Resources

- [Module Federation](https://module-federation.io/)
- [Next.js Docs](https://nextjs.org/docs)
- [Turbo Repo](https://turbo.build/repo/docs)

---

For detailed documentation, see [README.md](README.md)
