import { useState, useRef } from 'react';
import { ArrowLeft, Upload, Camera } from 'lucide-react';
import type { Product } from '../App';

type ProductFormProps = {
  initialBarcode?: string;
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  onBack: () => void;
};

export function ProductForm({ initialBarcode = '', onAddProduct, onBack }: ProductFormProps) {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState(initialBarcode);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && barcode) {
      onAddProduct({
        name,
        barcode,
        quantity,
        price,
        image: image || undefined,
      });
      setName('');
      setBarcode('');
      setQuantity(0);
      setPrice(0);
      setImage('');
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
        <h2 className="text-white">Ajouter un produit</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div className="bg-gray-800 rounded-lg p-6">
          <label className="block text-white mb-3">Image du produit</label>
          <div className="flex flex-col items-center gap-4">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-500" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors inline-flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {image ? 'Changer l\'image' : 'Ajouter une image'}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-white mb-2">Nom du produit *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: Sucre blanc 1kg"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Code-barres *</label>
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              required
              placeholder="Code-barres ou QR code"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Quantité initiale</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="0"
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Prix unitaire (DA)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0"
                step="0.01"
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1a8754] text-white px-6 py-4 rounded-lg hover:bg-[#15693f] transition-colors"
        >
          Enregistrer le produit
        </button>
      </form>
    </div>
  );
}
