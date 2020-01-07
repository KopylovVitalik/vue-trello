import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
          highPriority: null
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null,
          highPriority: null
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null,
          highPriority: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
          highPriority: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
          highPriority: null
        }
      ]
    }
  ]
}
