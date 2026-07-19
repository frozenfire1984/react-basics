function TodoItem(props) {
    return (
        <li>
            {props.item.id} - {props.item.title}
            <button onClick={() => props.removeItem(props.item.id)}>delete</button>
        </li>
    )
}

export default TodoItem