import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/SideBar";
import APIInvoke from "../../../utils/APIInvoke";


const DeletePost = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [post, setPosts] = useState({
        nameproduct: '',
        category: '',
        productQuantity: '',
        animal: '',
        information: '',
        price: '',
        location: ''
    });
    const { nameproduct, category, productQuantity, animal, information, price, location } = post;

    const loadPosts = async () => {

        const response = await APIInvoke.invokeGET(`/post/${id}`);
        setPosts(response);
      };
    

      const deletePost = async (e, id) => {
    
        e.preventDefault();
    
        swal({
          title: 'Deleted post',
          icon: 'error',
          text: `Are you sure you want to delete this post?`,
          buttons: {
            confirm: {
              text: 'Delete',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            },
            cancel: {
              text: 'Cancel',
              value: false,
              visible: true,
              className: 'btn btn-default',
              closeModal: true
            }
          }
        }).then( async (value) => {
    
          if (value) {
    
            const response = await APIInvoke.invokeDELETE(`/delete/post/${id}`);
            console.log(response);
            if (response.message === "Post deleted") {
                
              swal({
                title: 'Post deleted',
                icon: 'success',
                text: `Deleted`,
                buttons: {
                  confirm: {
                    text: 'Close',
                    value: true,
                    visible: true,
                    className: 'btn btn-success',
                    closeModal: true
                  }
                }
              })
    
              loadPosts();
              navigate('/admin/view');
    
            }
    
          }
    
        });
    
      }

      useEffect(() => {
        loadPosts();
      }, []);
    
    

        return (
            <div>

                <NavBar></NavBar>

                <SideBar></SideBar>

                <div className='content-wrapper'>
                    <Header>
                        title={"Create post"}
                        module={"post"}
                    </Header>

                
                    <div>
                        <section className="content font-weight-bold ">
                            <div className="row">
                                <div className="form-group form-group col-md-6 col-md-6">
                                    <label htmlFor="nameproduct">Name Product</label>
                                    <input type="text" className="form-control" 
                                    id="nameproduct"
                                    name="nameproduct"
                                    value={nameproduct} 
                                    disabled
                                    />
                                </div>
                                <div className="form-group form-group col-md-6 col-md-6">
                                    <label htmlFor="location">Direction</label>
                                    <input type="text" className="form-control" 
                                    id="location"
                                    name="location"
                                    value={location}
                                    disabled
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group form-group col-md-6 col-md-6">
                                    <label htmlFor="category">Category</label>
                                    <select className="form-control" 
                                    id="category"
                                    name="category"
                                    value={category}
                                    disabled>
                                        <option>{category}</option>
                                    </select>
                                </div>
                                <div className="form-group form-group col-md-6 col-md-6">
                                    <label htmlFor="animal">Animal</label>
                                    <select className="form-control" 
                                    id="animal"
                                    name="animal"
                                    value={animal}
                                    disabled>
                                        <option>{animal}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group form-group col-md-6 col-md-6">
                                    <label htmlFor="productQuantity">Product Quantity</label>
                                    <input type="text" className="form-control" 
                                    id="productQuantity"
                                    name="productQuantity"
                                    value={productQuantity}
                                    disabled />
                                </div>
                                <div className="form-group form-group col-md-6 col-md-6">
                                    <label htmlFor="price">Price</label>
                                    <input type="text" className="form-control" 
                                    id="price"
                                    name="price"
                                    value={price}
                                    disabled />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="information">Information</label>
                                <textarea className="form-control" 
                                id="information"
                                name="information"
                                value={information}
                                disabled rows={3} defaultValue={""} />
                            </div>
                            <div className="offset-4 col-md-4">
                                <Link to={"/admin/view"} className="btn btn-secondary">Cancel</Link>
                                &nbsp;
                                <button onClick={(e) => {deletePost(e, post._id)}} className="btn btn-warning"> Delete </button>
                             </div>

                        </section>


                    </div>
                    </div>
                <Footer></Footer>

            </div>
        );
    };

    export default DeletePost;