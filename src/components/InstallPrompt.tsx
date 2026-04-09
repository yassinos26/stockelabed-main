import { useState, useEffect } from 'react';
import { Smartphone, X } from 'lucide-react';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if already installed
    const isInstalled = localStorage.getItem('app-installed');
    const isDismissed = localStorage.getItem('install-prompt-dismissed');

    if (isInstalled || isDismissed) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if running in standalone mode (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      localStorage.setItem('app-installed', 'true');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      localStorage.setItem('app-installed', 'true');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('install-prompt-dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-gray-800 border border-[#1a8754] rounded-lg p-4 shadow-lg">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
        <div className="flex items-start gap-3">
          <div className="bg-[#1a8754] p-2 rounded-lg">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="text-white mb-1">Installer l'application</h3>
            <p className="text-sm text-gray-300 mb-3">
              Installez l'application sur votre téléphone pour un accès rapide et une meilleure expérience.
            </p>
            <button
              onClick={handleInstall}
              className="bg-[#1a8754] text-white px-4 py-2 rounded-lg hover:bg-[#15693f] transition-colors text-sm"
            >
              Installer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
