import React, { useEffect } from 'react'



const Delay  = ({children,delay}) =>{
    const [render,setRender] = React.useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setRender(true)
        },delay)
    },[])
    return (
        <>
            {render && (
                children
            )}
        </>
    )
}
export default Delay