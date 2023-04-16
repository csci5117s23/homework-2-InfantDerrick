import TodoBase from '@/components/TodoBase'

import { postTodo, getAllTodosBasedOnATag, toggleTodoDoneness} from '@/modules/data'
import { useRouter } from "next/router";

export default function TodoCatergory() {

    const router = useRouter();
    console.log("parent of base is at: " + router.query.category); 
    return(
    <>
      <TodoBase postTodo={postTodo} getAll={(userId, category, token) => {return getAllTodosBasedOnATag(userId, category, token)}} toggleTodoDoneness={toggleTodoDoneness} category={router.query.category}/>
    </>
  )
}
