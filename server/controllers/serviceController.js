import { getStore } from '../store/dbStore.js';

export const getServices = (req, res) => {
  try {
    const store = getStore();
    const { category, search } = req.query;
    let list = [...store.services];

    if (category && category !== 'All') {
      list = list.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: list.length, services: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getServiceById = (req, res) => {
  try {
    const store = getStore();
    const service = store.services.find(s => s.id === req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = (req, res) => {
  try {
    const store = getStore();
    const newService = {
      id: `serv-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      ...req.body
    };
    store.services.push(newService);
    res.status(201).json({ success: true, service: newService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = (req, res) => {
  try {
    const store = getStore();
    const index = store.services.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    store.services[index] = { ...store.services[index], ...req.body };
    res.json({ success: true, service: store.services[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = (req, res) => {
  try {
    const store = getStore();
    const index = store.services.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    const removed = store.services.splice(index, 1);
    res.json({ success: true, message: 'Service deleted successfully.', service: removed[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSpaPackages = (req, res) => {
  try {
    const store = getStore();
    res.json({ success: true, packages: store.spaPackages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
