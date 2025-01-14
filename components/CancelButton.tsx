import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CancelButton({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>X</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 100,
        position: 'absolute',
        left: 15,
    },
    text: {
        color: '#999',
        fontWeight: 'bold',
    },
});