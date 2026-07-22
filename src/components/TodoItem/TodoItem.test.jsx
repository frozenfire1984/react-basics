import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import TodoItem from './TodoItem.jsx'

const item = {
    id: 'item-1',
    title: 'apple',
}

test('Renders item title', () => {
    render(
        <ul>
            <TodoItem item={item} onRemove={vi.fn()} />
        </ul>,
    )

    const listItem = screen.getByRole('listitem')

    expect(listItem).toHaveTextContent('apple')
})


test('Calls onRemove with item id', async () => {
    const user = userEvent.setup()
    const handleRemoveItem = vi.fn()

    render(
        <ul>
            <TodoItem item={item} onRemove={handleRemoveItem} />
        </ul>,
    )

    const deleteButton = screen.getByRole('button', {
        name: /delete/i,
    })

    await user.click(deleteButton)

    expect(handleRemoveItem).toHaveBeenCalledTimes(1)
    expect(handleRemoveItem).toHaveBeenCalledWith('item-1')
})