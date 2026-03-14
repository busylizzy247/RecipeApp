import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hgaikbnhmappxiuqvpbl.supabase.co';
const supabaseAnonKey = 'sb_publishable_Wxujt-y65Y_lj4N7b7ia_w_Y0kx-Ikh';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});