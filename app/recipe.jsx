import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecipeScreen() {
    const { steps: stepsJson, name } = useLocalSearchParams();
    const steps = JSON.parse(stepsJson);
    const [ticked, setTicked] = useState({});
    const router = useRouter();

    function toggleTick(index) {
        setTicked(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    }

    const prepSteps = steps.filter(s => s.type === 'prep');
    const cookSteps = steps.filter(s => s.type === 'cook');
    const totalSteps = steps.length;
    const tickedCount = Object.values(ticked).filter(Boolean).length;
    const allDone = tickedCount === totalSteps;

    if (allDone) {
        return (
            <View style={styles.completionContainer}>
                <Text style={styles.completionEmoji}>🍽️</Text>
                <Text style={styles.completionTitle}>Well done!</Text>
                <Text style={styles.completionSubtitle}>You've completed every step. Enjoy your meal!</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/addrecipe')}>
                    <Text style={styles.buttonText}>Cook Another Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOutline} onPress={() => router.replace('/(tabs)')}>
                    <Text style={styles.buttonOutlineText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            {name && <Text style={styles.recipeName}>{name}</Text>}
            <Text style={styles.progressText}>{tickedCount} of {totalSteps} steps done</Text>

            <Text style={styles.sectionTitle}>Preparation</Text>
            {prepSteps.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.step, ticked[index] && styles.stepTicked]}
                    onPress={() => toggleTick(index)}
                >
                    <View style={[styles.tick, ticked[index] && styles.tickDone]}>
                        {ticked[index] && <Text style={styles.tickMark}>✓</Text>}
                    </View>
                    <Text style={[styles.stepText, ticked[index] && styles.stepTextTicked]}>
                        {item.step}
                    </Text>
                </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Cooking</Text>
            {cookSteps.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.step, ticked[prepSteps.length + index] && styles.stepTicked]}
                    onPress={() => toggleTick(prepSteps.length + index)}
                >
                    <View style={[styles.tick, ticked[prepSteps.length + index] && styles.tickDone]}>
                        {ticked[prepSteps.length + index] && <Text style={styles.tickMark}>✓</Text>}
                    </View>
                    <Text style={[styles.stepText, ticked[prepSteps.length + index] && styles.stepTextTicked]}>
                        {item.step}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF7',
    },
    content: {
        padding: 24,
    },
    backButton: {
        marginBottom: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: '#5C7A4E',
        fontWeight: 'bold',
    },
    progressText: {
        fontSize: 14,
        color: '#8C8C7A',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C2C2C',
        marginTop: 24,
        marginBottom: 16,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0EDE4',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
    },
    stepTicked: {
        backgroundColor: '#E8EDE4',
        opacity: 0.7,
    },
    tick: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#5C7A4E',
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tickDone: {
        backgroundColor: '#5C7A4E',
    },
    tickMark: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepText: {
        fontSize: 16,
        color: '#2C2C2C',
        flex: 1,
        lineHeight: 22,
    },
    stepTextTicked: {
        color: '#8C8C7A',
    },
    completionContainer: {
        flex: 1,
        backgroundColor: '#FAFAF7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    completionEmoji: {
        fontSize: 64,
        marginBottom: 24,
    },
    completionTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2C2C2C',
        marginBottom: 12,
    },
    completionSubtitle: {
        fontSize: 16,
        color: '#8C8C7A',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    button: {
        width: '100%',
        backgroundColor: '#5C7A4E',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonOutline: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#5C7A4E',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    buttonOutlineText: {
        color: '#5C7A4E',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recipeName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C2C2C',
        marginBottom: 4,
        marginTop: 8,
    },
});