import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import APIInvoke from "../../utils/APIInvoke";
import logo from '../../icon/logo.png';

const Login = () => {
    const navigate  = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {email, password} = user;

    const onChange = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value
        });
    }

    const login = async () => {
        const body = {
            email: user.email,
            password: user.password
        }

        const response = await APIInvoke.invokePOST(`/auth/login`, body);

        if(response.message === 'Invalid Credentials'){
            swal({
                title: 'Invalid User',
                icon: 'error',
                text: `You don't have and account `,
                buttons:{
                    confirm:{
                        text: 'Close',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }else if(response.message === 'Invalid password'){
            swal({
                title: 'Incorrect Password',
                icon: 'warning',
                text: 'Your password is incorrect',
                buttons: {
                    confirm: {
                        text: 'Close',
                        value: true,
                        visible: true,
                        className: 'btn btn-warning',
                        closeModal: true
                    }
                }
            });
        }else if(response.message === 'Authentication success'){
                localStorage.setItem('token', response.token);
                navigate('/home');
        }else if(response.message === 'Authentication success vendedor'){
            localStorage.setItem('token', response.token);
            navigate('/admin');
        }else{
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


        console.log( response );

    }

    const onSubmit = (event) => {
        event.preventDefault();
        login();
    }

    useEffect(() => {
        document.getElementById("email").focus();
    },[]);

    return(
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
        <div className="hold-transition login-page">
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to={"#"} className="h1"><b>Log in</b></Link>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    
                    <form onSubmit={ onSubmit }>
                        <div className="input-group mb-3">
                            
                            <input type="email" 
                            className="form-control" 
                            placeholder="Email"
                            id="email"
                            name="email" 
                            value={ email }
                            onChange={ onChange }
                            required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" 
                            className="form-control" 
                            placeholder="Password"
                            id="password"
                            name="password" 
                            value={ password }
                            onChange={ onChange }
                            required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                        </div>
                    
                        <div className="social-auth-links text-center mt-2 mb-3">
                            <button type="submit" className="btn btn-block btn-primary">
                                Log in
                            </button>
                            <Link to={"/register"} className="btn btn-block btn-success">
                                Register
                            </Link>
                        </div>

                    </form>

                    
                </div>
            </div>
        </div>

        </div>
    </div>
    );
}

export default Login;
