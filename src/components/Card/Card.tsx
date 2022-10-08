import React = require("react")
import {useState} from "react"
// import styles from "./Card.module.css"
import "./Card.css"

const Card = (props:any) => {
    const {block, setCompletedCount, filterCompletedCard, index} = props
    const [isFlipped, setIsFlipped] = useState(false) 
    
    const cardText = isFlipped ? "back of the card" : block.content[0].text

    function flipCard(){
        setIsFlipped((isFlipped) => !isFlipped) //ez így best practice?
    }

    function left (){
        console.log("left")
        return
    }

    function right (){
        filterCompletedCard(block.id)
        setCompletedCount((prevCount:number) => prevCount + 1) //ez így best practice? + nem okoz felesleges re-rendert? usecallback meg hasonlókkal optimalizálni
    }

    if (index === 0){
        return <div className = "card" onClick = {flipCard}>
            <span>{cardText}</span>
            <div className="arrow-button-container">
                <button onClick={left}>arrow left</button>
                <button onClick={right}>arrow right</button>
            </div>
        </div> 
    }

    return <div className = "card covered"></div> 
}

export default Card