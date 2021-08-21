import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';


const ThoughtForm = () => {
    const [thoughtText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [titleCharacterCount, setTitleCharacterCount] = useState(0);
    const [title, setTitle] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [photoURLCount, setPhotoURLCount] = useState('');

    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        update(cache, { data: { addThought } }) {
            try {
                // could potentially not exist yet, so wrap in a try...catch
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: { thoughts: [addThought, ...thoughts] }
                });
            } catch (e) {
                console.error(e);
            }

            // update me object's cache, appending new thought to the end of the array
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
            });
        }
    });


    const handleChange = event => {
        console.log(event.target.name)
        if (event.target.name === 'photoURL' && event.target.value.length <= 200) {
            setPhotoURL(event.target.value);
            setPhotoURLCount(event.target.value.length);
        }

        if (event.target.name === 'title' && event.target.value.length <= 150) {
            setTitle(event.target.value);
            setTitleCharacterCount(event.target.value.length);

        }
        else if (event.target.name === 'blogpost' && event.target.value.length <= 500) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add thought to database
            await addThought({
                variables: { thoughtText }
            });

            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <h1>
                Create a post!
            </h1>
            {/* <p className={`m-0 ${characterCount === 500 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/500
                {error && <span className="ml-2">Something went wrong...</span>}
            </p> */}
            <form className="flex-column justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}>
                <label for='title'>
                    Title - Character Count: {titleCharacterCount}/150
                    {error && <span className="ml-2">Something went wrong...</span>}
                </label>
                <input name='title'
                    placeholder="Title"
                    value={title}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></input>
                <label for='blogpost'>
                    Description - Character Count: {characterCount}/500
                    {error && <span className="ml-2">Something went wrong...</span>}
                </label>
                <textarea name='blogpost'
                    placeholder="Description"
                    value={thoughtText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <label for='photoURL'>
                    Add Photo URL - Character Count: {photoURLCount}/200
                    {error && <span className="ml-2">Something went wrong...</span>}
                </label>
                {/* PHOTO URL WITH BUTTON */}
                <input name='photoURL'
                    placeholder="Please input photo URL"
                    value={photoURL}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></input>
                <button className="btn col-12 col-md-3" >
                    Upload
                </button>
                {/* SUBMIT BUTTON */}
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ThoughtForm;