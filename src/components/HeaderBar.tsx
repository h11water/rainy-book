import recipesManager from "../functions/recipesManager"
export default function HeadrBar({...props}) {

    return (
        <div className="sticky flex top-0 backdrop-blur-sm shadow mb-2 rounded p-2">
            <button className="rounded bg-sky-300 p-3 hover:bg-sky-500" onClick={() => { recipesManager.showRecipesList() }}>
                <span className=''>
                    <img src="../images/bootstrapIcons/arrow-bar-right.svg" />
                </span>
            </button>
            <div className="m-1 text-xl font-medium inline">{props.HeaderContent}</div>
            <button className="rounded  p-3 hover:bg-slate-300 ml-auto" onClick={() => { }} title="options">
                <span className=''>
                    <img src="../images/bootstrapIcons/three-dots-vertical.svg" />
                </span>
            </button>

        </div>
    )
}