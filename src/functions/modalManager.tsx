import * as React from "react"

type ModalManager={
    setModalIsOpen: any
    openModal:Function
}

let modalManager:ModalManager = {
    setModalIsOpen:undefined,
    openModal: function(isOpen:boolean){
        this.setModalIsOpen(()=>{return isOpen})
    }
}

export default modalManager
