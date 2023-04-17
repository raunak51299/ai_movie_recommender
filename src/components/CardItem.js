import React, { useState } from 'react';
import { genresArray } from './Constants';
import './CardItem.css';

const getGenreNameById = (id) => {
    const genre = genresArray.find((genre) => genre.id === id);
    return genre ? genre.name : '';
};

export default function CardItem(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const allGenre = props.genre.map((genre) => getGenreNameById(genre));

    return (
        <>
            <div className="card my-3 mx-3 bg-dark" onClick={() => setIsModalOpen(true)}>
                <img src={props.imgurl} className="card-img-top" alt="..." style={{ height: '500px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title text-white">{props.title}</h5>
                    <div className="d-flex">
                        <span className="card-text p-2 flex-grow-1 text-success">{props.date.slice(0, 4)}</span>
                        {allGenre.slice(0, 3).map((genre) => {
                                return (
                                    <span className="badge rounded-pill text-bg-info mx-2 my-2" style={{ height: 'fit-content' }}>{genre}</span>)
                            }
                            )}
                    </div>
                    <p className="card-text" style={{ color: '#b8b8b8' }}>{props.description.slice(0, 110)}...</p>
                </div>
            </div>
            {isModalOpen && (
                <div className={`modal d-block modal-open`}>
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: 'white' }}>{props.title}</h5>
                                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <img src={props.imgurl} alt="..." style={{ width: '40vh', objectFit: 'cover', maxHeight: '60vh' }} />
                                <span className='mx-3' style={{ color: '#b8b8b8', position: 'absolute' }}>{props.description}</span>
                                <div className="my-3">
                                    <p style={{ color: '#b8b8b8' }}>Release Date: {props.date}<span className="text-success"></span> </p>
                                    <p style={{ color: '#b8b8b8' }}>Genres: {allGenre.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
