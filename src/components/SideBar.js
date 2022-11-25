import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from '../utils/APIInvoke'

function SideBar() {

    const navigate = useNavigate();

    useEffect(() => {

        async function fetchData(){
            const response = await APIInvoke.invokePOST(`/auth/verify`);
            if(response.error !== undefined){
                navigate('/login');
                return;
            }
            document.getElementById("user").innerHTML = response.user.user.userName;
        }   

        fetchData();
    });

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link href="../index3.html" className="brand-link">
                    <span className="text-light  font-weight-bold ">Peludos y Traviesos</span>
                </Link>
                <div className="sidebar">
                    <div className="user-panel">
                        <div className="info">
                            <Link href="#" className="" id="user"></Link>
                        </div>
                    </div>
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link to={'/admin/view'} className="nav-link">
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        My Products
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/admin/post'} className="nav-link">
                                    <i className="nav-icon far fa-calendar-alt" />
                                    <p>
                                        New Product
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/admin/edit'} className="nav-link">
                                    <i className="nav-icon far fa-image" />
                                    <p>
                                        Edit Product
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#" className="nav-link">
                                    <i className="nav-icon fas fa-search " />
                                    <p>
                                        Delete product
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default SideBar;