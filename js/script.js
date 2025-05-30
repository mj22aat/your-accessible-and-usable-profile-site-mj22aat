document.addEventListener('DOMContentLoaded', () => {
  // Modal management
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-button');

  // Accessibility: trap focus inside modal
  function trapFocus(element) {
    const focusableEls = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    function handleFocus(e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }

    element.addEventListener('keydown', handleFocus);
  }

  function openModal(title, content) {
    modalTitle.innerHTML = title;
    modalBody.innerHTML = content;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    trapFocus(modal);
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  // Project details
  const projectDetails = {
    'traffic-genai': {
      title: 'Traffic Rule GenAI',
      content: `
        <h3>Project Details</h3>
        <p>This project uses generative AI to create and adapt traffic rules for autonomous driving systems.</p>
        <ul>
          <li>Built with Python and TensorFlow</li>
          <li>Real-time rule generation</li>
          <li>Integration with simulation environments</li>
        </ul>
      `
    },
    'lstm-av': {
      title: 'LSTM for Anomaly Detection',
      content: `
        <h3>Project Details</h3>
        <p>Long Short-Term Memory network for detecting anomalies in autonomous vehicle telemetry data.</p>
        <ul>
          <li>Processes real-time sensor data</li>
          <li>95% detection accuracy</li>
          <li>Early warning system for critical failures</li>
        </ul>
      `
    },
    'genai': {
      title: 'Traffic Rule Generation using GenAI',
      content: 'This project explores the use of generative AI models like GPT for synthesizing traffic rules dynamically based on changing urban traffic patterns.'
    },
    'xai': {
      title: 'Explainable AI (XAI)',
      content: 'Focused on making machine learning models more transparent, this work implements visual and textual explanations for deep learning outputs, especially for autonomous vehicles and healthcare diagnostics.'
    },
    'quantum': {
      title: 'Quantum Computing & AI Integration',
      content: 'This area investigates how quantum computing paradigms can accelerate AI models. It covers quantum circuits, optimization problems, and early integrations with TensorFlow Quantum.'
    },
    'quantum-ml': {
      title: 'Quantum ML Optimization',
      content: 'This project explores hybrid quantum-classical models to optimize deep learning networks using Qiskit and TensorFlow Quantum.'
    }
  };

  // Open modal on project button click
  document.querySelectorAll('[data-project]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-project');
      if (projectDetails[id]) {
        openModal(projectDetails[id].title, projectDetails[id].content);
      }
    });
  });

  // Open modal on scroll section click (for technical.html)
  document.querySelectorAll('.scroll-section[data-id]').forEach(section => {
    section.addEventListener('click', () => {
      const id = section.getAttribute('data-id');
      if (projectDetails[id]) {
        openModal(projectDetails[id].title, projectDetails[id].content);
      }
    });
  });

  // Close modal with close button
  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
