const STORAGE_KEY = 'resume-builder-draft-v1';

const defaultProfile = {
  firstName: '',
  lastName: '',
  role: '',
  location: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  summary: '',
  skills: '',
  certifications: ''
};

const sampleResume = {
  firstName: 'Olivia',
  lastName: 'James',
  role: 'Product Designer',
  location: 'Cairo, Egypt',
  email: 'olivia.james@email.com',
  phone: '+966 55 123 4567',
  linkedin: 'linkedin.com/in/olivia-james',
  github: 'github.com/oliviajames',
  summary: 'Creative product designer with 5+ years of experience creating user-centered digital products. I turn customer insights into polished experiences that improve engagement, conversion, and business impact.',
  skills: 'UX Research, Figma, Prototyping, User Flows, Design Systems, Wireframing, Product Strategy, Agile',
  certifications: 'Google UX Design Certificate, Certified SAFe Practitioner, Advanced Figma Workflow',
  experience: [
    {
      role: 'Senior Product Designer',
      company: 'Northstar Studio',
      period: '2022 — Present',
      description: 'Lead end-to-end design for SaaS clients, from discovery and user research to UI design and testing. Improved onboarding completion by 28% across three product launches.'
    },
    {
      role: 'UI/UX Designer',
      company: 'Zenith Labs',
      period: '2020 — 2022',
      description: 'Designed conversion-focused landing pages and dashboards, collaborated with developers and product managers, and created reusable design patterns for faster delivery.'
    }
  ],
  education: [
    {
      degree: 'B.A. in Visual Communication',
      school: 'American University in Cairo',
      period: '2015 — 2019',
      details: 'Graduated with honors and focused on interaction design and digital storytelling.'
    }
  ],
  projects: [
    {
      name: 'Fintech Onboarding Redesign',
      period: '2023',
      description: 'Redesigned onboarding flows for a mobile banking product, reducing drop-off and increasing activation by 22%.'
    },
    {
      name: 'Design System Refresh',
      period: '2021',
      description: 'Built a cross-platform design system that improved consistency and cut design-to-development handoff time by 35%.'
    }
  ]
};

