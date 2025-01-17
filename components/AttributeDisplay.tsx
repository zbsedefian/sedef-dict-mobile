import { Attributes } from '@/models/Attribute';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttributeDisplay: React.FC<{ attributes: Attributes }> = ({ attributes }) => {
  const renderPartOfSpeechIcon = (label: string, style: object) => (
    <View style={[styles.typeIcon, style]}>
      <Text style={styles.iconText}>{label}</Text>
    </View>
  );

  const renderFeatureIcon = (label: string) => (
    <View style={styles.featureIcon}>
      <Text style={styles.iconText}>{label.slice(0, 3)}</Text>
    </View>
  );

  switch (attributes.type) {
    case 'noun':
      return (
        <View style={styles.attributeContainer}>
          {renderPartOfSpeechIcon('N.', styles.nounIcon)}

          {attributes.noun?.gender && (
            <View
              style={[
                styles.genderIcon,
                attributes.noun.gender === 'feminine' ? styles.feminine : styles.masculine,
              ]}
            >
              <Text style={styles.iconText}>
                {attributes.noun.gender === 'feminine' ? 'F' : 'M'}
              </Text>
            </View>
          )}

          {attributes.noun?.number && (
            <View style={styles.numberIcon}>
              <Text style={styles.iconText}>
                {attributes.noun.number === 'singular'
                  ? 'Sg.'
                  : attributes.noun.number === 'dual'
                  ? 'Dl.'
                  : 'Pl.'}
              </Text>
            </View>
          )}
        </View>
      );

    case 'verb':
      return (
        <View style={styles.attributeContainer}>
          {renderPartOfSpeechIcon('V.', styles.verbIcon)}

          {/* Verb Features as Icons */}
          {attributes.verb?.tense && renderFeatureIcon(attributes.verb.tense)}
          {attributes.verb?.aspect && renderFeatureIcon(attributes.verb.aspect)}
          {attributes.verb?.voice && renderFeatureIcon(attributes.verb.voice)}
          {attributes.verb?.mood && renderFeatureIcon(attributes.verb.mood)}
          {attributes.verb?.verb_form && renderFeatureIcon(attributes.verb.verb_form)}
        </View>
      );

    case 'adjective':
      return (
        <View style={styles.attributeContainer}>
          {renderPartOfSpeechIcon('Adj.', styles.adjectiveIcon)}
        </View>
      );

    case 'pronoun':
      return (
        <View style={styles.attributeContainer}>
          {renderPartOfSpeechIcon('Pron.', styles.pronounIcon)}
        </View>
      );

    case 'adverb':
      return (
        <View style={styles.attributeContainer}>
          {renderPartOfSpeechIcon('Adv.', styles.adverbIcon)}
        </View>
      );

    case 'preposition':
      return (
        <View style={styles.attributeContainer}>
          {renderPartOfSpeechIcon('Prep.', styles.prepositionIcon)}
        </View>
      );

    case 'particle':
      return (
        <View style={styles.attributeContainer}>
          {renderPartOfSpeechIcon('Part.', styles.particleIcon)}
        </View>
      );

    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow icons to wrap if they don't fit in one row
  },
  typeIcon: {
    width: 40,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  featureIcon: {
    width: 50,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  genderIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  numberIcon: {
    width: 30,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  feminine: {
    backgroundColor: 'red',
  },
  masculine: {
    backgroundColor: 'blue',
  },
  nounIcon: {
    backgroundColor: '#444',
  },
  verbIcon: {
    backgroundColor: '#ff8c00',
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
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default AttributeDisplay;
