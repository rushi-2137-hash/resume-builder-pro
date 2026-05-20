const StorageManager = {
  saveResume: (id, data) => {
    let resumes = JSON.parse(localStorage.getItem('resumes') || '{}');
    resumes[id] = { ...resumes[id], ...data, lastModified: new Date().toISOString() };
    localStorage.setItem('resumes', JSON.stringify(resumes));
  },
  getResume: (id) => {
    let resumes = JSON.parse(localStorage.getItem('resumes') || '{}');
    return resumes[id];
  },
  getActiveId: () => localStorage.getItem('active_resume_id') || 'resume_' + Date.now()
};
