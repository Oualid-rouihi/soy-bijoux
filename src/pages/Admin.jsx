import { useState } from 'react';
import { motion } from 'framer-motion';
import './Admin.css';

export default function Admin() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'bagues',
    badge: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFiles(Array.from(e.target.files));
    } else {
      setImageFiles([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      setStatus({ type: 'error', message: 'Veuillez sélectionner au moins une image.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // 1. Lire les fichiers images comme Base64
      const readAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ name: file.name, base64: reader.result });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      const base64Images = await Promise.all(imageFiles.map(readAsBase64));

      // 2. Envoyer les données au plugin Vite local
      const payload = {
        ...formData,
        images: base64Images
      };

      const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: 'Produit ajouté avec succès ! Il apparaîtra sur le site dans quelques instants.' });
        
        // Réinitialiser le formulaire
        setFormData(prev => ({
          ...prev,
          name: '',
          price: '',
          description: '',
          badge: ''
        }));
        setImageFiles([]);
        document.getElementById('image').value = '';
      } else {
        setStatus({ type: 'error', message: data.error || 'Erreur lors de l\'ajout du produit.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Erreur de connexion. Assurez-vous que le serveur de dev tourne.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <motion.div 
          className="admin-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Ajouter un Produit</h1>
          <p>Remplissez les détails ci-dessous pour ajouter un bijou directement au site.</p>

          {status && (
            <div className={`admin-alert admin-alert--${status.type}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="name">Titre du produit *</label>
              <input 
                type="text" 
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Bague Éternité"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Prix (Dh) *</label>
                <input 
                  type="number" 
                  id="price"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ex: 120"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Catégorie *</label>
                <select 
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="bracelets">Bracelets</option>
                  <option value="colliers">Colliers</option>
                  <option value="bagues">Bagues</option>
                  <option value="boucles">Boucles d'oreilles</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="badge">Badge (Optionnel)</label>
              <select 
                id="badge"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
              >
                <option value="">Aucun</option>
                <option value="nouveau">Nouveau</option>
                <option value="best seller">Best Seller</option>
                <option value="exclusif">Exclusif</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ex: Une pièce magnifique..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Images du produit * (La première sera l'image principale)</label>
              <input 
                type="file" 
                id="image"
                accept="image/*"
                multiple
                required
                onChange={handleImageChange}
                className="file-input"
              />
              {imageFiles.length > 0 && (
                <div className="image-preview-list">
                  {imageFiles.map((f, i) => (
                    <div key={i} className="image-preview-item">
                      <span className="image-preview-number">{i + 1}</span>
                      <span className="file-name">{f.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="shimmer-btn submit-btn" disabled={loading}>
              {loading ? 'Enregistrement en cours...' : 'Ajouter le Produit'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
