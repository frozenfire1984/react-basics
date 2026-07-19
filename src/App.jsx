import { useState } from 'react'
import './App.css'

const defaultTodoList = [
    {
        id: 1,
        title: 'apple'
    },
    {
        id: 2,
        title: 'lemon'
    },
    {
        id: 3,
        title: 'pine'
    },
]



function createId() {
    const _values = new Uint32Array(1)
    crypto.getRandomValues(_values)

    return _values[0].toString(36)
}
function App() {



    const [todoList, setTodoList] = useState(defaultTodoList)
    const todoCount = todoList.length


    const [newItem, setNewItem] = useState('')

    function handleAddItem(e) {
        e.preventDefault()
        const _trimmedNewItem = newItem.trim()




        if (_trimmedNewItem.length > 0) {
            const _objNewItem = {
                id: createId(),
                title: _trimmedNewItem,
            }

            setTodoList((todoList) => [...todoList, _objNewItem])
            setNewItem('')
        }
    }

    function handleChange(e) {
        setNewItem(e.target.value)
    }

    return (
        <>
            <h1>Todo</h1>
            <ul>
                {todoList.map((item) => (
                    <li key={item.id}>{item.id} - {item.title}</li>
                ))}
            </ul>
            count: {todoCount}
            <hr />
            <form onSubmit={handleAddItem}>
                <input
                    type="text"
                    value={newItem}
                    onChange={handleChange} />
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default App
