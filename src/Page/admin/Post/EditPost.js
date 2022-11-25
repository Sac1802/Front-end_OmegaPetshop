import React, {useEffect, useState} from "react";
import Header from "../../../components/Header";
import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../../utils/APIInvoke";
import swal from "sweetalert";


const EditPost = () => {

    let navigate = useNavigate();

    const { id } = useParams();

    const [post, setPost] = useState({
        nameproduct: '', 
        category: '',
        productQuantity: '',
        animal: '',
        information: '',
        price: '',
        location: '',
        url: ''
    });

    const { nameproduct, category, productQuantity, animal, information, price, location, url} = post;

    const onChange = (e) => {
        setPost({
            ...post,
            [e.target.name] : e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        savePost();
    }

    const savePost = async () => {
        const data = {
            nameproduct: post.nameproduct,
            category: post.category,
            productQuantity: post.productQuantity,
            animal: post.animal,
            information: post.information,
            price: post.price,
            location: post.location,
            url: post.url
        }

        const response = await APIInvoke.invokePUT(`/update/post/${id}`, data);
        console.log(response);

        if(response.message === 'Post updated'){
            swal({
                title: 'Post updated',
                icon: 'success',
                text: `Post updated successfully`,
                buttons: {
                    confirm: {
                        text: 'Close',
                        value: true,
                        visible: true,
                        className: 'btn btn-success',
                        closeModal: true
                    }
                }
            }).then(
                navigate('/admin/view')
            );

        }else{
            console.log(response.error)
            swal({
                title: 'Unknown error',
                icon: 'error',
                text: 'Unknown error',
                buttons: {
                    confirm: {
                        text: 'Close',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }
    }

    useEffect(() => {
        async function loadPost(){
            const response = await APIInvoke.invokeGET(`/post/${id}`);
            setPost(response);
            return;
        }

        loadPost();
        document.getElementById("nameproduct").focus();
    }, []);

    return(
        <div className="text-lg-left">
            <SideBar></SideBar>
            
            <NavBar></NavBar>

            <div className="content-wrapper">
                <Header>
                title={"Edit post"}
                module={"post"}
                </Header>


                <div className="text-lg-left">
                    <form onSubmit={onSubmit}>
                        <div className="align-content-lg-start row">
                            <div className="form-group col-md-6">
                                <label>Name Product</label>
                                <input type="text" className="form-control cold-md" 
                                id="nameproduct" 
                                name="nameproduct" 
                                value={nameproduct} 
                                onChange= {onChange} required/>
                            </div>
                            <div className="align-content-lg-start row">
                                <div className="form-group col-md-6 col-md-12">
                                    <label>Category</label>
                                    <select
                                    id="category" 
                                    name="category" 
                                    value={category} 
                                    className="form-control"
                                     onChange= {onChange} required>
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
                                  onChange= {onChange} required/>
                            </div>
                            <div className="form-group col-md-6 row">
                                <label >Direction</label>
                                <input type="text" className="form-control" id="location" name="location" value={location} placeholder="Apartment, studio, or floor" onChange= {onChange} required/>
                            </div>
                        </div>
                        <div className="align-content-lg-start row">
                            <div className="form-group col-md-6">
                                <label >Information of product</label>
                                <input type="text" className="form-control" id="information" name="information" value={information} onChange= {onChange}/>
                            </div>
                            <div className="align-content-lg-end">
                                <div className="form-group col-md-12">
                                    <label>Animal</label>
                                    <select 
                                    id="animal" 
                                    name="animal" 
                                    value={animal} 
                                    className="form-control" 
                                    onChange= {onChange}>

                                        <option value={""} defaultValue disabled>Select one</option>
                                        <option >Dog</option>
                                        <option>Cat</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-md-2">
                                <label >Price</label>
                                <input type="text" className="form-control" id="price" name="price" value={price} onChange= {onChange} required/>
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
            </div>
        </div>
    );
}

export default EditPost;