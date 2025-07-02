
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useInteractionLogging = () => {
  const { user } = useAuth();

  const logInteraction = async (
    type: 'disease_query' | 'market_query' | 'scheme_query' | 'general_chat',
    inputMethod: 'text' | 'voice' | 'image',
    inputContent?: string
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('interaction_logs')
        .insert({
          user_id: user.id,
          type,
          input_method: inputMethod,
          input_content: inputContent
        });

      if (error) {
        console.error('Error logging interaction:', error);
      }
    } catch (error) {
      console.error('Error logging interaction:', error);
    }
  };

  return { logInteraction };
};
