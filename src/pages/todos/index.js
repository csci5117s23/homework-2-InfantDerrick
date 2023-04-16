import TodoBase from '@/components/TodoBase'

import { postTodo, getAllTodos, toggleTodoDoneness, test} from '@/modules/data'

export default function Todo() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // const { user } = useUser();
  // const router = useRouter();
  // const [ todos, setTodos ]= useState([]);
  // async function handleNewTodo(data){
  //   data.uid = userId;
  //   const token = await getToken({ template: "codehooks" });
  //   console.log(data);
  //   postTodo(data, token).then((res) => { return res.json()}).then((data) => {return getAllTodosWithUserNameEstablished()}).then((data) => setTodos(data));
  // }
  // async function complete(todoid){
  //   const token = await getToken({ template: "codehooks" });
  //   toggleTodoDoneness(false, todoid, token).then((res) => {return res.json()}).then((data) => { console.log(data); return getAllTodosWithUserNameEstablished()}).then((data) => setTodos(data))
  // }
  // const loadState = React.useCallback(async () => {
  //   async function process() {
  //     if (userId) { 
  //       const token = await getToken({ template: "codehooks" });
  //       return getAllTodos(userId, token)
  //     }
  //     return [];
  //   }
  //   process().then((result) => {
  //     if(result === '403') router.push('/403');
  //     else setTodos(result);
  //   });
  // }, [isLoaded]);
  // useEffect(() => {
  //   loadState();
  // }, [loadState]); 
  // async function getAllTodosWithUserNameEstablished(){
  //   const token = await getToken({ template: "codehooks" });
  //   return getAllTodos(userId, token)
  // }
  // if (!isLoaded) return <></>;
  // else if (isLoaded && !userId) router.push("/");
  // else{
  //   return (
  //     <>
  //       <Head>
  //         <title>carpe diem</title>
  //         <meta name="description" content="carpe diem. to-do" />
  //         <meta name="viewport" content="width=device-width, initial-scale=1" />
  //         <link rel="icon" href="/carpe-diem-logo.png" />
  //       </Head>
  //       <div className="container-fluid">
  //         <div className="whiteboard">
  //           <Whiteboard name={user.firstName} handleNewTodo={handleNewTodo} todos={todos} complete={complete} reloadState={loadState}/>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
  return(
    <>
      <TodoBase postTodo={postTodo} getAll={(userId, category, token) => {return getAllTodos(userId, token)}} toggleTodoDoneness={toggleTodoDoneness} />
    </>
  )
}
