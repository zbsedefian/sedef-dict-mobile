import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const KeyComponent = () => {
    const [showKeys, setShowKeys] = useState(false);

    const toggleKeys = () => {
        setShowKeys((prev) => !prev);
    };

    const renderIcon = (label: string, text: string, style: object = {}) => (
        <View style={styles.keyItem}>
            <View style={[styles.iconContainer, style]}>
                <Text style={styles.iconText}>{label}</Text>
            </View>
            <Text style={styles.label}>{text}</Text>
        </View>
    );

    return (
        <View style={styles.keyContainer}>
            <TouchableOpacity onPress={toggleKeys} style={styles.keyToggleButton}>
                <Text style={styles.keyToggleText}>{showKeys ? 'Hide Key' : 'Show Key'}</Text>
            </TouchableOpacity>

            {showKeys && (
                <View>
                    <View style={styles.keyItemsRow}>
                        {/* Part of Speech Icons */}
                        {renderIcon('V.', 'Verb', styles.verbIcon)}
                        {renderIcon('N.', 'Noun', styles.nounIcon)}
                        {renderIcon('Adj.', 'Adjective', styles.adjectiveIcon)}
                        {renderIcon('Pron.', 'Pronoun', styles.pronounIcon)}
                        {renderIcon('Adv.', 'Adverb', styles.adverbIcon)}
                        {renderIcon('Prep.', 'Preposition', styles.prepositionIcon)}
                        {renderIcon('Part.', 'Particle', styles.particleIcon)}

                        {/* Gender Icons */}
                        {renderIcon('F', 'Feminine', styles.feminineIcon)}
                        {renderIcon('M', 'Masculine', styles.masculineIcon)}

                        {/* Number Icons */}
                        {renderIcon('Sg.', 'Singular', styles.numberIcon)}
                        {renderIcon('Dl.', 'Dual', styles.numberIcon)}
                        {renderIcon('Pl.', 'Plural', styles.numberIcon)}

                        {/* Verb Features */}
                        {renderIcon('Past', 'Past Tense', styles.featureIcon)}
                        {renderIcon('Pres.', 'Present Tense', styles.featureIcon)}
                        {renderIcon('Perf.', 'Perfective Aspect', styles.featureIcon)}
                        {renderIcon('Acti.', 'Active Voice', styles.featureIcon)}
                        {renderIcon('Pass.', 'Passive Voice', styles.featureIcon)}
                        {renderIcon('Ind', 'Indicative Mood', styles.featureIcon)}
                        {renderIcon('Sub', 'Subjective Mood', styles.featureIcon)}
                        {renderIcon('Jus', 'Passive Mood', styles.featureIcon)}
                        {renderIcon('I', 'Verb Form I', styles.featureIcon)}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    keyContainer: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    keyToggleButton: {
        backgroundColor: '#887BFF', // Distinct blue color
        paddingVertical: 6, // Vertical padding
        paddingHorizontal: 12, // Horizontal padding
        borderRadius: 8, // Rounded corners
        alignSelf: 'flex-start', // Prevent full-width stretching
    },
    keyToggleText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    keyTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    keyItemsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 5,
    },
    keyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        marginRight: 10,
    },
    iconContainer: {
        width: 30,
        height: 15,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    iconText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 8,
    },
    label: {
        fontSize: 12,
        color: '#333',
    },
    verbIcon: {
        backgroundColor: '#ff8c00',
    },
    nounIcon: {
        backgroundColor: '#444',
    },
    adjectiveIcon: {
        backgroundColor: '#6b8e23',
    },
    pronounIcon: {
        backgroundColor: '#4169e1',
    },
    adverbIcon: {
        backgroundColor: '#ff6347',
    },
    prepositionIcon: {
        backgroundColor: '#20b2aa',
    },
    particleIcon: {
        backgroundColor: '#8a2be2',
    },
    feminineIcon: {
        backgroundColor: '#009900',
    },
    masculineIcon: {
        backgroundColor: 'blue',
    },
    numberIcon: {
        backgroundColor: 'gray',
    },
    featureIcon: {
        backgroundColor: '#888',
    },
});

export default KeyComponent;