const formFields = {
  firstName: document.getElementById('firstName'),
  lastName: document.getElementById('lastName'),
  role: document.getElementById('role'),
  location: document.getElementById('location'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  linkedin: document.getElementById('linkedin'),
  github: document.getElementById('github'),
  summary: document.getElementById('summary'),
  skills: document.getElementById('skills'),
  certifications: document.getElementById('certifications')
};

const addButtons = {
  experience: document.querySelector('[data-add="experience"]'),
  education: document.querySelector('[data-add="education"]'),
  projects: document.querySelector('[data-add="projects"]')
};

const listContainers = {
  experience: document.getElementById('experienceList'),
  education: document.getElementById('educationList'),
  projects: document.getElementById('projectsList')
};

const state = {
  experience: [{ role: '', company: '', period: '', description: '' }],
  education: [{ degree: '', school: '', period: '', details: '' }],
  projects: [{ name: '', period: '', description: '' }]
};

const previewEls = {
  previewName: document.getElementById('previewName'),
  previewRole: document.getElementById('previewRole'),
  previewEmail: document.getElementById('previewEmail'),
  previewPhone: document.getElementById('previewPhone'),
  previewLocation: document.getElementById('previewLocation'),
  previewLinkedin: document.getElementById('previewLinkedin'),
  previewGithub: document.getElementById('previewGithub'),
  previewSummary: document.getElementById('previewSummary'),
  previewSkills: document.getElementById('previewSkills'),
  previewExperience: document.getElementById('previewExperience'),
  previewEducation: document.getElementById('previewEducation'),
  previewProjects: document.getElementById('previewProjects'),
  previewCertifications: document.getElementById('previewCertifications')
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getSafeValue(fieldName, fallback) {
  const field = formFields[fieldName];
  if (!field) return fallback;
  return field.value.trim() || fallback;
}

function renderSkills(skills) {
  const items = (skills || '')
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!items.length) {
    return '<span class="skill-pill">Add your skills</span>';
  }

  return items
    .map((item) => `<span class="skill-pill">${escapeHtml(item)}</span>`)
    .join('');
}

function renderExperience(items) {
  if (!items || !items.length || (items.length === 1 && !items[0].role && !items[0].company && !items[0].description && !items[0].period)) {
    return '<div class="resume-item"><p>Add your work experience.</p></div>';
  }

  return items.map((item) => {
    const role = item.role || 'Role';
    const company = item.company || 'Company';
    const period = item.period || 'Dates';
    const description = item.description || 'Describe your responsibilities and impact.';

    return `
      <div class="resume-item">
        <div class="resume-item-header">
          <span class="resume-item-title">${escapeHtml(role)} — ${escapeHtml(company)}</span>
          <span class="resume-item-meta">${escapeHtml(period)}</span>
        </div>
        <p>${escapeHtml(description)}</p>
      </div>
    `;
  }).join('');
}

function renderEducation(items) {
  if (!items || !items.length || (items.length === 1 && !items[0].degree && !items[0].school && !items[0].details && !items[0].period)) {
    return '<div class="resume-item"><p>Add your education details.</p></div>';
  }

  return items.map((item) => {
    const degree = item.degree || 'Degree';
    const school = item.school || 'School';
    const period = item.period || 'Dates';
    const details = item.details || 'Include your coursework, honors, or achievements.';

    return `
      <div class="resume-item">
        <div class="resume-item-header">
          <span class="resume-item-title">${escapeHtml(degree)}</span>
          <span class="resume-item-meta">${escapeHtml(period)}</span>
        </div>
        <p>${escapeHtml(school)}</p>
        <p>${escapeHtml(details)}</p>
      </div>
    `;
  }).join('');
}

function renderProjects(items) {
  if (!items || !items.length || (items.length === 1 && !items[0].name && !items[0].period && !items[0].description)) {
    return '<div class="resume-item"><p>Add your key projects.</p></div>';
  }

  return items.map((item) => {
    const name = item.name || 'Project';
    const period = item.period || 'Year';
    const description = item.description || 'Describe the project outcome.';

    return `
      <div class="resume-item">
        <div class="resume-item-header">
          <span class="resume-item-title">${escapeHtml(name)}</span>
          <span class="resume-item-meta">${escapeHtml(period)}</span>
        </div>
        <p>${escapeHtml(description)}</p>
      </div>
    `;
  }).join('');
}

function updatePreview() {
  const fullName = `${getSafeValue('firstName', 'Your')} ${getSafeValue('lastName', 'Name')}`.trim();
  previewEls.previewName.textContent = fullName || 'Your Name';
  previewEls.previewRole.textContent = getSafeValue('role', 'Professional Title');
  previewEls.previewEmail.textContent = getSafeValue('email', 'name@example.com');
  previewEls.previewPhone.textContent = getSafeValue('phone', '+1 000 000 0000');
  previewEls.previewLocation.textContent = getSafeValue('location', 'City, Country');
  previewEls.previewLinkedin.textContent = getSafeValue('linkedin', 'linkedin.com/in/yourprofile');
  previewEls.previewGithub.textContent = getSafeValue('github', 'github.com/yourname');
  previewEls.previewSummary.textContent = getSafeValue('summary', 'Write a concise summary about your experience, strengths, and target role.');
  previewEls.previewSkills.innerHTML = renderSkills(getSafeValue('skills', ''));
  previewEls.previewExperience.innerHTML = renderExperience(state.experience);
  previewEls.previewEducation.innerHTML = renderEducation(state.education);
  previewEls.previewProjects.innerHTML = renderProjects(state.projects);
  previewEls.previewCertifications.textContent = getSafeValue('certifications', 'Add relevant certifications, languages, or achievements.');
}

function syncFieldVisualState(fieldName, isValid) {
  const field = formFields[fieldName];
  if (!field) return;
  field.classList.toggle('is-valid', isValid);
  field.classList.toggle('is-invalid', !isValid && field.value.trim() !== '');
}

function validateTextField(fieldName) {
  const field = formFields[fieldName];
  if (!field) return;

  const value = field.value.trim();
  const patterns = {
    firstName: /^[A-Za-zÀ-ÿ'\- ]{1,30}$/,
    lastName: /^[A-Za-zÀ-ÿ'\- ]{1,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9\-_]+(\/[A-Za-z0-9\-_]+)?(\/)?$/i,
    github: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9\-_]+(\/)?$/i
  };

  const pattern = patterns[fieldName];
  const isValid = !value || !pattern || pattern.test(value);
  syncFieldVisualState(fieldName, isValid);
  return isValid;
}

function attachStaticFieldListeners() {
  Object.entries(formFields).forEach(([key, field]) => {
    field.addEventListener('input', () => {
      if (['firstName', 'lastName', 'email', 'linkedin', 'github'].includes(key)) {
        validateTextField(key);
      }
      updatePreview();
      saveDraft();
    });
  });
}

function makeBlankExperience() {
  return { role: '', company: '', period: '', description: '' };
}

function makeBlankEducation() {
  return { degree: '', school: '', period: '', details: '' };
}

function makeBlankProject() {
  return { name: '', period: '', description: '' };
}

function createDynamicEntryMarkup(section, item, index) {
  if (section === 'experience') {
    return `
      <div class="dynamic-entry" data-section="experience" data-index="${index}">
        <div class="entry-header">
          <span>Experience ${index + 1}</span>
          <button type="button" class="remove-entry" data-remove="experience" data-index="${index}">Remove</button>
        </div>
        <div class="field-grid two-col">
          <label class="field-group"><span>Role</span><input type="text" value="${escapeHtml(item.role)}" data-section="experience" data-key="role" data-index="${index}"></label>
          <label class="field-group"><span>Company</span><input type="text" value="${escapeHtml(item.company)}" data-section="experience" data-key="company" data-index="${index}"></label>
        </div>
        <div class="field-grid two-col">
          <label class="field-group"><span>Dates</span><input type="text" value="${escapeHtml(item.period)}" data-section="experience" data-key="period" data-index="${index}"></label>
          <div></div>
        </div>
        <label class="field-group"><span>Summary</span><textarea rows="3" data-section="experience" data-key="description" data-index="${index}">${escapeHtml(item.description)}</textarea></label>
      </div>
    `;
  }

  if (section === 'education') {
    return `
      <div class="dynamic-entry" data-section="education" data-index="${index}">
        <div class="entry-header">
          <span>Education ${index + 1}</span>
          <button type="button" class="remove-entry" data-remove="education" data-index="${index}">Remove</button>
        </div>
        <div class="field-grid two-col">
          <label class="field-group"><span>Degree</span><input type="text" value="${escapeHtml(item.degree)}" data-section="education" data-key="degree" data-index="${index}"></label>
          <label class="field-group"><span>School</span><input type="text" value="${escapeHtml(item.school)}" data-section="education" data-key="school" data-index="${index}"></label>
        </div>
        <div class="field-grid two-col">
          <label class="field-group"><span>Dates</span><input type="text" value="${escapeHtml(item.period)}" data-section="education" data-key="period" data-index="${index}"></label>
          <div></div>
        </div>
        <label class="field-group"><span>Details</span><textarea rows="3" data-section="education" data-key="details" data-index="${index}">${escapeHtml(item.details)}</textarea></label>
      </div>
    `;
  }

  return `
    <div class="dynamic-entry" data-section="projects" data-index="${index}">
      <div class="entry-header">
        <span>Project ${index + 1}</span>
        <button type="button" class="remove-entry" data-remove="projects" data-index="${index}">Remove</button>
      </div>
      <div class="field-grid two-col">
        <label class="field-group"><span>Project name</span><input type="text" value="${escapeHtml(item.name)}" data-section="projects" data-key="name" data-index="${index}"></label>
        <label class="field-group"><span>Year</span><input type="text" value="${escapeHtml(item.period)}" data-section="projects" data-key="period" data-index="${index}"></label>
      </div>
      <label class="field-group"><span>Description</span><textarea rows="3" data-section="projects" data-key="description" data-index="${index}">${escapeHtml(item.description)}</textarea></label>
    </div>
  `;
}

function renderDynamicList(section) {
  const container = listContainers[section];
  if (!container) return;
  container.innerHTML = state[section].map((item, index) => createDynamicEntryMarkup(section, item, index)).join('');
}

function addDynamicItem(section) {
  if (section === 'experience') state.experience.push(makeBlankExperience());
  if (section === 'education') state.education.push(makeBlankEducation());
  if (section === 'projects') state.projects.push(makeBlankProject());

  renderDynamicList(section);
  saveDraft();
  updatePreview();
}

function removeDynamicItem(section, indexToRemove) {
  state[section] = state[section].filter((_, index) => index !== Number(indexToRemove));

  if (!state[section].length) {
    if (section === 'experience') state.experience = [makeBlankExperience()];
    if (section === 'education') state.education = [makeBlankEducation()];
    if (section === 'projects') state.projects = [makeBlankProject()];
  }

  renderDynamicList(section);
  saveDraft();
  updatePreview();
}

function handleDynamicInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const { section, key, index } = target.dataset;
  if (!section || !key || index === undefined) return;

  const itemIndex = Number(index);
  if (!state[section] || !state[section][itemIndex]) return;

  state[section][itemIndex][key] = target.value;
  saveDraft();
  updatePreview();
}

function handleDynamicActions(event) {
  const button = event.target.closest('[data-remove]');
  if (!button) return;

  const section = button.dataset.remove;
  const index = button.dataset.index;
  removeDynamicItem(section, index);
}

function saveDraft() {
  const payload = {
    profile: Object.fromEntries(Object.entries(formFields).map(([key, field]) => [key, field.value])),
    sections: state
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Could not save resume draft:', error);
  }
}

function loadDraft() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    if (parsed?.profile) {
      Object.entries(parsed.profile).forEach(([key, value]) => {
        const field = formFields[key];
        if (field) field.value = value || '';
      });
    }

    if (parsed?.sections) {
      state.experience = parsed.sections.experience?.length ? parsed.sections.experience : [makeBlankExperience()];
      state.education = parsed.sections.education?.length ? parsed.sections.education : [makeBlankEducation()];
      state.projects = parsed.sections.projects?.length ? parsed.sections.projects : [makeBlankProject()];
    }
  } catch (error) {
    console.warn('Could not load saved draft:', error);
  }
}

