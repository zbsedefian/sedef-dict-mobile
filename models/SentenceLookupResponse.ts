import { DictionaryResponse } from "./DictionaryResponse"

export interface SentenceLookupResponse {
    translation: string
    words: [DictionaryResponse]
}