import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addCart } from "../redux/action";
import { NavLink, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
  
    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    useEffect(() => {
      const getProduct = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            "https://dev268291.service-now.com/api/sn_prd_pm/omt/product-offerings",
            {
              headers: {
                "Authorization": "Basic " + btoa("admin:K5F/Uj/lDbo9"),
                "Accept": "application/json"
              }
            }
          );
  
          const json = await response.json();
          // Trouver le produit correspondant à l'ID ou prendre le premier
          const foundProduct = id 
            ? json.result.find(item => item.sys_id === id)
            : json.result[0];
            
          setProduct(foundProduct || json.result[0]);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
  
      getProduct();
    }, [id]);

  const Loading = () => (
    <div className="row">
      <div className="col-md-6">
        <Skeleton height={400} />
      </div>
      <div className="col-md-6" style={{ lineHeight: 2 }}>
        <Skeleton height={50} width={300} />
        <Skeleton height={75} />
        <Skeleton height={25} width={150} />
        <Skeleton height={50} />
        <Skeleton height={150} />
        <Skeleton height={50} width={100} />
        <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
      </div>
    </div>
  );

  const showProduct = () => {
    // Fonction pour nettoyer le display_name
    const cleanDisplayName = (name) => {
      if (!name) return product.name || "Produit";
      return name.replace(/\t/g, '').trim();
    };

    return (
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src="/assets/default-product.png"
            alt={cleanDisplayName(product.display_name)}
            height="400px"
            width="400px"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category || "Service"}</h4>
          <h1 className="display-5">{cleanDisplayName(product.display_name)}</h1>
          <p className="lead fw-bolder">
            Code: {product.code}
          </p>
          <h3 className="display-6 fw-bold my-4">{product.specification}</h3>
          <p className="lead">{product.description}</p>
          <p className="text-muted">Disponible depuis: {product.start_date}</p>
          <button 
            className="btn btn-outline-dark px-4 py-2" 
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row py-4">
        {loading ? <Loading /> : showProduct()}
      </div>
    </div>
  );
};

export default Product;