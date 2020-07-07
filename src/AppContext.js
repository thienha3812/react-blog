import React from 'react'




const AppContext = React.createContext({
    tags : [],
    categories : [],
    popular_article : {

    }
})
const AppProvider = AppContext.Provider
const AppConsumer = AppContext.Consumer
export {
    AppContext,
    AppProvider,
    AppConsumer
}