import './App.css'
import RecipesList from './components/RecipeListView'
import * as React from 'react';
import MainViewContainer from './components/MainViewContainer';

function App() {

  React.useEffect(() => {
    //console.log("awa")
  }, [])

  return (
    <>
      <div className="bg-gray-200 w-full flex p-2 rounded flex-row h-screen" id='root'>

        <RecipesList></RecipesList>
        <MainViewContainer></MainViewContainer>

      </div>
    </>
  )
}

export default App
