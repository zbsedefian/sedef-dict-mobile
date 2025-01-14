export interface NounAttributes {
    gender?: string;
    number?: string;
    plural_form?: string;
    plural_type?: string;
    case_endings?: string;
    diptote?: string;
    root?: string;
    object_enclitic?: string;
}
  
export interface VerbAttributes {
    root?: string;
    conjugation_pattern?: string;
    tense?: string;
    aspect?: string;
    voice?: string;
    mood?: string;
    related_forms?: {
        past?: string;
        present?: string;
        masdar?: string;
    };
    transitivity?: string;
    verb_form?: string;
    declined_subject?: string;
    object_enclitic?: string;
}

export interface AdjectiveAttributes {
    gender?: string;
    plurality?: string;
    comparative_form?: string;
    root?: string;
}

export interface PronounAttributes {
    person?: string;
    number?: string;
    gender?: string;
    type?: string;
}

export interface AdverbAttributes {
    type?: string;
    derived_from_noun?: string;
}

export interface PrepositionAttributes {
    governed_case?: string;
    usage_examples?: string[];
    meaning?: string[];
    object_enclitic?: string;
}

export interface ParticleAttributes {
    type?: string;
    effect_on_verbs?: string;
    usage_examples?: string[];
}

type Attributes =
| { noun: NounAttributes }
| { verb: VerbAttributes }
| { adjective: AdjectiveAttributes }
| { pronoun: PronounAttributes }
| { adverb: AdverbAttributes }
| { preposition: PrepositionAttributes }
| { particle: ParticleAttributes };
