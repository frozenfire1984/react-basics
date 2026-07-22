function TodoItem({item, onRemove}) {
    return (
        <li>
            {item.id} - {item.title}
            <button onClick={() => onRemove(item.id)}>delete</button>
        </li>
    )
}

export default TodoItem