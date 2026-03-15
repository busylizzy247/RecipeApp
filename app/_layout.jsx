import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (loading) return;

        const inTabsGroup = segments[0] === '(tabs)';
        const inRecipe = segments[0] === 'recipe';

        if (session && !inTabsGroup && !inRecipe) {
            router.replace('/(tabs)');
        } else if (!session && inTabsGroup) {
            router.replace('/auth');
        }
    }, [session, loading, segments]);

    if (loading) return null;

    return <Slot />;
}