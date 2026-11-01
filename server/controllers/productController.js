import { getStore } from '../store/dbStore.js';

export const getProducts = (req, res) => {
  try {
    const store = getStore();
    const { category, search, sort } = req.query;
    let list = [...store.products];

    if (category && category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    res.json({ success: true, count: list.length, products: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = (req, res) => {
  try {
    const store = getStore();
    const product = store.products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = (req, res) => {
  try {
    const store = getStore();
    const newProduct = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviews: 1,
      inStock: true,
      stockCount: req.body.stockCount || 20,
      ...req.body
    };
    store.products.push(newProduct);
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = (req, res) => {
  try {
    const store = getStore();
    const index = store.products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    store.products[index] = { ...store.products[index], ...req.body };
    res.json({ success: true, product: store.products[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = (req, res) => {
  try {
    const store = getStore();
    const index = store.products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    const removed = store.products.splice(index, 1);
    res.json({ success: true, message: 'Product deleted successfully.', product: removed[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
