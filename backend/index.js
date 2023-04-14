
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import cors from 'cors';
import {crudlify} from 'codehooks-crudlify'
import jwtDecode from 'jwt-decode';
import { date, object, string, bool, array } from 'yup';

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
const userYup = object({
    uid: string().required(),
    tags: array().of(string()).required()
})
app.put('/updateTodo', update)
async function update(req, res) {
  const db = await Datastore.open();
  console.log(req.body);
  const data = await db.updateOne('todos', req.query._id, req.body);
  res.json(data);
}
app.get("/test", (req, res) => {
    res.json({result: "you did it!"});
});
// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todoYup, users: userYup})

// bind to serverless runtime
export default app.init();
