import { Package, FileText, BarChart3, DollarSign, PackagePlus, PackageMinus, ScanBarcode, ClipboardList, Smartphone } from 'lucide-react';
import type { Product, StockMovement } from '../App';

type DashboardProps = {
  products: Product[];
  movements: StockMovement[];
  onNavigate: (view: 'dashboard' | 'products' | 'entry' | 'exit' | 'scanner' | 'reports' | 'guide') => void;
};

export function Dashboard({ products, movements, onNavigate }: DashboardProps) {
  const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const documentsCount = movements.length;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('products')}
          className="bg-gray-800 rounded-lg p-6 text-left hover:bg-gray-750 transition-colors"
        >
          <div className="flex flex-col items-center gap-3">
            <Package className="w-12 h-12 text-white" />
            <div className="text-center">
              <p className="text-white">Marchandises</p>
              <p className="text-[#1a8754]">{totalProducts.toLocaleString()}</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('reports')}
          className="bg-gray-800 rounded-lg p-6 text-left hover:bg-gray-750 transition-colors"
        >
          <div className="flex flex-col items-center gap-3">
            <FileText className="w-12 h-12 text-white" />
            <div className="text-center">
              <p className="text-white">Documents</p>
              <p className="text-[#1a8754]">{documentsCount}</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('reports')}
          className="bg-gray-800 rounded-lg p-6 text-left hover:bg-gray-750 transition-colors"
        >
          <div className="flex flex-col items-center gap-3">
            <BarChart3 className="w-12 h-12 text-white" />
            <div className="text-center">
              <p className="text-white">Rapports</p>
            </div>
          </div>
        </button>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex flex-col items-center gap-3">
            <DollarSign className="w-12 h-12 text-white" />
            <div className="text-center">
              <p className="text-white">Valeur Stock</p>
              <p className="text-[#1a8754]">{totalValue.toLocaleString()} DA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('entry')}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
        >
          <div className="flex flex-col items-center gap-3">
            <PackagePlus className="w-12 h-12 text-white" />
            <p className="text-white">Créer Entrée</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('exit')}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
        >
          <div className="flex flex-col items-center gap-3">
            <PackageMinus className="w-12 h-12 text-white" />
            <p className="text-white">Créer Sortie</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('scanner')}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
        >
          <div className="flex flex-col items-center gap-3">
            <ScanBarcode className="w-12 h-12 text-white" />
            <p className="text-white">Scan code-barres</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('products')}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
        >
          <div className="flex flex-col items-center gap-3">
            <ClipboardList className="w-12 h-12 text-white" />
            <p className="text-white">Créer Inventaire</p>
          </div>
        </button>
      </div>
    </div>
  );
}