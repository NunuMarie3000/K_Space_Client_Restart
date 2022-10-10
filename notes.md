# To Do

1.I wanna have access to other users and be able to view other users profile pages and blogs

2.Maybe like vibe social, do a dropdown button with all users' usernames, when you click it, have a param page that renders their profile page and blogs: something like this in my index.js file

```javascript  
  <Route path="/:userId" element={UserPage} >
    <Route path="/:userId/blogs" element={UserBlogs} />
  </Route>
```

3.How am i setting up my routes in my server?

* /users route gets all my users
* userModel return 
