import TodoBase from '@/components/TodoBase'

import { toggleTodoDoneness, getAllDoneTodos} from '@/modules/data'

export default function Done() {
  return(
    <>
      <TodoBase getAll={(userId, category, token) => {return getAllDoneTodos(userId, token)}} toggleTodoDoneness={toggleTodoDoneness} donePage={true}/>
    </>
  )
}
