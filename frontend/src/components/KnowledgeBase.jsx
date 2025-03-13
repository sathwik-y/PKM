import React, { useState, useEffect } from 'react';
import '../styles/KnowledgeBase.css';
import api from '../services/api';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/items/all')
        const data = response.data;
        console.log('API Response:', data); // Debug log
        setItems(
          Array.isArray(data) ?
            data.map(item => ({
              id: item.contentId,
              title: item.title,
              category: item.category,
              summary: item.description,
              date: item.createdAt,
              tags: item.tags || []
            })) : []
        );
        const categorySet = Array.from(
          new Set(data.map(item => item.category).filter(cat => cat && cat !== 'all'))
        );
        const filteredCategories = ['All', ...categorySet.filter(cat => cat !== 'all')];
        setCategories(filteredCategories.length > 0 ? filteredCategories : ['All']);
      } catch (error) {
        console.error('Failed to fetch knowledge base data:', error);
      }
    }
    fetchContent();
  }, []);

  const handleAddKnowledge = async (formData) => {
    try {
      const contentItemData = {
        title: formData.title,
        contentType: formData.contentType,
        description: formData.description,
        category: formData.category
      };

      const response = await api.post('/items/add', contentItemData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const newItem = response.data;
      setItems(prevItems => [...prevItems, newItem]);
      setCategories(prevCategories => [
        'All', ...new Set([...prevCategories.filter(cat => cat !== 'all'), newItem.category])
      ]);
      setShowAddModal(false);
    } catch (error) {
      console.log("Error Occured while saving: " + error);
    }
  }
  const handleDeleteClick = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/items/delete/${deleteItemId}`)
      setItems(prevItems => prevItems.filter(item => item.id !== deleteItemId));
      setShowDeleteModal(false);
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="knowledge-base">
      <div className="kb-header">
        <h1>Knowledge Base</h1>
        <div className="kb-actions">
          <div className="kb-filters">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category.toLowerCase()} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn add-kb-btn"
            onClick={() => setShowAddModal(true)}
          >
            Add Knowledge
          </button>
        </div>
      </div>

      <div className="kb-content">
        {filteredItems.map(item => (
          <div key={item.id} className="kb-item fade-in">
            <div className="kb-item-header">
              <h3>{item.title}</h3>
              <div className="kb-item-actions">
                <span className="category-badge">{item.category}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(item.id)}
                  aria-label="Delete item"
                >
                  <span className="delete-icon">×</span>
                </button>
              </div>
            </div>
            <p className="kb-item-summary">{item.summary}</p>
            <div className="kb-item-footer">
              <div className="tags">
                {(item.tags || []).map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <span className="date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Knowledge Modal */}
      {showAddModal && (
        <AddKnowledgeModal
          onClose={() => setShowAddModal(false)}
          categories={categories.filter(cat => cat !== 'All')}
          onSubmit={handleAddKnowledge}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content delete-confirm-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button
                className="close-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                &times;
              </button>
            </div>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="btn cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn delete-confirm-btn"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AddKnowledgeModal = ({ onClose, categories, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    contentType: 'article',
    description: '',
    category: categories[0],
    file: null
  });

  const contentTypes = ['Article', 'Email', 'Link', 'Note'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    onSubmit(formData);
    onClose();
  };

  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Knowledge</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contentType">Content Type</label>
            <select
              id="contentType"
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
            >
              {contentTypes.map(type => (
                <option key={type.toLowerCase()} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <div className="category-selection">
              <label>Category</label>
              <div className="category-toggle">
                <label>
                  <input
                    type="radio"
                    name="categoryOption"
                    checked={!isAddingNewCategory}
                    onChange={() => setIsAddingNewCategory(false)}
                  />
                  Select Existing
                </label>
                <label>
                  <input
                    type="radio"
                    name="categoryOption"
                    checked={isAddingNewCategory}
                    onChange={() => setIsAddingNewCategory(true)}
                  />
                  Add New
                </label>
              </div>
            </div>

            {isAddingNewCategory ? (
              <input
                type="text"
                placeholder="Enter new category"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setFormData({
                    ...formData,
                    category: e.target.value
                  });
                }}
                required
              />
            ) : (
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload File (Optional)</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KnowledgeBase;
