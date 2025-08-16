document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('reminder-modal');
  const btn = document.getElementById('remind-me-btn');
  const span = document.getElementsByClassName('close-btn')[0];
  const form = document.getElementById('reminder-form');

  if (btn) {
    btn.addEventListener('click', () => {
      modal.classList.add('show');
    });
  }

  if (span) {
    span.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('show');
    }
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;

      try {
        const response = await fetch('/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, phone })
        });

        if (response.ok) {
          alert('Thank you! We will notify you at launch.');
          modal.classList.remove('show');
          form.reset();
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  }
});
