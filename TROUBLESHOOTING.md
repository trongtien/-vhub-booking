# Troubleshooting Guide

## 🐛 Common Issues and Solutions

### Installation Issues

#### Issue: `pnpm install` fails
**Symptoms**: Error during dependency installation

**Solutions**:
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install

# If still failing, try with legacy peer deps
pnpm install --legacy-peer-deps
```

#### Issue: Node version mismatch
**Symptoms**: "Unsupported Node.js version"

**Solution**:
```bash
# Check Node version (must be >= 18)
node -v

# Use nvm to install correct version
nvm install 18
nvm use 18
```

---

### Development Server Issues

#### Issue: Port already in use
**Symptoms**: "Port 3000/3001/3002 is already in use"

**Solutions**:
```bash
# Find process using the port (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in package.json
# app-shell/package.json: "dev": "next dev --port 3010"
```

#### Issue: Hot reload not working
**Symptoms**: Changes not reflecting in browser

**Solutions**:
```bash
# For Next.js (app-shell)
rm -rf .next
pnpm dev

# For Webpack remotes
rm -rf node_modules/.cache
pnpm dev
```

#### Issue: All apps not starting with `pnpm dev`
**Symptoms**: Only some apps start

**Solution**:
```bash
# Check turbo cache
turbo prune

# Start apps individually to identify issue
pnpm dev:order    # Check if order starts
pnpm dev:admin    # Check if admin starts
pnpm dev:fe       # Check if shell starts
```

---

### Module Federation Issues

#### Issue: "Remote container not found"
**Symptoms**: Microfrontend doesn't load, console shows remote error

**Checklist**:
1. ✅ Is the remote app running? (check http://localhost:3001 and :3002)
2. ✅ Check browser network tab for failed requests
3. ✅ Verify URLs in `next.config.js` remotes configuration
4. ✅ Check if remoteEntry.js is accessible:
   - http://localhost:3001/remoteEntry.js
   - http://localhost:3002/remoteEntry.js

**Solutions**:
```bash
# Clear cache and restart
rm -rf front-end/app-shell/.next
rm -rf front-end/*/node_modules/.cache

# Restart all apps
pnpm dev
```

#### Issue: "Shared module not available"
**Symptoms**: Runtime error about shared dependencies

**Solution**:
Ensure shared dependencies match across all apps:

```javascript
// Check versions in package.json files
// All should have:
"react": "^19.2.0",
"react-dom": "^19.2.0"

// Reinstall
pnpm install
```

#### Issue: Changes in remote not reflecting in host
**Symptoms**: Updated remote but host still shows old version

**Solutions**:
```bash
# Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

# Clear browser cache

# Restart both remote and host
# Terminal 1:
cd front-end/order
pnpm dev

# Terminal 2:
cd front-end/app-shell
pnpm dev
```

---

### TypeScript Issues

#### Issue: Type errors in remote components
**Symptoms**: TS errors about imported remote modules

**Solution**:
Ensure `global.d.ts` has declarations:

```typescript
declare module 'shellAdmin/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'order/App' {
  const App: React.ComponentType;
  export default App;
}
```

#### Issue: "Cannot find module" errors
**Symptoms**: Import errors for workspace packages

**Solutions**:
```bash
# Check if package is in pnpm-workspace.yaml
# Verify package.json name matches import

# Rebuild TypeScript
pnpm check-types

# Clear TypeScript cache
rm -rf */tsconfig.tsbuildinfo
```

---

### Build Issues

#### Issue: Production build fails
**Symptoms**: `pnpm build` throws errors

**Solutions**:
```bash
# Build each app individually to identify issue
cd front-end/app-shell && pnpm build
cd front-end/shell-admin && pnpm build
cd front-end/order && pnpm build

# Check for:
# - TypeScript errors: pnpm check-types
# - Linting errors: pnpm lint
# - Missing env variables
```

#### Issue: Build succeeds but runtime errors
**Symptoms**: Production build runs but app crashes

**Checklist**:
1. ✅ Check environment variables
2. ✅ Verify remote URLs for production
3. ✅ Check browser console for errors
4. ✅ Verify all dependencies are installed

**Solution for production remote URLs**:
```javascript
// next.config.js - update for production
remotes: {
  shellAdmin: process.env.NODE_ENV === 'production' 
    ? 'shellAdmin@https://admin.yourdomain.com/remoteEntry.js'
    : 'shellAdmin@http://localhost:3001/remoteEntry.js',
  order: process.env.NODE_ENV === 'production'
    ? 'order@https://order.yourdomain.com/remoteEntry.js'
    : 'order@http://localhost:3002/remoteEntry.js',
}
```

---

### Routing Issues

#### Issue: 404 on microfrontend routes
**Symptoms**: `/order` or `/shell-admin` shows 404

**Checklist**:
1. ✅ Check folder structure: `app/order/[[...slug]]/page.tsx`
2. ✅ Verify catch-all route syntax: `[[...slug]]`
3. ✅ Remote app must be running

**Solution**:
```bash
# Verify file structure
ls -la front-end/app-shell/app/order/[[...slug]]/
ls -la front-end/app-shell/app/shell-admin/[[...slug]]/

