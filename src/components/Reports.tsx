import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import type { Product, StockMovement } from '../App';

type ReportsProps = {
  products: Product[];
  movements: StockMovement[];
  onBack: () => void;
};

export function Reports({ products, movements, onBack }: ReportsProps) {
  const [filter, setFilter] = useState<'all' | 'entry' | 'exit'>('all');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const filterByDate = (date: Date) => {
    const now = new Date();
    const movementDate = new Date(date);
    
    switch (dateFilter) {
      case 'today':
        return movementDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return movementDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return movementDate >= monthAgo;
      default:
        return true;
    }
  };

  const filteredMovements = movements
    .filter(m => filter === 'all' || m.type === filter)
    .filter(m => filterByDate(m.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalEntries = filteredMovements
    .filter(m => m.type === 'entry')
    .reduce((sum, m) => sum + m.quantity, 0);

  const totalExits = filteredMovements
    .filter(m => m.type === 'exit')
    .reduce((sum, m) => sum + m.quantity, 0);

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Produit supprimé';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white">Rapports et Mouvements</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <p className="text-gray-400">Entrées</p>
          </div>
          <p className="text-white text-2xl">{totalEntries}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <p className="text-gray-400">Sorties</p>
          </div>
          <p className="text-white text-2xl">{totalExits}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4 space-y-3">
        <div>
          <p className="text-white text-sm mb-2">Type de mouvement</p>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-[#1a8754] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('entry')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                filter === 'entry'
                  ? 'bg-[#1a8754] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Entrées
            </button>
            <button
              onClick={() => setFilter('exit')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                filter === 'exit'
                  ? 'bg-[#1a8754] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Sorties
            </button>
          </div>
        </div>

        <div>
          <p className="text-white text-sm mb-2">Période</p>
          <div className="grid grid-cols-4 gap-2">
            {(['today', 'week', 'month', 'all'] as const).map(period => (
              <button
                key={period}
                onClick={() => setDateFilter(period)}
                className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                  dateFilter === period
                    ? 'bg-[#1a8754] text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period === 'today' && 'Aujourd\'hui'}
                {period === 'week' && '7 jours'}
                {period === 'month' && '30 jours'}
                {period === 'all' && 'Tout'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movements List */}
      <div className="space-y-3">
        {filteredMovements.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucun mouvement pour cette période</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">
                {filteredMovements.length} mouvement{filteredMovements.length > 1 ? 's' : ''}
              </p>
            </div>
            {filteredMovements.map(movement => (
              <div key={movement.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {movement.type === 'entry' ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                      <h3 className="text-white">{getProductName(movement.productId)}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{formatDate(movement.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl ${
                      movement.type === 'entry' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {movement.type === 'entry' ? '+' : '-'}{movement.quantity}
                    </p>
                  </div>
                </div>
                {movement.note && (
                  <div className="mt-3 bg-gray-700 rounded px-3 py-2">
                    <p className="text-sm text-gray-300">{movement.note}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
