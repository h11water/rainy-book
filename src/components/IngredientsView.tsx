

export default function IngredientsView() {
    return (
        <div className="">
            <div className="m-1 text-xl font-medium">Ingredients</div>
            <div className="bg-slate-300 rounded h-2/3 mx-2 p-2 border border-slate-800">
                <ul>
                    <li>adwd</li>
                    <li>adwd</li>
                    <li>adwd</li>
                    <li>adwd</li>
                </ul>
                <br></br>
                <hr className="border-slate-800"></hr>
                <div>
                    <img className=" inline" src="../images/bootstrapIcons/plus.svg" />
                    <div className="inline">Add ingredient</div>
                </div>

                <div className="flex hidden">
                    <div className="flex-4 m-1">
                        <label htmlFor="ingredient-name" >ingredient name</label>
                    </div>

                    <div className="flex-3 m-1">
                        <label htmlFor="ingredient-amount">ingredient amount</label>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-4 m-1">
                        <input placeholder="name" id="ingredient-name" className="rounded w-full p-0.5"></input>
                    </div>

                    <div className="flex-3 m-1">
                        <input placeholder="amount" id="ingredient-amount" className="rounded w-full p-0.5"></input>
                    </div>

                    <div className="flex-1 m-1">
                        <button> <img className="bg-emerald-400 p-1 rounded-full" src="../images/bootstrapIcons/plus.svg" /></button>
                    </div>

                </div>

            </div>

        </div>

    )
}