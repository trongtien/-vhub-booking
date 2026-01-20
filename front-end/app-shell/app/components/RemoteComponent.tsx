'use client';

import React, { Suspense, lazy, useEffect, useState } from 'react';

interface RemoteComponentProps {
  remoteName: string;
  moduleName: string;
}

const loadRemoteModule = (remoteName: string, remoteUrl: string) => {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(`script[data-remote="${remoteName}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = remoteUrl;
    script.setAttribute('data-remote', remoteName);
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Failed to load remote entry for ${remoteName}`));
    };
    document.head.appendChild(script);
  });
};

const RemoteComponent: React.FC<RemoteComponentProps> = ({ remoteName, moduleName }) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const remoteUrls: Record<string, string> = {
      shellAdmin: 'http://localhost:3001/remoteEntry.js',
      order: 'http://localhost:3002/remoteEntry.js',
    };

    const remoteUrl = remoteUrls[remoteName];
    if (!remoteUrl) {
      setError(`Unknown remote: ${remoteName}`);
      setLoading(false);
      return;
    }

    const loadComponent = async () => {
      try {
        // Load the remote script
        await loadRemoteModule(remoteName, remoteUrl);

        // Access the remote container
        // @ts-ignore
        const container = window[remoteName];
        
        if (!container) {
          throw new Error(`Remote container ${remoteName} not found`);
        }

        // Initialize the container
        // @ts-ignore
        await container.init(__webpack_share_scopes__?.default || {});
        
        // Get the module
        const factory = await container.get(moduleName);
        const Module = factory();
        
        setComponent(() => Module.default || Module);
        setLoading(false);
      } catch (err) {
        console.error(`Error loading remote ${remoteName}/${moduleName}:`, err);
        setError(err instanceof Error ? err.message : 'Failed to load remote component');
        setLoading(false);
      }
    };

    loadComponent();
  }, [remoteName, moduleName]);

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚙️</div>
        <div>Loading {remoteName}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '2rem', 
        background: '#fee2e2', 
        border: '1px solid #ef4444',
        borderRadius: '0.5rem',
        color: '#dc2626',
        margin: '2rem'
      }}>
        <h3 style={{ marginTop: 0 }}>Error loading microfrontend</h3>
        <p>{error}</p>
        <p style={{ fontSize: '0.875rem', marginTop: '1rem', color: '#991b1b' }}>
          Make sure the <strong>{remoteName}</strong> application is running on its designated port.
        </p>
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#991b1b' }}>
          <p>Expected URLs:</p>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>shell-admin: http://localhost:3001</li>
            <li>order: http://localhost:3002</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!Component) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: '#6b7280'
      }}>
        Component not found
      </div>
    );
  }

  return <Component />;
};

export default RemoteComponent;
