import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix} from '@fortawesome/free-solid-svg-icons'

export default function Die(props) {
    const dieIsHeldStyle = {color: props.isHeld ? ' #F5F5F5' : "#202020"}
    const dieFaces = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix]

    const dieIsHeldBackground = {
        backgroundColor: props.isHeld ? "#202020" : " #F5F5F5",
        outline: props.isHeld ? "3px solid #202020" : "none",
    }

    return (
        <div 
            className="die-face" 
            style={dieIsHeldBackground}
            onClick={props.holdDice}
        >
            <FontAwesomeIcon style={dieIsHeldStyle} icon={dieFaces[props.value]} className="dieIcon"/>
        </div>
    )
}