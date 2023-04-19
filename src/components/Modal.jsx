import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar, faClock} from "@fortawesome/free-regular-svg-icons"
import {nanoid} from "nanoid"

function Modal(props) {
    
    const time = props.time
    const starRating = t => {
        if (t <= 30) {
            return [solidStar, solidStar, solidStar]
        } else if (t > 30 && t <= 60) {
            return [solidStar, solidStar, emptyStar]
        } else if (t > 60 && t <= 90) {
            return [solidStar, emptyStar, emptyStar]
        } else {
            return [emptyStar, emptyStar, emptyStar]
        }
    }

    const starIcons = starRating(time);

    const getStarRating = starIcons.map(start =>{
        const id = nanoid()
        return (
            <FontAwesomeIcon icon={start} size='2xl' className="starIcon" key={id}/>
        )
    })

    return (
        <div className="modal">
            <div className="star">
                {getStarRating}
            </div>
            <h1>You Won!</h1>
            <h3 className="modalTimer"><FontAwesomeIcon icon={faClock} className="timerIcon"/>
            {`${props.minutes.toString().padStart(2, '0')}:${props.seconds.toString().padStart(2, '0')}`}</h3>
            <button onClick={props.newGame} className="newGame">NEW GAME</button>
    </div>
    )
}

export default Modal