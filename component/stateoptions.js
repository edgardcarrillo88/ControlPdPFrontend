import { createContext, useContext, useState } from "react"

const AppContext = createContext({
    isOpen: true,
    openCart: () => { },
    CloseCart: () => { }
})

export default function stateoptions({ children }) {

    const [isOpen, SetIsOpen] = useState(false)

    function handleOpenCart() {
        SetIsOpen(true)
    }

    function handleCloseCart() {
        SetIsOpen(false)
    }

    return (
        <AppContext.Provider value={{
            isOpen: isOpen,//el primero es el nombre de la propiedad definida en AppContext, el segundo es el nombre de la varibale, cuando estos tienen el mismo nombre es posible tambien solo escribir una vez "isOpen"
            openCart: handleOpenCart,
            CloseCart: handleCloseCart
        }}>{children}</AppContext.Provider>
    )

}

export function useAppContext() {
    return (
        useContext(AppContext)
    )
};