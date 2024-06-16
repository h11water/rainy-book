import * as React from "react"

type ModalManager={
    setModalIsOpen: any
    setModalContentType: any
    openModal:Function
    setContent:Function
}

let modalManager:ModalManager = {
    setModalIsOpen:undefined,
    setModalContentType:undefined,
    openModal: function(isOpen:boolean){
        //console.log(isOpen , this.setModalContentType)
        this.setModalIsOpen(()=>{return isOpen})
    },
    setContent: function(){
        //console.log("aaa")
    },
}

export default modalManager
