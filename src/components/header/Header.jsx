import React from "react";
import SearchBar from "./SearchBar";
import NavBar from "./Navbar";
import { Route, Routes, NavLink } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import Logo from "../../../public/images/deutschify-smallletter.png"

const Header = () => {
    return (
        <div className="w-full bg-palette-50 text-palette-60 flex flex-nowrap shadow-outer">
            <NavLink
                className="text-palette-60 m- p-2"
                to="/"
                element={<Homepage />}
            >
                <img
                    src={Logo}
                    className="w-28 p-2 "
                    alt=""
                />
            </NavLink>

            <SearchBar />
            <NavBar />
        </div>
    );
};

export default Header;
