import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecipeScreen() {
    const { steps: stepsJson } = useLocalSearchParams();
    const steps = JSON.parse(stepsJson);
    const [ticked, setTicked] = useState({});

    function toggleTick(index) {
        setTicked(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    }

    const prepSteps = steps.filter(s => s.type === 'prep');
    const cookSteps = steps.filter(s => s.type === 'cook');

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
});