import './App.css'
import DocumentList from './components/DocumentListView'
import * as React from 'react';
import MainViewContainer from './components/MainViewContainer';

function App() {

  React.useEffect(() => {
    //console.log("awa")
  }, [])

  return (
    <>
      <div className="bg-gray-200 w-full flex p-2 rounded flex-row h-screen" id='root'>

        <DocumentList></DocumentList>
        <MainViewContainer></MainViewContainer>

      </div>
    </>
  )
}

export default App
