import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDialog: React.FC<CartDialogProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Carrito de Compras
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-8">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
              Continuar comprando
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Carrito de Compras ({cartItems.length} productos)
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Vaciar
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.animal.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={item.animal.image}
                alt={item.animal.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.animal.name}</h3>
                <p className="text-sm text-gray-600 italic">{item.animal.species}</p>
                <p className="text-lg font-bold text-green-600">${item.animal.price}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.animal.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.animal.id, item.quantity + 1)}
                  disabled={item.quantity >= item.animal.stock_quantity}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromCart(item.animal.id)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-right">
                <p className="font-bold">${(item.animal.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</span>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continuar comprando
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              Proceder al pago
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};