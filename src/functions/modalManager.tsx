import * as React from "react"

type ModalManager={
    setModalIsOpen: any
    setModalContentType: any
    openModal:Function
}

let modalManager:ModalManager = {
    setModalIsOpen:undefined,
    setModalContentType:undefined,
    openModal: function(isOpen:boolean){
        console.log(isOpen)
        this.setModalIsOpen(()=>{return isOpen})
    }
}

export default modalManager
