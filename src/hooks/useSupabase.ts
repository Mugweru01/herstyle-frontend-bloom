import { supabase } from '@/integrations/supabase/client';

export const useSupabase = () => {
  const insertMessage = async (name: string, email: string, subject: string, message: string) => {
    const { error } = await supabase.from('messages').insert([{ name, email, subject, message }]);
    return { error };
  };

  // Add other common Supabase interactions here as needed

  return {
    insertMessage,
    // Return other functions here
  };
};