import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeStr(questionItem.correct_answer);

          const options = [...questionItem.incorrect_answers.map(a => decodeStr(a)), answer];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeStr(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })
      .catch(err => console.log(err))
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

  }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Number of Questions</label>
          <input type='number' id='amount' min='1' step='1' defaultValue={10} ref={amountEl} />
        </div>
        <div className='form-group'>
          <button className='btn'>Generate</button>
        </div>
      </form>
      <div className='container'>
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

function decodeStr(str) {
  let textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value;
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2',
    answer: '4',
    options: [
      '2', '3', '4', '5'
    ]
  },
  {
    id: 2,
    question: 'What is 1 + 1',
    answer: '2',
    options: [
      '2', '3', '4', '5'
    ]
  },
  {
    id: 3,
    question: 'What is 2 + 3',
    answer: '5',
    options: [
      '2', '3', '4', '5'
    ]
  }
]

export default App;
