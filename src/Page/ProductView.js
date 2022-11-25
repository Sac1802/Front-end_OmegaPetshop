import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Page/style/style.css";
import APIInvoke from '../utils/APIInvoke';
import logo from '../icon/logo.png';

const ProductView = () => {

    const { id } = useParams();

    const [post, setPosts] = useState({
        nameproduct: '',
        category: '',
        productQuantity: '',
        animal: '',
        information: '',
        price: '',
        location: '',
        url: ''
    });

    const { nameproduct, category, productQuantity, animal, information, price, location, url } = post;

    useEffect(() => {
        async function loadPost() {
            const response = await APIInvoke.invokeGET(`/post/${id}`);
            setPosts(response);
            return;
        }

        loadPost();
    });

    if (productQuantity >= 1) {
        var disponible = "Disponible"
    } else {
        var disponible = "Agotado"
    }




    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#a34bec' }}>
                    <Link className="navbar-brand text-light font-weight-bold" to={'/'}> <img src={logo} alt /> Peludos Y Traviesos</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-light font-weight-bold" to={'/register'}>Registrarse <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light font-weight-bold" to={'/login'}>Iniciar Sesion</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className=" form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn btn-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <div className="content_all">
                    <picture className="content_picture">
                        <div className="content_img">
                            <img className="img" src={url} alt={nameproduct} />
                        </div>
                    </picture>
                    <aside className="content_product">
                        <div className="content_name_product">
                            <p className="name_product"
                                id="nameproduct"
                                name="nameproduct"
                                value={nameproduct}>
                                {nameproduct}
                            </p>
                        </div>
                        <div className="contenet_information">
                            <p className="product_information"
                                id="information"
                                name="information"
                                value={information}>
                                {information}
                            </p>
                        </div>
                        <div className="content_quantity">
                            <label htmlFor="quantity" className="quantity">Cantidad de productos</label>
                            <select name="quantity" id className="select_value">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                        </div>
                        <div className="content_price">
                            <p className="product_price"
                                id="price"
                                name="price"
                                value={price}>
                                COP {price}
                            </p>
                        </div>
                        <div className="content_price">
                            <p className="product_price">
                                contidad: {disponible}
                            </p>
                        </div>
                        <button className="buy">Comprar</button>
                    </aside>
                </div>
            </div>

        </div>
    );
}

export default ProductView;