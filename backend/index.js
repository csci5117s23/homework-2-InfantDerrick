
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import jwtDecode from 'jwt-decode';

// test route for https://<PROJECTID>.api.codehooks.io/dev/

const userAuth = async (req, res, next) => {
    
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
        const token_parsed = jwtDecode(token);
        req.user_token = token_parsed;
      }
      next();
    } catch (error) {
      next(error);
    } 
  }
app.use(userAuth)
app.get("/test", (req, res) => {
    res.json({result: "you did it!"});
});

// Use Crudlify to create a REST API for any collection
crudlify(app)

// bind to serverless runtime
export default app.init();
