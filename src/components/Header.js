import React from "react";

function Header(){
   return( 
   <div>
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-lg-6">
                        <h1>Products</h1>
                    </div>
                    <div className="col-lg-6">
                        <ol className="breadcrumb float-lg-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Projects</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );

}

export default Header;