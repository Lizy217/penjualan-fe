import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function HeaderComponent() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    Toko Informatika
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Produk</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Tentang</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Kontak</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default HeaderComponent;
