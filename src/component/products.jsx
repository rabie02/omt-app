import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Modal, Button, Form } from "react-bootstrap";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [aiSearchTerm, setAiSearchTerm] = useState("");
  const [aiResults, setAiResults] = useState([]);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [showAiResults, setShowAiResults] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    display_name: "",
    code: "",
    description: "",
    category: "",
    specification: "",
    start_date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chargement des produits
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
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
      setProducts(json.result.result || json.result || []);
      setFilteredProducts(json.result.result || json.result || []);
    } catch (err) {
      console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  // Recherche standard
  useEffect(() => {
    const results = products.filter(product =>
      product.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  // Recherche AI
  const handleAiSearch = async () => {
    if (!aiSearchTerm.trim()) {
      setAiResults([]);
      setShowAiResults(false);
      return;
    }

    setIsAiSearching(true);
    setShowAiResults(true);

    try {
      const timestamp = Date.now();
      const response = await fetch(
        `https://dev268291.service-now.com/api/sn_prd_pm/ai_search_proxy2/search?term=${encodeURIComponent(aiSearchTerm)}&_=${timestamp}`,
        {
          headers: {
            "Authorization": "Basic " + btoa("admin:K5F/Uj/lDbo9"),
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Cache-Control": "no-cache"
          }
        }
      );

      if (!response.ok) throw new Error("AI search failed");
      
      const data = await response.json();
      const results = data.result?.result?.items || data.result?.items || data.result || [];
      setAiResults(results);
    } catch (err) {
      console.error("AI Search error:", err);
      setAiResults([]);
    } finally {
      setIsAiSearching(false);
    }
  };

  // Gestion de l'ajout de produit
  const handleAddProduct = async () => {
    if (!newProduct.display_name || !newProduct.code) {
      alert("Le nom et le code du produit sont obligatoires");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://dev268291.service-now.com/api/sn_prd_pm/product_offering_api/create",
        {
          method: "POST",
          headers: {
            "Authorization": "Basic " + btoa("admin:K5F/Uj/lDbo9"),
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            display_name: newProduct.display_name,
            code: newProduct.code,
            description: newProduct.description,
            category: newProduct.category,
            specification: newProduct.specification,
            start_date: newProduct.start_date
          })
        }
      );

      if (!response.ok) throw new Error("Échec de la création du produit");

      const result = await response.json();
      alert("Produit créé avec succès!");
      setShowAddModal(false);
      setNewProduct({
        display_name: "",
        code: "",
        description: "",
        category: "",
        specification: "",
        start_date: new Date().toISOString().split('T')[0]
      });
      fetchProducts(); // Rafraîchir la liste
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      alert("Erreur lors de la création du produit: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProductImage = (productName) => {
    switch(productName) {
      case "Internet_Fibre_100Mb":
        return "/assets/default-product.png";
      case "Mobile_4G_10Go":
        return "/assets/OffreMobile4G-10Go.png";
      default:
        return "/assets/default-product.png";
    }
  };

  const cleanDisplayName = (name) => {
    if (!name) return "Offre";
    return name.replace(/\t/g, '').trim();
  };

  const stripHtml = (html) => {
    if (!html) return "Aucun résumé disponible";
    return html.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...';
  };

  const LoadingDetail = () => (
    <div className="container py-5">
      <div className="row">
        {[1, 2].map((item) => (
          <div key={item} className="col-md-6 mb-4">
            <div className="card h-100">
              <Skeleton height={300} />
              <div className="card-body">
                <Skeleton height={30} width="80%" />
                <Skeleton height={20} count={3} />
                <Skeleton height={40} width="50%" className="mt-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      {/* Bouton Ajouter un produit */}
      <div className="row mb-3">
        <div className="col-12 text-end">
          <button 
            className="btn btn-success"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bi bi-plus-circle"></i> Ajouter un produit
          </button>
        </div>
      </div>

      {/* Barre de recherche principale */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher une offre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="button">
              <i className="bi bi-search"></i> Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      {loading ? (
        <LoadingDetail />
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.sys_id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="text-center p-3">
                  <img
                    src={getProductImage(product.name)}
                    alt={cleanDisplayName(product.display_name)}
                    className="img-fluid rounded"
                    style={{ maxHeight: "250px" }}
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{cleanDisplayName(product.display_name)}</h3>
                  <div className="mb-2">
                    <span className="badge bg-primary me-2">{product.code}</span>
                    <span className="badge bg-info">{product.category || "Général"}</span>
                  </div>
                  <p className="card-text">{product.description}</p>
                  
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                      <strong>Spécification:</strong> {product.specification}
                    </li>
                    <li className="list-group-item">
                      <strong>Disponible depuis:</strong> {product.start_date}
                    </li>
                  </ul>
                  
                  <button className="btn btn-primary w-100">
                    Souscrire à cette offre
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Aucun résultat */}
      {!loading && filteredProducts.length === 0 && (
        <div className="alert alert-warning text-center">
          Aucune offre ne correspond à votre recherche
        </div>
      )}

      {/* Section Recherche AI */}
      <div className="row mt-5 pt-5 border-top">
        <div className="col-12">
          <h4 className="mb-4">Recherche intelligente dans notre base de connaissances</h4>
          
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Posez votre question (ex: 'Comment souscrire à la fibre ?')..."
              value={aiSearchTerm}
              onChange={(e) => setAiSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
            />
            <button 
              className="btn btn-primary" 
              type="button"
              onClick={handleAiSearch}
              disabled={isAiSearching}
            >
              {isAiSearching ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Recherche...
                </>
              ) : (
                <>
                  <i className="bi bi-robot me-2"></i> Recherche AI
                </>
              )}
            </button>
          </div>

          {showAiResults && (
            <div className="mt-4">
              {isAiSearching ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                  </div>
                  <p className="mt-2">Analyse de votre question...</p>
                </div>
              ) : aiResults.length > 0 ? (
                <div className="knowledge-results">
                  {aiResults.map((result, index) => (
                    <div key={index} className="knowledge-card">
                      <div className="knowledge-card-header">
                        <h5>{result.title || "Sans titre"}</h5>
                        <span className="badge bg-secondary">
                          {result.knowledge_base || "Base de connaissances"}
                        </span>
                      </div>
                      <div className="knowledge-card-body">
                        <p>{stripHtml(result.summary)}</p>
                        <div className="knowledge-card-meta">
                          <span>
                            <i className="bi bi-eye"></i> {result.views || 0} vues
                          </span>
                          <span>
                            <i className="bi bi-star"></i> {result.rating || 0}/5
                          </span>
                          <span>
                            <i className="bi bi-calendar"></i> {result.last_updated || "Date inconnue"}
                          </span>
                        </div>
                      </div>
                      <a 
                        href={`https://dev268291.service-now.com/${result.url}`} 
                        className="knowledge-card-link"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Voir l'article complet <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">
                  Aucun résultat trouvé pour "{aiSearchTerm}" dans notre base de connaissances.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal d'ajout de produit */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom du produit *</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.display_name}
                onChange={(e) => setNewProduct({...newProduct, display_name: e.target.value})}
                placeholder="Ex: Internet Fibre 100Mb"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Code *</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.code}
                onChange={(e) => setNewProduct({...newProduct, code: e.target.value})}
                placeholder="Ex: FIBRE100"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Description détaillée du produit"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                placeholder="Ex: Internet, Mobile, etc."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Spécifications techniques</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newProduct.specification}
                onChange={(e) => setNewProduct({...newProduct, specification: e.target.value})}
                placeholder="Détails techniques du produit"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de disponibilité</Form.Label>
              <Form.Control
                type="date"
                value={newProduct.start_date}
                onChange={(e) => setNewProduct({...newProduct, start_date: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddProduct}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Enregistrement...
              </>
            ) : (
              "Enregistrer le produit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;