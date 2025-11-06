import { useState } from "react";
// import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/templates/HeaderComponent";
import AddProdukComponent from "./components/produk/AddProdukComponent";
import ListProdukComponent from "./components/produk/ListProdukComponent";
import FooterComponent from "./components/templates/FooterComponent";

function App() {
    return (
        // <>
        //     <HeaderComponent />
        //     <ListProdukComponent />
        //     <FooterComponent />
        // </>
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <HeaderComponent />
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<ListProdukComponent />} /> Tambahkan baris ini
                        <Route path="/tambah-produk" element={<AddProdukComponent />} />
                        <Route path="/list-produk" element={<ListProdukComponent />} />
                        <Route path="/update-produk/:id" element={<AddProdukComponent />} />
                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </Router>
    );
}

export default App;
