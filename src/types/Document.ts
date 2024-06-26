import { EditorState } from "lexical"

export type MyDocument = {
    id: string
    name: string
    description: string
    dateCreated: string
    dateModified: string
    ingredients: string[]
    sections: Section[]
    mainImage:string
}

export enum DocumentType{
    blank,
    log,
    instruction,
    guitarTablature
}

export type Section = {
    sectionOrder: number | string
    header: string
    type: SectionType
    content: string
    lexiContent: EditorState | undefined
    canvasDataUrl: string | undefined
}

export enum SectionType{
    text,    
    photo,
    drawing,
    youtubeVideo
}