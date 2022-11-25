import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke'
import swal from "sweetalert";
import logo from '../../icon/logo.png';


const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        status: ''
    });

    const { name, email, password, confirm, status } = user;


    const onChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const saveUser = async () => {
        if (password !== confirm) {
            swal({
                title: 'Error',
                icon: 'error',
                text: 'Passwords must match',
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
        } else {
            const body = {
                userName: user.name,
                email: user.email,
                password: user.password,
                status: user.status
            }

            const response = await APIInvoke.invokePOST(`/save/user`, body);

            if (response.message === 'User is already registered') {
            } else {

                swal({
                    title: 'User created!',
                    icon: 'success',
                    text: 'User registered successfully',
                    buttons:{
                        confirm:{
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-success',
                            closeModal: true
                        }
                    }
                });

                setUser({
                    name: '',
                    email: '',
                    password: '',
                    confirm: '',
                    status: ''
                });
                navigate('/login');
            }
        }
    }

    useEffect(() => {
        document.getElementById("name").focus();

    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        saveUser();
    }

    return (
        

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
                    </div>
                </nav>
        <div className="form__main">
            <form className="formulario" onSubmit={onSubmit}>
                <div className="formulario__grupo">
                    <label className="formulario__label">Usuario</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="name" id="name" placeholder="Full name" onChange={onChange} value={name} required></input>
                        <i className="formulario__validacion-estado fas fa-times-circle"></i>
                    </div>
                </div>
                <div className="formulario__grupo">
                    <label className="formulario__label">Contraseña</label>
                    <div className="formulario__grupo-input">
                        <input type="password" className="formulario__input" name="password" id="password" onChange={onChange} value={password} placeholder="Password" required></input>
                        <i className="formulario__validacion-estado fas fa-times-circle"></i>
                    </div>
                </div>
                <div className="formulario__grupo">
                    <label className="formulario__label">Repetir Contraseña</label>
                    <div className="formulario__grupo-input">
                        <input type="password" className="formulario__input" name="confirm" id="confirm" onChange={onChange} value={confirm} placeholder="Retype Password" required></input>
                        <i className="formulario__validacion-estado fas fa-times-circle"></i>
                    </div>
                </div>
                <div className="formulario__grupo">
                    <label className="formulario__label">Correo Electrónico</label>
                    <div className="formulario__grupo-input">
                        <input type="email" className="formulario__input" name="email" id="email" placeholder="Email" onChange={onChange} value={email} required></input>
                        <i className="formulario__validacion-estado fas fa-times-circle"></i>
                    </div>
                </div>
                <div className="form-group">
                                        <label>Status</label>
                                        <select id="status" name="status" 
                                        className="form-control custom-select"
                                        value={ status }
                                        onChange = { onChange }
                                        required >
                                            <option value={""} defaultValue disabled>Select one</option>
                                            <option value={"Comprador"}> Comprador</option>
                                            <option value={"Vendedor"}>Vendedor</option>
                                        </select>

                    <p className="formulario__input-error">El telefono solo puede contener numeros y el maximo son 14 dígitos.</p>
                </div>
                <div className="formulario__grupo" id="grupo__terminos">
                    <label className="formulario__label m-4">
                        <input className="formulario__checkbox" type="checkbox" name="terminos" id="terminos"></input>
                        Acepto los Terminos y Condiciones
                    </label>
                </div>
                <div className="formulario__mensaje" id="formulario__mensaje">
                </div>
                
                <div className="formulario__grupo formulario__grupo-btn-enviar">
                    <button type="submit" className="formulario__btn">Enviar</button>
                    <p className="formulario__mensaje-exito" id="formulario__mensaje-exito">guau Formulario enviado exitosamente!</p>
                </div>
            </form>
        </div>
    </div>
    
);
}

export default Register;