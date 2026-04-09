import { useState, useRef } from 'react';
import { ArrowLeft, Camera, ScanLine, Plus } from 'lucide-react';
import type { Product } from '../App';
import { ProductForm } from './ProductForm';

type BarcodeScannerProps = {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  onBack: () => void;
};

export function BarcodeScanner({ products, onAddProduct, onBack }: BarcodeScannerProps) {
  const [scannedCode, setScannedCode] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [foundProduct, setFoundProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = (code: string) => {
    setScannedCode(code);
    const product = products.find(p => p.barcode === code);
    if (product) {
      setFoundProduct(product);
      setShowProductForm(false);
    } else {
      setFoundProduct(null);
      setShowProductForm(true);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      handleScan(manualInput.trim());
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate barcode detection from image
    // In a real app, you would use a library like quagga2 or @zxing/library
    const mockBarcode = Math.random().toString().slice(2, 15);
    setManualInput(mockBarcode);
    handleScan(mockBarcode);
  };

  if (showProductForm && scannedCode) {
    return (
      <ProductForm
        initialBarcode={scannedCode}
        onAddProduct={(product) => {
          onAddProduct(product);
          setShowProductForm(false);
          setScannedCode('');
          setManualInput('');
        }}
        onBack={() => {
          setShowProductForm(false);
          setScannedCode('');
        }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white">Scanner Code-Barres/QR</h2>
      </div>

      <div className="space-y-4">
        {/* Scanner Area */}
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <ScanLine className="w-16 h-16 text-[#1a8754] mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              Positionnez le code-barres dans le cadre
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#1a8754] text-white px-6 py-3 rounded-lg hover:bg-[#15693f] transition-colors inline-flex items-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Prendre une photo
            </button>
          </div>
        </div>

        {/* Manual Input */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-white mb-4">Saisie manuelle</h3>
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Entrez le code-barres"
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-[#1a8754] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#1a8754] text-white px-6 py-3 rounded-lg hover:bg-[#15693f] transition-colors"
            >
              Scanner
            </button>
          </form>
        </div>

        {/* Found Product */}
        {foundProduct && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white mb-4">Produit trouvé</h3>
            <div className="flex gap-4">
              {foundProduct.image && (
                <img
                  src={foundProduct.image}
                  alt={foundProduct.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <p className="text-white">{foundProduct.name}</p>
                <p className="text-gray-400">Code: {foundProduct.barcode}</p>
                <p className="text-[#1a8754]">Stock: {foundProduct.quantity}</p>
                <p className="text-gray-400">{foundProduct.price} DA</p>
              </div>
            </div>
          </div>
        )}

        {/* Add New Product Button */}
        <button
          onClick={() => {
            setScannedCode('NEW_' + Date.now());
            setShowProductForm(true);
          }}
          className="w-full bg-gray-800 text-white px-6 py-4 rounded-lg hover:bg-gray-750 transition-colors inline-flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Ajouter un nouveau produit
        </button>
      </div>
    </div>
  );
}
