import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/SideBar";
import APIInvoke from "../../../utils/APIInvoke"
import { useNavigate } from "react-router-dom";

const NewPost = () => {

    const navigate = useNavigate();

    const [post, setPost] = useState({
        nameproduct: '',
        category: '',
        productQuantity: '',
        animal: '',
        information: '',
        price: '',
        direction: '',
        url: ''
    });

    const { nameproduct, category, productQuantity, animal, information, price, direction, url } = post;

    const onChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }
    const savePost = async () => {

        const data = {

            nameproduct: post.nameproduct,
            category: post.category,
            productQuantity: post.productQuantity,
            animal: post.animal,
            information: post.information,
            price: post.price,
            location: post.direction,
            url: post.url
        }

        const response = await APIInvoke.invokePOST(`/post/save`, data);

        if (response.message === 'Product created') {
            swal({
                title: 'Product Created',
                icon: 'success',
                text: 'Product Save',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-success',
                        closeModal: true
                    }
                }
            }).then(
                navigate('/admin/view')
            );
        } else {
            swal({
                title: 'Error',
                icon: 'error',
                text: 'Unknown error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
            setPost({
                nameproduct: '',
                category: '',
                productQuantity: '',
                animal: '',
                information: '',
                price: '',
                direction: '',
                url: ''
            });

        }
    }

    useEffect(() => {
        document.getElementById("nameproduct").focus();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        savePost();
    }


    return (

        <div>
            <SideBar></SideBar>

            <NavBar></NavBar>

            <nav className='content-wrapper'>
                <Header>
                    title={"Create post"}
                    module={"post"}
                </Header>
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="align-content-lg-start row">
                            <div className="form-group col-md-6">
                                <label>Name Product</label>
                                <input type="text" className="form-control"
                                    id="nameproduct"
                                    name="nameproduct"
                                    value={nameproduct}
                                    onChange={onChange} required />
                            </div>
                            <div className="align-content-lg-start row">
                                <div className="form-group col-md-6 col-md-12">
                                    <label>Category</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={category}
                                        className="form-control"
                                        onChange={onChange} required>
                                        <option value={""} defaultValue disabled>Select one</option>
                                        <option value="Comida">Comida</option>
                                        <option value="Juguetes">Juguetes</option>
                                        <option value="Snacks">Snacks</option>
                                        <option value="Farmacia">Farmacia</option>
                                        <option value="Cuidado y Higiene">Cuidado y Higiene</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6 ">
                                <label >product Quantity</label>
                                <input type="text" className="form-control"
                                    id="productQuantity"
                                    name="productQuantity"
                                    value={productQuantity}
                                    onChange={onChange} required />
                            </div>
                            <div className="form-group col-md-6 row">
                                <label >Direction</label>
                                <input type="text" className="form-control" id="direction" name="direction" value={direction} placeholder="Apartment, studio, or floor" onChange={onChange} required />
                            </div>
                        </div>
                        <div className="align-content-lg-start row">
                            <div className="form-group col-md-6">
                                <label >Information of product</label>
                                <input type="text" className="form-control" id="information" name="information" value={information} onChange={onChange} />
                            </div>
                            <div className="align-content-lg-end">
                                <div className="form-group col-md-12">
                                    <label>Animal</label>
                                    <select id="animal" name="animal" value={animal} className="form-control" onChange={onChange}>

                                        <option value={""} defaultValue disabled>Select one</option>
                                        <option >Dog</option>
                                        <option>Cat</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-md-2">
                                <label >Price</label>
                                <input type="text" className="form-control" id="price" name="price" value={price} onChange={onChange} required />
                            </div>
                        </div>
                        <div classname="align-content-lg-start row">
                        <div className="form-group col-md-6">
                                <label>URL Image Product</label>
                                <input type="text" className="form-control"
                                    id="url"
                                    name="url"
                                    value={url}
                                    onChange={onChange} required />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-outline-info">Enviar</button>
                    </form>

                </div>

            </nav>

            <Footer></Footer>

        </div>


    );
}

export default NewPost;