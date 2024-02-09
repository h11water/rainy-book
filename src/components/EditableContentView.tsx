export default function EditableContent({ ...props }) {
    return (
        <>
            <div className={props.className} contentEditable suppressContentEditableWarning={true} onInput={(e)=>props.onInputFn(e)}>
                {props.initialContent}
            </div>
        </>
    )
}