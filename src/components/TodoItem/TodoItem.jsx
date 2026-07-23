import styles from './TodoItem.module.scss'

function TodoItem({item, onRemove, onDone}) {
    return (
        <li className={` ${styles.item}  ${item.done ? styles.item_done : ''}`}>
            <div>{item.id} </div>
            <div>{item.title}</div>
            <div>
                <button onClick={() => onRemove(item.id)}>delete</button>
                <button onClick={() => onDone(item.id)}>done</button>
            </div>
        </li>
    )
}

export default TodoItem

