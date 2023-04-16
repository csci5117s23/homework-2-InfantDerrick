import TodoBase from '@/components/TodoBase'

import { postTodo, getAllTodos, toggleTodoDoneness, test} from '@/modules/data'

export default function Todo() {
  return(
    <>
      <TodoBase postTodo={postTodo} getAll={(userId, category, token) => {return getAllTodos(userId, token)}} toggleTodoDoneness={toggleTodoDoneness} />
    </>
  )
}