# Should contain page.tsx
```

#### Issue: Nested routes not working in remotes
**Symptoms**: `/order/list` works but `/order/detail/1` doesn't

**Solution**:
Check remote's router configuration:

```typescript
// Remote app must use basename
<BrowserRouter basename="/order">
  <Routes>
    <Route path="/list" element={<OrderList />} />
    <Route path="/detail/:id" element={<OrderDetail />} />
  </Routes>
</BrowserRouter>
```

---

### Performance Issues

#### Issue: Slow initial load
**Symptoms**: Long loading time on first visit

**Solutions**:
1. Check bundle sizes:
```bash
# Add to next.config.js
webpack: (config) => {
  config.plugins.push(new BundleAnalyzerPlugin());
  return config;
}
```

2. Implement code splitting
3. Lazy load heavy components
4. Optimize images

#### Issue: Slow navigation between microfrontends
**Symptoms**: Delay when switching between routes

**Solutions**:
1. Preload remotes:
```typescript
// Add to app-shell
useEffect(() => {
  // Preload remotes
  import('shellAdmin/App');
  import('order/App');
}, []);
```

2. Implement loading states
3. Add prefetching for common routes

---

### Styling Issues

#### Issue: Styles not loading in remote
**Symptoms**: Unstyled content in microfrontend

**Solutions**:
```javascript
// webpack.config.js - ensure CSS loaders are configured
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
}
```

#### Issue: Style conflicts between apps
**Symptoms**: CSS from one app affects another

**Solutions**:
1. Use CSS Modules
2. Scope styles with BEM or unique prefixes
3. Use CSS-in-JS (styled-components, emotion)
4. Shadow DOM for complete isolation

---

### State Management Issues

#### Issue: State not shared between microfrontends
**Symptoms**: Data doesn't persist across navigation

**Solutions**:
1. Implement shared state store
2. Use localStorage/sessionStorage
3. Pass state via URL params
4. Use Module Federation shared state

---

## 🔍 Debugging Tips

### Enable Verbose Logging

```bash
# Turbo verbose mode
turbo run dev --verbose

# Next.js debug mode
DEBUG=* pnpm dev

# Webpack stats
WEBPACK_STATS=1 pnpm dev
```

### Check Network Tab
1. Open DevTools > Network
2. Filter by JS
3. Look for failed remoteEntry.js requests
4. Check status codes (200 OK, 404 Not Found, etc.)

### Console Debugging
```javascript
// Add to RemoteComponent.tsx
console.log('Loading remote:', remoteName, moduleName);
console.log('Container:', window[remoteName]);
```

### React DevTools
1. Install React DevTools extension
2. Check component tree
3. Verify props are passed correctly
4. Check for re-render issues

---

## 📞 Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Review error messages carefully
3. ✅ Check browser console
4. ✅ Check terminal output
5. ✅ Try clearing cache and restarting

### Information to Provide

When reporting an issue, include:
- Node.js version: `node -v`
- pnpm version: `pnpm -v`
- Operating system
- Full error message
- Steps to reproduce
- What you've tried already

### Useful Commands

```bash
# System info
node -v
pnpm -v
pnpm list --depth=0

# Check for outdated deps
pnpm outdated

# Validate workspace
pnpm -r exec pwd

# Clean everything
rm -rf node_modules pnpm-lock.yaml
rm -rf front-end/*/node_modules
rm -rf front-end/*/.next
rm -rf front-end/*/dist
pnpm install
```

---

## 🛠️ Advanced Debugging

### Module Federation Debug Mode

Add to webpack.config.js:
```javascript
optimization: {
  runtimeChunk: false,
  minimize: false, // Disable for debugging
}
```

### Network Request Debugging

```javascript
// Add to RemoteComponent.tsx
const loadComponent = async () => {
  try {
    console.log('Fetching remote entry...');
    const script = document.querySelector(
      `script[src*="${remoteName}"]`
    );
    console.log('Script element:', script);
    
    // ... rest of code
  } catch (err) {
    console.error('Detailed error:', {
      message: err.message,
      stack: err.stack,
      remote: remoteName,
    });
  }
};
```

### Turbo Cache Issues

```bash
# Clear turbo cache
rm -rf .turbo

# Disable cache for debugging
turbo run dev --no-cache
```

---

## 📚 Additional Resources

- [Module Federation Docs](https://module-federation.io/)
- [Next.js Troubleshooting](https://nextjs.org/docs/messages)
- [Webpack Debugging](https://webpack.js.org/contribute/debugging/)
- [Turbo Repo Docs](https://turbo.build/repo/docs)

---

**Last Updated**: January 20, 2026  
**Maintainer**: Development Team
