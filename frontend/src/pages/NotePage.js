import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import jQuery from 'jquery';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = ({ match, history }) => {

    let NoteId = match.params.id;
    let [note, setNote] = useState(null);

    useEffect(() => {
        getNote();
    }, [NoteId])

    let getNote = async () => {
        if (NoteId === "new") return;

        let response = await fetch(`/api/notes/${NoteId}/`)
        let data = await response.json();

        setNote(data)
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    let updateNote = async () => {
        var csrftoken = getCookie('csrftoken');
        let response = await fetch(`/api/notes/${NoteId}/update/`, {
            'method': 'PUT',
            'headers': {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            
            'body': JSON.stringify(note)
        })
        
        let data = await response.json();

        setNote(data)
    }

    let createNote = async () => {
        var csrftoken = getCookie('csrftoken');
        let response = await fetch(`/api/notes/create/`, {
            'method': 'POST',
            'headers': {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            'body': JSON.stringify(note)
        })
    }

    let deleteNode = async () => {
        var csrftoken = getCookie('csrftoken');
        let response = await fetch(`/api/notes/${NoteId}/delete/`, {
            'method': 'DELETE',
            'headers': {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            }
        })
        
        history.push("/")
    }

    let handleSubmit = () => {
        if (NoteId !== "new" && note.body === ''){
            deleteNode();
        } else if (NoteId !== "new") {
            console.log("update called")
            updateNote();
            console.log("update called")
        } else if(NoteId === "new"){
            createNote();
        }
        
        history.push("/")
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}></ArrowLeft>
                </h3>

                {NoteId !== "new" ? (
                    <button onClick={deleteNode}> Delete </button>
                ) : (
                    <button onClick={handleSubmit}> Done </button>)
                }
            </div>

            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage
