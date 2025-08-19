import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Animal } from '../types/animal';
import { useCart } from '../contexts/CartContext';
import { Heart, Info, Home, Utensils } from 'lucide-react';

interface AnimalDetailDialogProps {
  animal: Animal;
  isOpen: boolean;
  onClose: () => void;
}

export const AnimalDetailDialog: React.FC<AnimalDetailDialogProps> = ({
  animal,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();

  const getCategoryColor = (category: string) => {
    const colors = {
      reptiles: 'bg-green-100 text-green-800',
      birds: 'bg-blue-100 text-blue-800',
      mammals: 'bg-purple-100 text-purple-800',
      amphibians: 'bg-teal-100 text-teal-800',
      fish: 'bg-cyan-100 text-cyan-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCareColor = (level: string) => {
    const colors = {
      'Fácil': 'bg-green-100 text-green-800',
      'Intermedio': 'bg-yellow-100 text-yellow-800',
      'Avanzado': 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{animal.name}</span>
            <Badge className={getCategoryColor(animal.category)}>
              {animal.category}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Información General
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Especie:</span>
                  <span className="font-medium italic">{animal.species}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tamaño:</span>
                  <span className="font-medium">{animal.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Esperanza de vida:</span>
                  <span className="font-medium">{animal.lifespan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nivel de cuidado:</span>
                  <Badge className={getCareColor(animal.care_level)} variant="outline">
                    {animal.care_level}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Cuidados
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600 block">Hábitat:</span>
                  <span className="font-medium">{animal.habitat}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Dieta:</span>
                  <span className="font-medium flex items-center">
                    <Utensils className="w-4 h-4 mr-1" />
                    {animal.diet}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{animal.description}</p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-green-600">${animal.price}</span>
              <span className="text-sm text-gray-500">
                {animal.in_stock ? `Stock: ${animal.stock_quantity}` : 'Sin stock'}
              </span>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <Button
                onClick={() => {
                  addToCart(animal);
                  onClose();
                }}
                disabled={!animal.in_stock || animal.stock_quantity === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                <Heart className="w-4 h-4 mr-2" />
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};