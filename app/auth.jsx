import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function signIn() {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMessage(error.message);
    }

    async function signUp() {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setMessage(error.message);
        else setMessage('Check your email to confirm your account!');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Sign in or create an account</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {message ? <Text style={styles.message}>{message}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonOutline} onPress={signUp}>
                <Text style={styles.buttonOutlineText}>Create Account</Text>
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
    buttonOutline: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#5C7A4E',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonOutlineText: {
        color: '#5C7A4E',
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        color: '#5C7A4E',
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'center',
    },
});