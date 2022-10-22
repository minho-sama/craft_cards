import React = require("react")
import {useState} from "react"
// import styles from "./Card.module.css"
import "./Card.css"

//erre majd csinálni vmi menő TS típust
// const Card = (id:string, frontText:string, backText: string) => ({id: id, frontText: frontText, backText: backText})
//vagy csak megadni prop typeokat

const Card = (props:any) => {
    const {block, reArrangeCard, filterCompletedCard, index} = props
    const [isFlipped, setIsFlipped] = useState(false) 

    React.useEffect(() => {
        //animáció: menjen amikor változik az index (és aszerint lejátszani az animációt, hogy első - e vagy sem)
        //edge case: utolsó card balra megy és újra bekúszik alulról felülre

        //also: https://stackoverflow.com/questions/53253940/make-react-useeffect-hook-not-run-on-initial-render
    }, [index])
    
    //obviously a rendes szöveg legyen rajta lol
    const cardText = isFlipped ? "back of the card" : block.content[0].text

    function flipCard(){
        setIsFlipped((isFlipped) => !isFlipped) //ez így best practice?
    }

    function left (e:any){
        e.stopPropagation()
        setIsFlipped(false)
        //https://stackoverflow.com/questions/60230221/how-can-i-update-this-state-without-mutating-the-array
        reArrangeCard()
        return
    }

    function right (e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.stopPropagation();
        filterCompletedCard(block.id)
    }

    if (index === 0){
        return <div className = "card" onClick = {flipCard}>
            <span>{cardText}</span>
            <div className="arrow-button-container">
                <button onClick={(e) => left(e)}>arrow left</button>
                <button onClick={(e) => right(e)}>arrow right</button>
            </div>
        </div> 
    }

    return <div className = "card covered"></div> 
}

export default Card