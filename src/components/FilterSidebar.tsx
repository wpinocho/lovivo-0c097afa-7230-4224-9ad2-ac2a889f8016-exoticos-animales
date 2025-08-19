import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FilterSidebarProps {
  selectedCategory: string;
  selectedCareLevel: string;
  selectedSize: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onCareLevelChange: (level: string) => void;
  onSizeChange: (size: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  selectedCareLevel,
  selectedSize,
  priceRange,
  onCategoryChange,
  onCareLevelChange,
  onSizeChange,
  onPriceRangeChange,
  onClearFilters,
}) => {
  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'reptiles', label: 'Reptiles' },
    { value: 'birds', label: 'Aves' },
    { value: 'mammals', label: 'Mamíferos' },
    { value: 'amphibians', label: 'Anfibios' },
    { value: 'fish', label: 'Peces' },
  ];

  const careLevels = [
    { value: '', label: 'Todos los niveles' },
    { value: 'Fácil', label: 'Fácil' },
    { value: 'Intermedio', label: 'Intermedio' },
    { value: 'Avanzado', label: 'Avanzado' },
  ];

  const sizes = [
    { value: '', label: 'Todos los tamaños' },
    { value: 'Pequeño', label: 'Pequeño' },
    { value: 'Mediano', label: 'Mediano' },
    { value: 'Grande', label: 'Grande' },
  ];

  const priceRanges = [
    { value: [0, 1000], label: 'Todos los precios' },
    { value: [0, 50], label: '$0 - $50' },
    { value: [50, 150], label: '$50 - $150' },
    { value: [150, 300], label: '$150 - $300' },
    { value: [300, 1000], label: '$300+' },
  ];

  const hasActiveFilters = selectedCategory || selectedCareLevel || selectedSize || 
    (priceRange[0] !== 0 || priceRange[1] !== 1000);

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Filtros
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="text-xs"
            >
              Limpiar
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Categoría</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Nivel de cuidado</label>
          <Select value={selectedCareLevel} onValueChange={onCareLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar nivel" />
            </SelectTrigger>
            <SelectContent>
              {careLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Tamaño</label>
          <Select value={selectedSize} onValueChange={onSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tamaño" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Rango de precio</label>
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => onPriceRangeChange(range.value as [number, number])}
                className={`w-full text-left p-2 rounded text-sm transition-colors ${
                  priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <div>
            <label className="text-sm font-medium mb-2 block">Filtros activos</label>
            <div className="flex flex-wrap gap-1">
              {selectedCategory && (
                <Badge variant="secondary" className="text-xs">
                  {categories.find(c => c.value === selectedCategory)?.label}
                </Badge>
              )}
              {selectedCareLevel && (
                <Badge variant="secondary" className="text-xs">
                  {selectedCareLevel}
                </Badge>
              )}
              {selectedSize && (
                <Badge variant="secondary" className="text-xs">
                  {selectedSize}
                </Badge>
              )}
              {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                <Badge variant="secondary" className="text-xs">
                  ${priceRange[0]} - ${priceRange[1] === 1000 ? '∞' : priceRange[1]}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};