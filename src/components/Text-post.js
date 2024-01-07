import React, { useState } from 'react'; 

export default function TextPost(props) {
    const [text, setText] = useState(''); // state to store the textarea value

    const handleSubmit = (event) => {
        event.preventDefault();
        if (text.trim() !== '') { // check if the text is not empty
          props.addPost(text);
          setText('');
        } else {
          alert('Please enter some text before submitting.');
        }
      };

    const handleChange = (event) => {
        setText(event.target.value); // update the textarea value when it changes
    };

    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h1 className="mb-3">Something on your Mind?...</h1> {/* heading */}
            <label htmlFor="myBox" className="form-label">Write a Post!...</label>
            <textarea 
  className="form-control" 
  id="myBox" 
  rows="3" 
  value={text} 
  onChange={handleChange}
  style={{
    marginTop: '20px',
    fontSize: '18px',
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #ccc',
  }}
/>
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
    );
}