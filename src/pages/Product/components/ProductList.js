import React from 'react';

const ProductList = () => {
    return (
        <>
            <div className="row product-list">
                <div className="col-4">
                    <div className="product-header">
                        <div className="pro-favorites mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                style={{ display: 'block' }}
                                id="heartTrue"
                                onclick="handleIcon()"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                style={{ display: 'none' }}
                                id="heartFalse"
                                onclick="handleIcon()"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="pro-cart mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="productImg">
                        <a href="#/">
                            <img
                                src="/imgs/Products/637894482038170000.jpg"
                                className="card-img-top"
                                alt=""
                            />
                        </a>
                    </div>

                    <div className="card-body productBody">
                        <h5 className="card-name">
                            Edward's case is well done
                        </h5>
                        <p className="card-brand">SOUR VX</p>
                        <p className="card-price">
                            <span>$ 6599</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;