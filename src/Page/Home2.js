import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Page/style/estilos.css'
import ReactPlayer from "react-player";
import APIInvoke from "../utils/APIInvoke";
import '../Page/style/styleRegister.css'



const Home2 = () => {

    const navigate = useNavigate();
    
    const [posts, setPots] = useState(
        []
    );

    const loadPosts = async () => {
        const response = await APIInvoke.invokeGET(`/post/list`);
        setPots(response.message);
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    }


    useEffect(() => {
        loadPosts();
    }, []);

    const [search, setSearch] = useState("");

    const searchPost = async (buscar) => {
        if(buscar == null){
            var response = await APIInvoke.invokeGET(`/post/list/`);
        }else{
            var response = await APIInvoke.invokeGET(`/post/list/${buscar}`);
        }
        console.log(response);
        setSearch(response.message);
        setPots(response.message);
    }

    return (
            <div className="content_size" id="content_size">
                <header className="encabezado">
                    <div className="contenedor-navegacion">
                        <div className="contenido-navegacion contenedor">
                            <nav className="nav_title">
                            <div className="logo m-2">
                                <h2><span className="azul">Peludos <span className="azul">y</span><span className="azul"> traviesos</span></span></h2>
                                    <li className="nav-item">
                                    <button 
                                        className="btn btn-sm btn-danger" 
                                        onClick={(logout)}
                                        role="button" >
                                            Cerrar sesión
                                        </button>
                                    </li>
                            </div>
                            </nav>
                        </div>
                    </div>
                    <div className="contenido-header">
                        <div className="contenedor-encabezado">
                            <div className="texto-encabezado">
                                <h2>Welcomen!</h2>
                                <a href="#" className="butn bordes">Contenido</a>
                            </div>
                            <ReactPlayer url={'https://www.youtube.com/watch?v=sMUDM51O-Ug'} muted width={'100%'} playing loop></ReactPlayer>
                        </div>
                    </div>
                </header>
                <div className="contenedor-nosotros contenedor">
                    <div className="texto-nosotros">
                        <p className="bienvenida" >Bienvenido a!</p>
                        <h1>Peludos y traviesos</h1>
                        <p>Es increíble todo el amor que nuestras mascotas nos pueden dar y por ese cariño es merecido que les
                            otorguemos una recompensa, por esta razón te invitamos a que tú también le demuestres todo el amor que le
                            puedes dar.
                        </p>
                        <a href="#" className="butn butn-rojo ">Contactar</a>
                    </div>
                </div>
                <section className="menu contenedor">
                    <h2 className="texto-productos ">Artículos destacados</h2>
                    <div className="botones-productos justify-content-center">
                        {/** Juguetes, Farmacia, Alimentos, Aseo */}
                        <button className="todos butn butn-verde m-4" onClick={() => {searchPost(null)}}>Todos</button>
                        <button className="alimentos butn butn-verde m-4" onClick={() => {searchPost("comida")}}>Alimentos</button>
                        <button className="juguetes butn butn-verde m-4" onClick={() => {searchPost("juguetes")}}>Juguetes</button>
                        <button className="aseo butn butn-verde m-4" onClick={() => {searchPost("Cuidado y Higiene")}}>Aseo</button>
                        <button className="farmacia butn butn-verde m-4" onClick={() => {searchPost("farmacia")}}>Farmacia</button>
                        <button className="snacks butn butn-verde m-4" onClick={() => {searchPost("snacks")}}>Snacks</button>
                    </div>
                    <div className="productos" >
                        {
                            posts.map(
                                posts=>
                                <div className="producto" data-producto="alimento">
                                   <Link to={`/post/${ posts._id }`}><img data-src alt width={350} height={230} src={posts.url}/></Link>
                                   <Link to={`/post/${ posts._id }`}><h2>{posts.nameproduct}</h2></Link> 
                                    <p>{posts.animal}</p>
                                    <div className="precio">
                                        <p>COP {posts.price}</p>
                                    </div>
                                    <div className="containe_button">
                                        <div className="button_container">
                                            <button className="button_enviar "><i className="fas fa-paw"/> Comprar</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </section>
                <footer className="footer">
                    <p>Todos los derechos reservados © 2022-2023 Equipo Peludos y traviesos, desarrollado por UIS Developers</p>
                </footer>
            </div>
    );
}
export default Home2;