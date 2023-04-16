import TodoBase from '@/components/TodoBase'

import { useRouter } from "next/router";
import { postTodo, getAllDoneBasedOnATag, toggleTodoDoneness, test} from '@/modules/data'

export default function DoneCatergory() {
  const router = useRouter();
    return(
    <>
      <TodoBase postTodo={postTodo} getAll={(userId, category, token) => {return getAllDoneBasedOnATag(userId, category, token)}} toggleTodoDoneness={toggleTodoDoneness} category={router.query.category} donePage/>
    </>
    )
}
