import React from 'react'

export default function SearchForBook({ setSearchTerm }) {
    return (
        <div>
            <form>
                <label>Search: </label>
                <input type='text' onChange={(event) => setSearchTerm(event.target.value)}></input>
            </form>
        </div>
    )
}