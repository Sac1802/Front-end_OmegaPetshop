import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/SideBar";
import APIInvoke from "../../../utils/APIInvoke";
import { Link } from "react-router-dom";

const Posts = () => {

  

  const [ posts, setPosts ] = useState(
    []
  );

  const [search, setSearch] = useState("");

  const loadPosts = async () => {
    const response = await APIInvoke.invokeGET(`/post/list`);
    console.log(response);
    setPosts(response.message);
  }

  const searchEvent = async () => {
    const response = await APIInvoke.invokeGET(`/post/list/${search}`);
    setPosts(response.message);
  }

  const onChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect( () => {
    loadPosts();
  },[]);
  return (
    <div>

      <NavBar></NavBar>

      <SideBar></SideBar>


      <div className='content-wrapper'>

        <Header
          title={"Posts list"}
          module={"Posts"}
        ></Header>

        <div className='row'>
          <div className='col-7'>
            <Link to={"/admin/post"} className="btn btn-lg btn-success" > Create post </Link>
          </div>

          <div className='col-4'>
            <button className='btn btn-primary float-right btn-sm' onClick={searchEvent} >Search</button>
            <input type="text" id="search" value={search} onChange={onChange} name="search" placeholder='Search' className="float-right" />

          </div>
          <br /><br />
        </div>
        <div className="card-body p-0">
          <table className="table table-striped projects">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>
                  Name Product
                </th>
                <th style={{ width: '23%' }}>
                  Category
                </th>
                <th style={{ width: '30%' }}>
                 Animal
                </th>
                <th>
                Price
                </th>
                <th style={{ width: '20%' }}>
                </th>
              </tr>
            </thead>
            <tbody>
                {
                  posts.map(
                    posts => 
                        <tr>
                        <td>{posts.nameproduct} </td>
                        <td> {posts.category}<br /></td>
                        <td>{posts.animal}</td>
                        <td className="project_progress">$.{posts.price}</td>
                        <td className="project-actions text-right">
                        <Link className="btn btn-primary btn-sm" to={`/admin/post/view/${ posts._id }`} title="View">
                        <i className="fas fa-eye"> </i>
                      </Link>
                      &nbsp;&nbsp;
                      <Link className="btn btn-info btn-sm" to={`/admin/edit/${ posts._id }`}  title="Edit">
                        <i className="fas fa-pencil-alt"> </i>
                      </Link>
                      &nbsp;&nbsp;
                      <Link className="btn btn-danger btn-sm" to={`/admin/delete/${posts._id}`}
                        title='Delete'> <i className="fas fa-trash"> </i>
                      </Link>
                    </td>
                  </tr>

                  )
                }
            </tbody>
          </table>
        </div>
        </div>
        </div>

        );
}

        export default Posts;