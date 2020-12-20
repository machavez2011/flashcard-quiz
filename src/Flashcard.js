import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard(props) {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');

    const frontEl = useRef();
    const backEl = useRef();

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100));
    }

    useEffect(setMaxHeight, [props.flashcard.question, props.flashcard.answer, props.flashcard.options]);

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight); 
    }, [])

    return (
        <div 
            className={`card ${flip ? 'flip' : ''}`}
            style={{ height: height }}
            onClick={() => setFlip(!flip)}
        >
            <div className='front' ref={frontEl}>
                {props.flashcard.question}
                <div className='flashcard-options'>
                    {props.flashcard.options.map(option => {
                        return <div className='flashcard-option'>{option}</div>
                    })}
                </div>
            </div>
            <div className='back' ref={backEl}>{props.flashcard.answer}</div>
        </div>
    )
}
