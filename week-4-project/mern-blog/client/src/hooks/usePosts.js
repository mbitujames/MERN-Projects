// src/hooks/usePosts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../services/api';

export const usePosts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => postService.getAllPosts(page, limit)
  });
};

export const useGetPost = (id) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getPost(id)
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};