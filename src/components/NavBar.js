import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSearchResults, setShowRecommenderResult, setProgress, setShowRecommenderMenu } from "../redux/ActionCreator";
import axios from "axios";
import './NavBar.css';
const apiKey = "";

function NavBar() {
    const searchTerm = useSelector((state) => state.searchTerm);
    const showRecommenderMenu = useSelector((state) => state.showRecommenderMenu);
    const dispatch = useDispatch();

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevents the page from reloading when the form is submitted
        dispatch(setShowRecommenderMenu(false));
        dispatch(setProgress(30));
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
            );
            dispatch(setProgress(100));
            // console.log(response.data.results);
            dispatch(setSearchResults(response.data.results)); // set search results to redux store
            dispatch(setShowRecommenderResult(false)); // set show recommender to false
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top" style={{ background: 'rgb(40 0 92 / 43%)', color: 'white' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" style={{ color: 'white' }} href="/">Movie Recommender</a>
                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => {
                                    dispatch(setShowRecommenderMenu(!showRecommenderMenu));
                                }} >AI Recommender</button>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm}
                                onChange={(event) =>
                                    dispatch(setSearchTerm(event.target.value))
                                }
                            />
                            <button className="btn btn-outline-light" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
