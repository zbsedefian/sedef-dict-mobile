import { Attributes } from "react"

export interface DictionaryResponse {
    word: string
    language: string
    pos: string
    lemma: string
    english_meaning: string
    base_meaning: string
    attributes: Attributes
}