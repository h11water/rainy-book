import recipesManager from "../functions/recipesManager";


export default function () {
    return (
        <div className="fade-in">
            <div className="m-1 text-xl font-medium inline">Settings</div>
            <span className="rounded center opacity-70">
                <img src="./images/settingsMascot.png" alt="" />
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />

                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">

                </div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Checked toggle</span>

            </label>
            <br></br>
            <div className="flex flex-col">
                <button className="btn btn-sky"> clear localstorage</button>
                <button className="btn btn-sky" onClick={()=>{recipesManager.resetDefaultRecipes()}}> get default recipes json</button>
            </div>


        </div>
    )
}