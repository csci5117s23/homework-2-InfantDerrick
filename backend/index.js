
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, bool, array } from 'yup';
import jwtDecode from 'jwt-decode';

// test route for https://<PROJECTID>.api.codehooks.io/dev/
const todoYup = object({
    uid: string().required(),
    title: string().required(),
    description: string().required(),
    done: bool().default(false),
    tags: array().of(string()).required(),
    createdOn: date().default(() => new Date()),
    dueOn: date().required()
});
const tagYup = object({
    uid: string().required(),
    tag: string().required()
})
const userAuth = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      console.log(authorization)
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        const token_parsed = jwtDecode(token);
        console.log(token_parsed)
        req.user_token = token_parsed;
      }else{
        res.status(403).end();
        return;
      }
      next();
    } catch (error) {
      next(error);
    } 
  }
app.use(userAuth)
app.put('/updateTodo', update)
async function update(req, res) {
  const db = await Datastore.open();
  console.log(req.body);
  const data = await db.replaceOne('todos', req.query._id, req.body);
  console.log(data);
  res.json(data);
}
app.put('/updateTag', updateTag)
async function updateTag(req, res){
  const db = await Datastore.open();
  console.log(req.body);
  const data = await db.replaceOne('tags', req.query._id, req.body);
  console.log(data);
  res.json(data);
}
app.get("/test", (req, res) => {
    res.json({result: "you did it!"});
});
// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todoYup, tags: tagYup})

// bind to serverless runtime
export default app.init();