function populateFormFromData(data) {
  Object.entries(formFields).forEach(([key, field]) => {
    field.value = data[key] || '';
  });

  state.experience = (data.experience && data.experience.length) ? data.experience : [makeBlankExperience()];
  state.education = (data.education && data.education.length) ? data.education : [makeBlankEducation()];
  state.projects = (data.projects && data.projects.length) ? data.projects : [makeBlankProject()];
}

function loadSampleData() {
  populateFormFromData(sampleResume);
  renderDynamicList('experience');
  renderDynamicList('education');
  renderDynamicList('projects');
  updatePreview();
  saveDraft();
}

function resetForm() {
  Object.entries(formFields).forEach(([key, field]) => {
    field.value = defaultProfile[key] || '';
    field.classList.remove('is-valid', 'is-invalid');
  });

  state.experience = [makeBlankExperience()];
  state.education = [makeBlankEducation()];
  state.projects = [makeBlankProject()];

  renderDynamicList('experience');
  renderDynamicList('education');
  renderDynamicList('projects');
  saveDraft();
  updatePreview();
}

function attachDynamicListEvents() {
  Object.entries(listContainers).forEach(([key, container]) => {
    container.addEventListener('input', handleDynamicInput);
    container.addEventListener('click', handleDynamicActions);
  });

  Object.entries(addButtons).forEach(([section, button]) => {
    if (!button) return;
    button.addEventListener('click', () => addDynamicItem(section));
  });
}

function bindDocumentActions() {
  document.getElementById('loadSample').addEventListener('click', loadSampleData);
  document.getElementById('saveProgress').addEventListener('click', () => {
    saveDraft();
    const button = document.getElementById('saveProgress');
    const original = button.textContent;
    button.textContent = 'Saved';
    setTimeout(() => {
      button.textContent = original;
    }, 900);
  });

  document.getElementById('resetForm').addEventListener('click', resetForm);
  document.getElementById('downloadPdf').addEventListener('click', () => {
    const resumeElement = document.getElementById('resumePreview');
    const fullName = `${(formFields.firstName.value || 'resume').trim()}-${(formFields.lastName.value || 'cv').trim()}`.replace(/\s+/g, '-').toLowerCase();
    const filename = fullName || 'resume-cv';
    const options = {
      margin: 0.4,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (window.html2pdf) {
      window.html2pdf().set(options).from(resumeElement).save();
    } else {
      window.print();
    }
  });
}

function initialize() {
  loadDraft();
  renderDynamicList('experience');
  renderDynamicList('education');
  renderDynamicList('projects');
  attachStaticFieldListeners();
  attachDynamicListEvents();
  bindDocumentActions();
  updatePreview();
}

initialize();
