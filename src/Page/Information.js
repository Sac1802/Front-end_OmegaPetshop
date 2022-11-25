import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import APIInvoke from "../utils/APIInvoke";

const Info = () => {

    const navigate = useNavigate();

    const [post, setPost] = useState({

        nombre: '',
        direction1: '',
        direction2: '',
        postal: '',
        cv: '',
        numbercard: '',
        expirecard: '',
        city: ''
    });

    const { nombre, direction1, direction2, postal, cv, numbercard, expirecard, city} = post;

    const onChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }
    const saveInfo = async () => {

        const data = {

            nombre: post.nombre,
            direction1: post.direction1,
            direction2: post.direction2,
            postal: post.postal,
            cv: post.cv,
            price: post.price,
            numbercard: post.numbercard,
            expirecard: post.expirecard,
            city: post.city
        }

        const response = await APIInvoke.invokePOST(`/info/save`, data);
        console.log(response);

        if (response.message === 'info save') {
            swal({
                title: 'Info Save',
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
                navigate('/')
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
                nombre: '',
                direction1: '',
                direction2: '',
                postal: '',
                cv: '',
                numbercard: '',
                expirecard: '',
                city: ''
            });

        }
    }

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        saveInfo();
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="col-6">
                    <label htmlFor="inputTitular" className="form-label">Nombre del titular</label>
                    <input type="text" 
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={onChange} className="form-control"  placeholder="Ingrese el nombre" />
                </div>
            </form>
            <form className="row">
                <div className="col-6">
                    <label htmlFor="inputAdress" className="form-label">Dirección 1</label>
                    <input type="text"
                    id="direction1"
                    name="direction1"
                    value={direction1}
                    onChange={onChange}  className="form-control" placeholder="Dirección" />
                </div>
                <div className="col-6">
                    <label htmlFor="inputAdress" className="form-label">Dirección 2</label>
                    <input type="text" 
                    id="direction2"
                    name="direction2"
                    value={direction2}
                    onChange={onChange} className="form-control" placeholder="Dirección 2" />
                </div>
                <div className=" col-5">
                    <label htmlFor="inputCity" className="form-label">Ciudad</label>
                    <input type="text" 
                    id="city"
                    name="city"
                    value={city}
                    onChange={onChange}className="form-control" placeholder="Ingrese su ciudad" />
                </div>
                <div className="col-5">
                    <label htmlFor="codePostal" className="form-label">Código Postal</label>
                    <input type="text" 
                    id="postal"
                    name="postal"
                    value={postal}
                    onChange={onChange}className="form-control"  placeholder="Ingrese su código postal" />
                </div>
                <div className="form-group CVV col-4">
                    <label htmlFor="cvv">CVV</label>
                    <input type="password" 
                    id="cv"
                    name="cv"
                    value={cv}
                    onChange={onChange} className="form-control" placeholder="Ingrece el CCV" />
                </div>
                <div className="form-group col-5" id="card-number-field">
                    <label htmlFor="cardNumber">Numero de tarjeta</label>
                    <input type="text" 
                    id="numbercard"
                    name="numbercard"
                    value={numbercard}
                    onChange={onChange}className="form-control"  placeholder="Ingrese el numero" />
                </div>
                <div className="form-group col-3" id="expiration-date">
                    <label>Expiration Date</label>
                    <select 
                    id="expirecard"
                    name="expirecard"
                    value={expirecard}
                    onChange={onChange}className="form-select form-select-sm m-1">
                        <option value={'Enero'}>Enero</option>
                        <option value={'Febrero'}>Febrero </option>
                        <option value={'Marzo'}>Marzo</option>
                        <option value={'Abril'}>Abril</option>
                        <option value={'Mayo'}>Mayo</option>
                        <option value={'Junio'}>Junio</option>
                        <option value={'Julio'}>Julio</option>
                        <option value={'Agosto'}>Agosto</option>
                        <option value={'Septiembre'}>Septiembre</option>
                        <option value={'Octubre'}>Octubre</option>
                        <option value={'Noviembre'}>Noviembre</option>
                        <option value={12}>Deciembre</option>
                    </select>
                    <select className="form-select form-select-sm m-1">
                        <option value={2022}> 2022</option>
                        <option value={2023}> 2023</option>
                        <option value={2024}> 2024</option>
                        <option value={2025}> 2025</option>
                        <option value={2026}> 2026</option>
                        <option value={2027}> 2027</option>
                    </select>
                </div>
                <div className="img ">
                    <div className="form-group" id="credit_cards">
                        <img src="https://1000marcas.net/wp-content/uploads/2019/12/Visa-Logo-2005.jpg" id="visa" width="30px" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" id="mastercard" width="30px" />
                        <img src="https://seeklogo.com/images/M/mercadopago-nuevo-logo-12208FF614-seeklogo.com.png" id="mercadopago" width="30px" />
                    </div>
                </div>
                <div className="mb-1">
                    <div className="form-check">
                        <input type="checkbox" id="checkTerms" className="form-check-input" />
                        <label htmlFor="checkTerms" className="form-check-label">Acepto los terminos y condiciones</label>
                    </div>
                    <div className="g-4">
                        <div className="form-check">
                            <input type="checkbox" id="checkVerify" className="form-check-input" />
                            <label htmlFor="checkVerify" className="form-check-label">Deseo confirmar mi compra</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Registratar compra
                        </button> </div>
                </div></form>
        </div>

    );
}

export default Info;