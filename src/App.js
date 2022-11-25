import React, {Fragment} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./Page/admin/Dashboard";
import EditPost from "./Page/admin/Post/EditPost";
import Posts from "./Page/admin/Post/MyPosts";
import NewPost from "./Page/admin/Post/NewPost";
import Login from "./Page/Auth/Login";
import Register from "./Page/Auth/Register";
import ViewPost from "../src/Page/admin/Post/ViewPost"
import Home from "./Page/Home";
import DeletePost from "./Page/admin/Post/DeletePost";
import ProductView from '../src/Page/ProductView'
import Home2 from "./Page/Home2";
import Info from "./Page/Information";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/home" exact element={<Home2/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/admin" exact element={<Dashboard/>}/>
          <Route path="/admin/post" exact element={<NewPost/>}/>
          <Route path="/admin/edit/:id" exact element={<EditPost/>}/>
          <Route path="/admin/view" exact element={<Posts/>}/>
          <Route path="/admin/post/view/:id" exact element={<ViewPost/>}/>
          <Route path="/admin/delete/:id" exact element={<DeletePost/>}/>
          <Route path="/post/:id" exact element={<ProductView/>}/>
          <Route path="/info" exact element={<Info/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
