import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function AddRecipeScreen() {
    const router = useRouter();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function processRecipe() {
        if (!url) {
            setError('Please enter a recipe URL');
            return;
        }
        setLoading(true);
        setError('');
        try {
            console.log('Starting fetch of URL:', url);
            // Step 1: Fetch the recipe page content
            const pageResponse = await fetch(url);
            const html = await pageResponse.text().catch(() => '');
            console.log('HTML length:', html.length);

            // Step 2: Send to Claude to process
            const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.EXPO_PUBLIC_ANTHROPIC_KEY,
                    'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                    model: 'claude-opus-4-6',
                    max_tokens: 1024,
                    messages: [
                        {
                            role: 'user',
                            content: `You are a helpful cooking assistant for people who are neurodiverse or have never cooked before.

Extract the recipe from this webpage content and break it down into simple steps.

Rules:
- Each step must be 7-15 words long
- Use plain, simple language
- List ALL preparation steps first (chopping, measuring, gathering ingredients)
- Then list the cooking steps
- Start each prep step with PREP:
- Start each cooking step with COOK:

Webpage content:
${html.substring(0, 15000)}

Return only a JSON object like this:
{
  "name": "The name of the recipe",
  "steps": [
    { "type": "prep", "step": "Chop the onion into small pieces on a board" },
    { "type": "cook", "step": "Heat oil in a pan on medium heat" }
  ]
}`,
                        },
                    ],
                }),
            });

            const claudeData = await claudeResponse.json();
            console.log('Claude response:', JSON.stringify(claudeData));

            if (claudeData.type === 'error') {
                throw new Error(claudeData.error.message);
            }

            const stepsText = claudeData.content[0].text;
            console.log('Raw Claude text:', stepsText);

            const jsonMatch = stepsText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('No valid steps returned');
            const recipe = JSON.parse(jsonMatch[0]);
            const steps = recipe.steps;
            const name = recipe.name;
            console.log('Navigating with steps:', steps.length);

            const { data: { user } } = await supabase.auth.getUser();
            console.log('Saving recipe for user:', user.id);
            const { error: saveError } = await supabase.from('Recipes').insert({
                name,
                steps: JSON.stringify(steps),
                user_id: user.id,
            });
            console.log('Save error:', saveError);

            router.push({
                pathname: '/recipe',
                params: { steps: JSON.stringify(steps), name },
            });
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a Recipe</Text>
            <Text style={styles.subtitle}>Paste a recipe link below</Text>

            <TextInput
                style={styles.input}
                placeholder="https://..."
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                keyboardType="url"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
                style={styles.button}
                onPress={processRecipe}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Process Recipe</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2C2C2C',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8C8C7A',
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        backgroundColor: '#F0EDE4',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#2C2C2C',
        marginBottom: 12,
    },
    button: {
        width: '100%',
        backgroundColor: '#5C7A4E',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: '#8C8C7A',
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'center',
    },
});