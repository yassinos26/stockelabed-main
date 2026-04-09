import { Smartphone, Chrome, Share, Home, Settings } from 'lucide-react';

export function MobileGuide() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-[#1a8754] rounded-lg p-6 text-white">
        <h2 className="mb-2">📱 Utiliser sur Mobile</h2>
        <p>Suivez ces étapes pour installer l'application sur votre téléphone</p>
      </div>

      {/* QR Code Section */}
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <h3 className="text-white mb-4">🔗 Accéder depuis votre téléphone</h3>
        <div className="bg-white p-4 rounded-lg inline-block mb-4">
          <p className="text-gray-900 text-sm mb-2">Scannez ce QR code ou</p>
          <div className="bg-gray-200 h-48 w-48 mx-auto rounded flex items-center justify-center">
            <Smartphone className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-700 rounded p-4">
          <p className="text-gray-300 text-sm mb-2">Copiez cette URL dans votre navigateur mobile:</p>
          <code className="text-[#1a8754] text-sm break-all">
            {window.location.href}
          </code>
        </div>
      </div>

      {/* Android Chrome */}
      <div className="bg-gray-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Chrome className="w-8 h-8 text-white" />
          <h3 className="text-white">Android (Chrome/Edge)</h3>
        </div>
        <ol className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="bg-[#1a8754] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
            <span>Ouvrez l'application dans Chrome ou Edge</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-[#1a8754] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
            <span>Appuyez sur le menu (⋮) en haut à droite</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-[#1a8754] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
            <span>Sélectionnez "Installer l'application" ou "Ajouter à l'écran d'accueil"</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-[#1a8754] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">4</span>
            <span>Confirmez l'installation</span>
          </li>
        </ol>
      </div>

      {/* iOS Safari */}
      <div className="bg-gray-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Smartphone className="w-8 h-8 text-white" />
          <h3 className="text-white">iPhone/iPad (Safari)</h3>
        </div>
        <ol className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="bg-[#1a8754] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
            <span>Ouvrez l'application dans Safari</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="bg-[#1a8754] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
            <div>
              <p>Appuyez sur le bouton Partager</p>
              <Share className="w-5 h-5 text-[#1a8754] mt-2" />
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="bg-[#1a8754] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
            <div>
              <p>Faites défiler et sélectionnez "Sur l'écran d'accueil"</p>
              <Home className="w-5 h-5 text-[#1a8754] mt-2" />
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-[#1a8754] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">4</span>
            <span>Appuyez sur "Ajouter"</span>
          </li>
        </ol>
      </div>

      {/* Avantages */}
      <div className="bg-gray-800 rounded-lg p-6 space-y-3">
        <h3 className="text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#1a8754]" />
          Avantages de l'installation
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex gap-2">
            <span className="text-[#1a8754]">✓</span>
            <span>Accès rapide depuis l'écran d'accueil</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#1a8754]">✓</span>
            <span>Fonctionne en mode plein écran</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#1a8754]">✓</span>
            <span>Accès direct à la caméra pour scanner</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#1a8754]">✓</span>
            <span>Données sauvegardées localement</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#1a8754]">✓</span>
            <span>Fonctionne même hors ligne</span>
          </li>
        </ul>
      </div>
    </div>
  );
}