import React from 'react'
import { Link } from 'react-router-dom'

const ItemList = ({note}) => {

    let getTitle = (note) => {
        let title = note.body;

        if(title.length > 45){
            return title.slice(0, 45)
        }
        return title;
    }

    let getTime = (note) => {
        return new Date(note.updated).toLocaleDateString();
    }

    let getContent = (note) => {
        let title = getTitle(note)
        let content = note.body.replaceAll(title, '').replaceAll('\n', ' ')
    
        if (content.length > 45) {
            return content.slice(0, 45) + '...'
        } else {
            return content
        }
    }

    return (
        <div>
            <Link to={`/note/${note.id}`}>
                 
                <div className="notes-list-item">
                    <h3>{getTitle(note)}</h3>
                    <p><span>{getTime(note)}</span>{getContent(note)}</p>
                </div>
                
            </Link>
        </div>
    )
}

export default ItemList