
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock} from '@fortawesome/free-regular-svg-icons'

function Timer(props) {

    const minutes = props.minutes
    const seconds = props.seconds
    

    return (
        <div className="timer--container">
            <FontAwesomeIcon icon={faClock} size='sm' />
            <h4>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h4>
        </div>
    )
}

export default Timer