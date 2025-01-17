import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing icons

const NavigationBar: React.FC<{ onMenuPress: () => void; onPlusPress: () => void }> = ({
    onMenuPress,
    onPlusPress,
}) => {
    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={onMenuPress}>
                <Ionicons name="menu" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.title}>The Pearl Arabic App الصدف</Text>

            <TouchableOpacity onPress={onPlusPress}>
                <Ionicons name="add" size={24} color="#333" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default NavigationBar;
