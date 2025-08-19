import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Animal } from '../types/animal';
import { useCart } from '../contexts/CartContext';
import { AnimalDetailDialog } from './AnimalDetailDialog';

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const { addToCart } = useCart();
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

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
    <>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-2">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setIsDetailOpen(true)}
            />
          </div>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{animal.name}</CardTitle>
            <Badge className={getCategoryColor(animal.category)}>
              {animal.category}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 italic">{animal.species}</p>
        </CardHeader>
        
        <CardContent className="flex-1">
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{animal.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cuidado:</span>
              <Badge className={getCareColor(animal.care_level)} variant="outline">
                {animal.care_level}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tamaño:</span>
              <span className="text-sm font-medium">{animal.size}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Vida útil:</span>
              <span className="text-sm font-medium">{animal.lifespan}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center pt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-600">${animal.price}</span>
            <span className="text-xs text-gray-500">
              Stock: {animal.stock_quantity}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDetailOpen(true)}
            >
              Ver detalles
            </Button>
            <Button
              onClick={() => addToCart(animal)}
              disabled={!animal.in_stock || animal.stock_quantity === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              Agregar
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <AnimalDetailDialog
        animal={animal}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
};