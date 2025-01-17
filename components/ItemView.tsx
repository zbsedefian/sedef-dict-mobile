import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AttributeDisplay from '@/components/AttributeDisplay';
import { Attributes } from '@/models/Attribute';

const ItemView: React.FC<{ attributes: Attributes; item: { lemma: string; base_meaning: string, transliteration: string } }> = ({ attributes, item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <AttributeDisplay attributes={attributes} />
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles.lemmaText}>{item.lemma} - {item.base_meaning}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        paddingRight: 10,
        flexGrow: 1,
        flexShrink: 0,
    },
    rightContainer: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'flex-end', // Ensures all text is right-aligned
    },
    lemmaText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'right', // Right-align lemma text
    },
});

export default ItemView;
