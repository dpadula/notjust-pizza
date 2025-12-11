import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../providers/AuthProvider';

export const useAdminOrderstList = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrderstList = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  return useQuery({
    queryKey: ['orders', { userId: userId }],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
