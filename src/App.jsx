import { useState } from 'react'
import styles from './App.module.scss'
import TodoItem from './components/TodoItem/TodoItem.jsx';

const defaultTodoList = [
    {
        id: 1,
        title: 'apple',
        done: true,
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
                done: false
            }

            setTodoList((todoList) => [...todoList, _objNewItem])
            setNewItem('')
        }
    }
    
    
    function handleRemoveItem(id) {
        setTodoList((currentTodoList) => {
            const _updatedTodoList = currentTodoList.filter((item) => {
                return item.id !== id
            })
            return _updatedTodoList
        })
    }

    function handleDoneItem(id) {
        setTodoList((currentTodoList) => {
            const _updatedTodoList = currentTodoList.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        done: !item.done
                    }
                }

                return item
            })
            return _updatedTodoList
        })
    }

    function handleChange(e) {
        setNewItem(e.target.value)
    }

    return (
        <section className={styles.container}>
            <h1>Todo</h1>
            <ul className={styles.itemList}>
                {todoList.map((item) => (
                    <TodoItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                        onDone={handleDoneItem}
                    />
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
        </section>
    )
}

export default App
