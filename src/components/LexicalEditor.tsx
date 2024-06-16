import { $getRoot, $getSelection, EditorState } from 'lexical';
import { useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { MyDocument } from '../types/Document';

const theme = {
    // Theme styling goes here
    "background-color": "blue"
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
    console.error(error);
}

function editorOnChange(eState:EditorState, onChangeFn:Function):void{
    //console.log(eState.toJSON())
    //save editor state to recipe sections
    
    onChangeFn(JSON.stringify(eState))
}

interface IProps{
    sectionOrder:number
    initialContent:string
    recipe:MyDocument
    onChangeFn: (eState:EditorState)=>void
}

export default function Editor({sectionOrder, initialContent, recipe, onChangeFn}:IProps) {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        editorState: initialContent
    };

    return (
        <div className='relative h-full'>
            
            <LexicalComposer initialConfig={initialConfig}>
                <PlainTextPlugin
                    contentEditable={<ContentEditable className='lex-content-editable h-full'/>}
                    placeholder={<div className='lex-init-placeholder text-slate-400'>Enter some text...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin onChange={e=>{editorOnChange(e,onChangeFn)}}/>
            </LexicalComposer>
        </div>

    );
}

//<MyCustomAutoFocusPlugin />   