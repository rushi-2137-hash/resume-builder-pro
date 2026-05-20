const STORAGE_KEY = 'resumes_collection';
const ACTIVE_ID_KEY = 'active_resume_id';

const StorageManager = {
  getAllResumes: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  getActiveId: () => localStorage.getItem(ACTIVE_ID_KEY),
  setActiveId: (id) => localStorage.setItem(ACTIVE_ID_KEY, id),
  getResume: (id) => StorageManager.getAllResumes().find(r => r.id === id) || null,
  saveResume: (id, data) => {
    let resumes = StorageManager.getAllResumes();
    let index = resumes.findIndex(r => r.id === id);
    if (index !== -1) {
      resumes[index] = { ...resumes[index], ...data, updatedAt: new Date().toISOString() };
    } else {
      resumes.push({ id, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  },
  deleteResume: (id) => {
    let resumes = StorageManager.getAllResumes().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    if (StorageManager.getActiveId() === id) localStorage.removeItem(ACTIVE_ID_KEY);
  },
  initAutoSave: (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    let activeId = StorageManager.getActiveId() || ('resume_' + Date.now());
    if (!StorageManager.getActiveId()) StorageManager.setActiveId(activeId);
    const currentResume = StorageManager.getResume(activeId) || {};
    container.querySelectorAll('input:not(.dynamic-input), textarea:not(.dynamic-input)').forEach(input => {
      if (input.id && currentResume[input.id] !== undefined) input.value = currentResume[input.id];
      input.addEventListener('input', (e) => {
        if (e.target.id) StorageManager.saveResume(activeId, { [e.target.id]: e.target.value });
      });
    });
  }
};