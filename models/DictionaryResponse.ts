import { Attributes } from "./Attribute"

export interface DictionaryResponse {
    word: string
    language: string
    pos: string
    lemma: string
    english_meaning: string
    base_meaning: string
    transliteration: string
    attributes: Attributes
}