import { assign, createMachine } from 'xstate'

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQGVkEMAnZASwDsoBiDMsLcgN1QGs6AzMZAYwAsAVdJgDaABgC6iUAAdMJUqjKSQAD0QBaAMwasADgCsAFgMBOPcYBsAJj3mAjJY0AaEAE9E5kVgDsejea+2Gr461joGAL6RzmTocEpoGPBIIDKwciQKSqoIarbGxlgiIeYm5uYhJr7ObjmW5lg2xpYGXjqBeiEWUSAJmLgExORQSqnpmcnZzZ5eXk0GGpYiInqttjrViIFeDbYGOiJeIloGy1rdvdgASmD4EDXSsvKKE+q2eraFxaXlzaZOrohFpZvJZ9nV7KZZsYvJFIkA */
    id: 'todos',
    initial: 'Starting',
    context: {
      todos: [] as any[],
    },
    states: {
      Starting: {
        invoke: {
          id: 'fetchTodos',
          src: 'fetchTodos',
          onDone: { target: 'Ready', actions: 'assignTodos' },
        },
      },
      Ready: {
        //   on: {
        //     createTodo: {
        //       actions: assign({})
        //     },
        //   },
      },
    },
  },
  {
    actions: {
      assignTodos: (context, event) => {
        assign({
          todos: event.data,
        })
      },
    },
  }
)
