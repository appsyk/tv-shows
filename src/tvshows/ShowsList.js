import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowsList = ({ data }) => {
    const param = useParams();
    const navigate = useNavigate();
    const [showsList, setShowsList] = useState([]);
    useEffect(() => {
        axios.get(`https://api.tvmaze.com/search/shows?q=${param.search}`)
            .then(res => {
                if(res.data.length > 0){
                    setShowsList(res.data);
                }else{
                    setShowsList([]);
                    alert("No data found")
                    navigate(-1)
                }
            })
            .catch(err => {
                alert(err)
            })
    }, []);
    const itemClicked = (id) => {
        console.log(id)
        navigate(`/tv-shows/details/${id}`)
    }
    const previousRoute = () => {
        navigate(-1)
    }
    return (
        <div className="list_container">
            <div className="container center">
                {showsList.length > 0 ? (
                    <div>
                        <div className='back_btn' onClick={previousRoute}>
                            {/* <Link to="/"> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg>
                            {/* </Link> */}
                        </div>

                        <div className='row d-flex justify-content-center' >
                            {showsList.map(list => {
                                const data = list.show;
                                const score = (list.score * 10).toFixed(1);
                                const date = new Date(data.premiered).getFullYear();
                                const summary = data.summary ? data.summary.length < 115 ? data.summary : data.summary.slice(0, 115) + " ..." : "";
                                return (
                                    <div className="list_box col-lg-3 col-md-3" key={data.id}>
                                        <div className="box_overlay" onClick={e => itemClicked(data.id)} >
                                            <div className='show_info'>
                                                <h6>{data.name.length < 30 ? data.name : data.name.slice(0, 30) + " ..."}</h6>
                                                <p className="shortinfo"><span>{data.language}, {data.genres[0]}</span>, <span>{date}</span></p>
                                                <p className="summary" dangerouslySetInnerHTML={{ __html: summary }}></p>
                                            </div>
                                        </div>
                                        <div>
                                            {data.image ? <img src={data.image.medium} alt={data.name} /> : <img src="https://tileofspainusa.com/wp-content/plugins/ultimate-product-catalogue/images/No-Photo-Available.png" height="270px" />}

                                        </div>
                                        {
                                           data.rating.average ? <div className='ratings'>
                                            <p>{data.rating.average}</p>
                                        </div> : ""
                                        }

                                        <div>
                                            {/* <span>{data.description}</span> */}
                                            {/* <Link to={`${data.id}`}><button>View in details</button></Link> */}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (<div className="d-flex justify-content-center spinner_center"><div className="spinner-grow" role="status">
                    <span className="sr-only"></span>
                </div></div>)
                }
            </div>

        </div>
    )
}

export default ShowsList;

