# React State Mutation Experiment

## Reminder

When returning to React exercises, deliberately reproduce a state-mutation bug
before fixing it. The goal is to observe the failure rather than only memorize
the rule "do not mutate state."

## Experiment plan

1. Create an object or array in React state.
2. Mutate that existing value directly.
3. Pass the same reference back to the state setter.
4. Observe rendering, logs, reference equality, and behavior under
   `StrictMode`.
5. Add a second reference to the same object to demonstrate how mutation leaks
   into other consumers.
6. Repeat the update several times to expose stale or corrupted state.
7. Write a test that demonstrates the broken user-visible behavior.
8. Replace the mutation with a new object or array using object/array spread,
   `map`, or `filter`.
9. Verify that the test passes and compare reference equality before and after
   the fix.
10. Repeat the experiment with `reduce`: first mutate a shared accumulator,
    then use a fresh local accumulator.

## Cases to compare

### Direct object mutation

```js
setStats((stats) => {
  stats.done += 1
  return stats
})
```

### Immutable object update

```js
setStats((stats) => ({
  ...stats,
  done: stats.done + 1,
}))
```

### Direct nested-item mutation

```js
setTodoList((todoList) => {
  const todo = todoList.find((item) => item.id === targetId)
  todo.done = !todo.done
  return todoList
})
```

### Immutable nested-item update

```js
setTodoList((todoList) =>
  todoList.map((item) =>
    item.id === targetId
      ? { ...item, done: !item.done }
      : item,
  ),
)
```

## Reduce accumulator experiment

### Unsafe shared accumulator

Create the initial accumulator outside the calculation and reuse it:

```js
const initialStats = {
  done: 0,
  active: 0,
}

function calculateStats(todoList) {
  return todoList.reduce((stats, todo) => {
    if (todo.done) {
      stats.done += 1
    } else {
      stats.active += 1
    }

    return stats
  }, initialStats)
}
```

Call `calculateStats(todoList)` twice and observe that the second result starts
from the values left by the first call. Also verify:

```js
calculateStats(todoList) === initialStats
```

### Safe local accumulator

Create a fresh accumulator for every calculation:

```js
function calculateStats(todoList) {
  return todoList.reduce((stats, todo) => {
    if (todo.done) {
      stats.done += 1
    } else {
      stats.active += 1
    }

    return stats
  }, {
    done: 0,
    active: 0,
  })
}
```

Call the function twice and compare both values and references. The results
should contain equal values but be different objects.

### Dangerous React-state accumulator

Use the current React state object as the accumulator, mutate it, and return the
same reference:

```js
setStats((currentStats) => {
  return todoList.reduce((stats, todo) => {
    if (todo.done) {
      stats.done += 1
    } else {
      stats.active += 1
    }

    return stats
  }, currentStats)
})
```

Observe that the state object is mutated and the setter receives the same
reference. Then replace `currentStats` with a fresh accumulator or derive the
statistics directly during rendering instead of storing duplicated state.

## Questions to answer after the experiment

- Why can React skip an update when the same reference is returned?
- Why can a mutation affect another variable or component unexpectedly?
- When is mutating a local `reduce` accumulator safe?
- Why does reusing an external `reduce` accumulator corrupt repeated results?
- Why is using a React state object as a `reduce` accumulator unsafe?
- What is the difference between copying an array and copying its nested
  objects?
