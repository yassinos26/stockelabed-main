import { useState } from 'react';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import type { Product } from '../App';

type StockEntryProps = {
  products: Product[];
  onAddMovement: (productId: string, type: 'entry', quantity: number, note?: string) => void;
  onBack: () => void;
};

export function StockEntry({ products, onAddMovement, onBack }: StockEntryProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct && quantity > 0) {
      onAddMovement(selectedProduct.id, 'entry', quantity, note);
      setQuantity(1);
      setNote('');
      setSelectedProduct(null);
      setSearchTerm('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
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
        <h2 className="text-white">Créer Entrée de Stock</h2>
      </div>

      {showSuccess && (
        <div className="bg-green-600 text-white px-6 py-4 rounded-lg mb-4">
          Entrée de stock enregistrée avec succès!
        </div>
      )}

      <div className="space-y-4">
        {/* Product Search */}
        <div className="bg-gray-800 rounded-lg p-6">
          <label className="block text-white mb-3">Rechercher un produit</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nom ou code-barres"
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
            />
          </div>

          {/* Product List */}
          {searchTerm && (
            <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setSearchTerm('');
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-left transition-colors flex items-center gap-4"
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-white">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.barcode}</p>
                  </div>
                  <p className="text-[#1a8754]">Stock: {product.quantity}</p>
                </button>
              ))}
              {filteredProducts.length === 0 && (
                <p className="text-gray-400 text-center py-4">
                  Aucun produit trouvé
                </p>
              )}
            </div>
          )}
        </div>

        {/* Selected Product */}
        {selectedProduct && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white mb-4">Produit sélectionné</h3>
            <div className="flex gap-4 mb-4">
              {selectedProduct.image && (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <p className="text-white">{selectedProduct.name}</p>
                <p className="text-gray-400">Code: {selectedProduct.barcode}</p>
                <p className="text-[#1a8754]">Stock actuel: {selectedProduct.quantity}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Quantité à ajouter *</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  required
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
                />
                <p className="text-sm text-gray-400 mt-2">
                  Nouveau stock: {selectedProduct.quantity + quantity}
                </p>
              </div>

              <div>
                <label className="block text-white mb-2">Note (optionnel)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Fournisseur, facture, etc."
                  rows={3}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a8754] text-white px-6 py-4 rounded-lg hover:bg-[#15693f] transition-colors inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Enregistrer l'entrée
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
