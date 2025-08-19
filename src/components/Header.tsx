import React from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { CartDialog } from './CartDialog';

interface HeaderProps {
  onSearchChange: (search: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return (
    <header className="bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">🦎 Exótica Pets</h1>
            <p className="text-green-200 hidden md:block">Tu tienda de animales exóticos</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar animales..."
                className="pl-10 pr-4 py-2 rounded-lg text-gray-800 w-64"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            
            <Button
              variant="outline"
              className="relative bg-white text-green-800 hover:bg-green-50"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar animales..."
              className="pl-10 pr-4 py-2 rounded-lg text-gray-800 w-full"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <CartDialog isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};