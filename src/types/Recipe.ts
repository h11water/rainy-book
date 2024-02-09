import { EditorState } from "lexical"

export type Recipe = {
    id: string
    name: string
    description: string
    dateCreated: string
    dateModified: string
    ingredients: string[]
    sections: Section[]
    mainImage:string
}

export enum SocumentType{
    blank,
    log,
    instruction,
    guitarTablature
}

export type Section = {
    sectionOrder: number
    header: string
    type: SectionType
    content: string
    lexiContent: EditorState | undefined
}

export enum SectionType{
    text,    
    photo,
    drawing,
    youtubeVideo
}