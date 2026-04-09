import { useState } from 'react';
import { ArrowLeft, Search, Package } from 'lucide-react';
import type { Product } from '../App';

type ProductListProps = {
  products: Product[];
  onBack: () => void;
};

export function ProductList({ products, onBack }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode.includes(searchTerm)
  );

  const totalValue = filteredProducts.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const totalQuantity = filteredProducts.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white">Inventaire</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total articles</p>
          <p className="text-white text-2xl">{filteredProducts.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Quantité totale</p>
          <p className="text-white text-2xl">{totalQuantity}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom ou code-barres"
            className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              {searchTerm ? 'Aucun produit trouvé' : 'Aucun produit dans l\'inventaire'}
            </p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex gap-4">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400">Code: {product.barcode}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-400">Stock</p>
                      <p className={`${product.quantity === 0 ? 'text-red-400' : 'text-[#1a8754]'}`}>
                        {product.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Prix unitaire</p>
                      <p className="text-white">{product.price} DA</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Valeur totale</p>
                      <p className="text-white">{(product.quantity * product.price).toLocaleString()} DA</p>
                    </div>
                  </div>
                </div>
              </div>
              {product.quantity === 0 && (
                <div className="mt-3 bg-red-900/20 border border-red-600 rounded px-3 py-2">
                  <p className="text-sm text-red-400">⚠️ Rupture de stock</p>
                </div>
              )}
              {product.quantity > 0 && product.quantity < 10 && (
                <div className="mt-3 bg-yellow-900/20 border border-yellow-600 rounded px-3 py-2">
                  <p className="text-sm text-yellow-400">⚠️ Stock faible</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Total Value */}
      {filteredProducts.length > 0 && (
        <div className="mt-6 bg-[#1a8754] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-white">Valeur totale de l'inventaire</p>
            <p className="text-white text-xl">{totalValue.toLocaleString()} DA</p>
          </div>
        </div>
      )}
    </div>
  );
}
