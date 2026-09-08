// Sample Course Data
const coursesData = [
  {
    id: 1,
    title: 'Web Development 101',
    description: 'Master HTML5, CSS layout systems, Flexbox, and modern JavaScript ES6+.',
    tag: 'dev',
    tagLabel: 'Frontend',
    instructor: 'Alex Rivera',
    status: 'in-progress',
    progress: 80
  },
  {
    id: 2,
    title: 'Database Systems & MySQL',
    description: 'Relational database design, writing complex queries, and index optimization.',
    tag: 'db',
    tagLabel: 'Database',
    instructor: 'Dr. Sarah Chen',
    status: 'in-progress',
    progress: 45
  },
  {
    id: 3,
    title: 'PHP Backend Fundamentals',
    description: 'Server-side rendering, RESTful APIs, form processing, and XAMPP integration.',
    tag: 'php',
    tagLabel: 'Backend',
    instructor: 'Mark Johnson',
    status: 'completed',
    progress: 100
  }
];

let selectedCourse = null;

// Ensure DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Course Rendering (if course grid exists)
  if (document.getElementById('courses-container')) {
    renderCourses(coursesData);
  }

  // 2. Setup Page-Specific Event Handlers
  setupTabFiltering();
  setupSearchFilter();
  setupButtonsAndActions();
  setupModalListeners();
  setupAssignmentsPage();
  setupSettingsPage();
});

// Render Course Cards
function renderCourses(courses) {
  const container = document.getElementById('courses-container');
  if (!container) return;

  container.innerHTML = '';

  if (courses.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">No courses found.</p>`;
    return;
  }

  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';

    card.innerHTML = `
      <div>
        <span class="course-tag tag-${course.tag}">${course.tagLabel}</span>
        <h4>${course.title}</h4>
        <p>${course.description}</p>
      </div>
      <div>
        <div class="progress-bar" style="margin-bottom: 12px;">
          <div class="progress-fill" style="width: ${course.progress}%;"></div>
        </div>
        <div class="card-footer">
          <span class="instructor">👤 ${course.instructor}</span>
          <button class="btn btn-primary open-course-btn" data-id="${course.id}">Open</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach click listeners to freshly generated "Open" buttons
  document.querySelectorAll('.open-course-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      selectedCourse = coursesData.find(c => c.id === id);
      openModal(selectedCourse);
    });
  });
}

// Tab Filter Buttons (All, In Progress, Completed)
function setupTabFiltering() {
  const tabs = document.querySelectorAll('.tab-btn');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      if (filter === 'all') {
        renderCourses(coursesData);
      } else {
        const filtered = coursesData.filter(c => c.status === filter);
        renderCourses(filtered);
      }
    });
  });
}

// Live Search Bar Input Listener
function setupSearchFilter() {
  const searchInput = document.getElementById('course-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = coursesData.filter(course => 
      course.title.toLowerCase().includes(term) || 
      course.description.toLowerCase().includes(term)
    );
    renderCourses(filtered);
  });
}

// Header & Banner Buttons
function setupButtonsAndActions() {
  const quickBtn = document.getElementById('quick-action-btn');
  if (quickBtn) {
    quickBtn.addEventListener('click', () => {
      alert('Quick Action triggered! You can add quick course enrollment or event creation here.');
    });
  }

  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      const webDev = coursesData.find(c => c.id === 1);
      openModal(webDev);
    });
  }

  const enrollBtn = document.getElementById('enroll-btn');
  if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
      alert('Enrollment modal / catalog coming soon!');
    });
  }
}

// Modal Box Functionality
function openModal(course) {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  if (!modalOverlay) return;

  modalTitle.textContent = course.title;
  modalBody.innerHTML = `
    <p><strong>Instructor:</strong> ${course.instructor}</p>
    <p style="margin: 8px 0;"><strong>Category:</strong> ${course.tagLabel}</p>
    <p style="margin-bottom: 12px;">${course.description}</p>
    <p><strong>Current Status:</strong> ${course.progress}% completed</p>
  `;

  modalOverlay.classList.add('active');
}

function setupModalListeners() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  const closeBtn = document.getElementById('modal-close');
  const cancelBtn = document.getElementById('modal-cancel');
  const confirmBtn = document.getElementById('modal-confirm');

  const closeModal = () => overlay.classList.remove('active');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (selectedCourse) {
        alert(`Launching course workspace for: ${selectedCourse.title}`);
        closeModal();
      }
    });
  }

  // Close when clicking outside the modal box
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

// Assignment Submit Buttons
function setupAssignmentsPage() {
  const submitBtns = document.querySelectorAll('.assignment-submit-btn');
  submitBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const taskName = e.target.getAttribute('data-task');
      alert(`Assignment submitted successfully for: ${taskName}`);
      e.target.textContent = 'Submitted';
      e.target.disabled = true;
      e.target.classList.replace('btn-primary', 'btn-secondary');
    });
  });
}

// Settings Form Submission
function setupSettingsPage() {
  const settingsForm = document.getElementById('settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Settings updated successfully!');
    });
  }
}