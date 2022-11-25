import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/SideBar";
import APIInvoke from "../../../utils/APIInvoke";


const ViewPost = () => {

    const { id } = useParams();

    const [post, setPost] = useState({
        nameproduct: '',
        category: '',
        productQuantity: '',
        animal: '',
        information: '',
        price: '',
        location: ''
    });
    const { nameproduct, category, productQuantity, animal, information, price, location } = post;

    useEffect(() => {

        async function loadPosts() {
            const response = await APIInvoke.invokeGET(`/post/${id}`);
            setPost(response);
            return;
        }

        loadPosts(() => {
            document.getElementById("nameproduct").focus();
        });
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
                        <section className="content">
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
                                <Link to={`/admin/edit/${id}`} className="btn btn-warning"> Edit </Link>
                             </div>

                        </section>


                    </div>
                    </div>
                <Footer></Footer>

            </div>
        );
    };


export default ViewPost;