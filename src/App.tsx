import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ProductForm } from './components/ProductForm';
import { StockEntry } from './components/StockEntry';
import { StockExit } from './components/StockExit';
import { BarcodeScanner } from './components/BarcodeScanner';
import { ProductList } from './components/ProductList';
import { Reports } from './components/Reports';
import { InstallPrompt } from './components/InstallPrompt';
import { MobileGuide } from './components/MobileGuide';
import logo from 'figma:asset/77c578008088228414c62f034f90e59b43cba75a.png';

export type Product = {
  id: string;
  name: string;
  barcode: string;
  image?: string;
  quantity: number;
  price: number;
  createdAt: Date;
};

export type StockMovement = {
  id: string;
  productId: string;
  type: 'entry' | 'exit';
  quantity: number;
  date: Date;
  note?: string;
};

type View = 'dashboard' | 'products' | 'entry' | 'exit' | 'scanner' | 'reports' | 'guide';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });
  const [movements, setMovements] = useState<StockMovement[]>(() => {
    const saved = localStorage.getItem('movements');
    return saved ? JSON.parse(saved) : [];
  });

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  const saveMovements = (newMovements: StockMovement[]) => {
    setMovements(newMovements);
    localStorage.setItem('movements', JSON.stringify(newMovements));
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    saveProducts([...products, newProduct]);
  };

  const addMovement = (productId: string, type: 'entry' | 'exit', quantity: number, note?: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newMovement: StockMovement = {
      id: Date.now().toString(),
      productId,
      type,
      quantity,
      date: new Date(),
      note,
    };

    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          quantity: type === 'entry' ? p.quantity + quantity : p.quantity - quantity,
        };
      }
      return p;
    });

    saveProducts(updatedProducts);
    saveMovements([...movements, newMovement]);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <InstallPrompt />
      {/* Header */}
      <header className="bg-[#1a8754] border-b border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Sucrerie Elabed" className="h-12" />
              <div>
                <h1 className="text-white">Stock et Inventaire</h1>
                <p className="text-sm text-green-200">Sucrerie elabed</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {currentView === 'dashboard' && (
          <Dashboard
            products={products}
            movements={movements}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'products' && (
          <ProductList products={products} onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'entry' && (
          <StockEntry
            products={products}
            onAddMovement={addMovement}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
        {currentView === 'exit' && (
          <StockExit
            products={products}
            onAddMovement={addMovement}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
        {currentView === 'scanner' && (
          <BarcodeScanner
            products={products}
            onAddProduct={addProduct}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
        {currentView === 'reports' && (
          <Reports
            products={products}
            movements={movements}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
        {currentView === 'guide' && (
          <MobileGuide />
        )}
      </main>
    </div>
  );
}