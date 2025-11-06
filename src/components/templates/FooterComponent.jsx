import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //pastikan bootstrap diimpor

function FooterComponent() {
    return (
        <footer className="bg-light text-center text-lg-start mt-auto">
            <div className="container p_4">
                <div className="text-center">
                    <h6 className="text-uppercase fw-bold mb-4">Toko Informatika</h6>
                    <p>{new Date().getFullYear()} Toko Informatika .All rights reserved.</p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <a href="/" className="me-4 text-reset">
                    Home
                </a>
                <a href="/" className="me-4 text-reset">
                    Produk
                </a>
                <a href="/" className="me-4 text-reset">
                    Tentang
                </a>
                <a href="/" className="me-4 text-reset">
                    Kontak
                </a>
            </div>
        </footer>
    );
}

export default FooterComponent;
