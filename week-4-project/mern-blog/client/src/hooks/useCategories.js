// src/hooks/useCategories.js
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories()
  });
};