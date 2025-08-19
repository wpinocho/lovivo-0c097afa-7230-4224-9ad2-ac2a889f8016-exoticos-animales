export interface Animal {
  id: string;
  name: string;
  species: string;
  category: 'reptiles' | 'birds' | 'mammals' | 'amphibians' | 'fish';
  price: number;
  image: string;
  description: string;
  care_level: 'Fácil' | 'Intermedio' | 'Avanzado';
  size: 'Pequeño' | 'Mediano' | 'Grande';
  lifespan: string;
  habitat: string;
  diet: string;
  in_stock: boolean;
  stock_quantity: number;
}

export interface CartItem {
  animal: Animal;
  quantity: number;
}