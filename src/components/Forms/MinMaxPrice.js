import React from 'react'

export default function MinMaxPrice({setMinPrice, setMaxPrice}) {
    return (
        <div>
            <form>
                <label>Minimum: </label>
                <input type='number' onChange={(event) => setMinPrice(event.target.value)}></input>

                <label>Maximum: </label>
                <input type='number' onChange={(event) => setMaxPrice(event.target.value)}></input>
            </form>
        </div>
    )
}
