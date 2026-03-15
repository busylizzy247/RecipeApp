import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('Recipes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) setRecipes(data);
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Ready to cook?</Text>
        <Text style={styles.title}>My Recipes</Text>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.empty}>Loading...</Text>
      ) : recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>No recipes yet!</Text>
          <Text style={styles.emptySubtitle}>Tap Add Recipe to get started</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({
                pathname: '/recipe',
                params: {
                  steps: item.steps,
                  name: item.name,
                },
              })}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>
                {JSON.parse(item.steps).length} steps
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF7',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
  },
  eyebrow: {
    fontSize: 13,
    color: '#5C7A4E',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  signOut: {
    fontSize: 14,
    color: '#8C8C7A',
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#F0EDE4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8C8C7A',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#8C8C7A',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8C8C7A',
    marginTop: 8,
  },
});