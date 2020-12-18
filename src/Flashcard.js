import React, { useState } from 'react'

export default function Flashcard(props) {
    const [flip, setFlip] = useState(false);

    return (
        <div 
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
        >
            <div className='front'>
                {props.flashcard.question}
                <div className='flashcard-options'>
                    {props.flashcard.options.map(option => {
                        return <div className='flashcard-option'>{option}</div>
                    })}
                </div>
            </div>
            <div className='back'>{props.flashcard.answer}</div>
        </div>
    )
}
