// ===== Hero Section Image Slideshow =====
const images = [
  "./images/aromaTherapy.jpg",
  "./images/aromaTherapy2.jpg",
  "./images/Stretch.jpg",
  "./images/heatTherapy.jpg"
];

const mainImage = document.querySelector('.hero-section__main-image');
let currentImageIndex = 0;

function changeImage() {
  if (!mainImage) return; // Safety check if image is missing

  mainImage.style.opacity = 0; // Fade out

  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    mainImage.src = images[currentImageIndex];
    mainImage.style.opacity = 1; // Fade back in
  }, 1000); // 1 second matches the CSS transition time
}

setInterval(changeImage, 3500); // Change every 5 seconds

// Config
const startHour = 9;   // 9 AM
const endHour = 17;    // 5 PM
const slotDuration = 60; // 60 minutes per slot

// Get elements
const bookingOverlay = document.getElementById('booking-overlay');
const bookNowBtn = document.getElementById('book-now');
const closeBookingBtn = document.getElementById('close-booking');
const daySelect = document.getElementById('day-select');
const bookingCalendar = document.getElementById('booking-calendar');

// Open modal
// bookNowBtn.addEventListener('click', () => {
//   bookingOverlay.style.display = 'flex';
//   generateDayOptions();
//   generateTimeSlots();
// });

// Close modal
closeBookingBtn.addEventListener('click', () => {
  bookingOverlay.style.display = 'none';
});

// Close by clicking outside
bookingOverlay.addEventListener('click', (e) => {
  if (e.target === bookingOverlay) {
    bookingOverlay.style.display = 'none';
  }
});

// Generate day options
function generateDayOptions() {
  daySelect.innerHTML = ''; // Clear old
  const today = new Date();

  for (let i = 0; i < 7; i++) { // 7 days ahead
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const option = document.createElement('option');
    option.value = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    option.textContent = date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

    daySelect.appendChild(option);
  }
}

// ..................Generate time slots based on selected day....................
function generateTimeSlots() {
  bookingCalendar.innerHTML = ''; // Clear old

  const selectedDate = daySelect.value;
  
  for (let hour = startHour; hour <= endHour; hour++) {
    const time = new Date(`${selectedDate}T${hour.toString().padStart(2, '0')}:00:00`);

    const button = document.createElement('button');
    button.classList.add('slot');
    button.textContent = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    button.addEventListener('click', () => {
      alert(`You selected: ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on ${new Date(selectedDate).toDateString()}`);
    });

    bookingCalendar.appendChild(button);
  }
}

// Update slots when day changes
daySelect.addEventListener('change', generateTimeSlots);



// Google Calendar Integration
const API_KEY = '';
const CALENDAR_ID = '';

const calendarURL = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

async function loadCalendarEvents() {
  const response = await fetch(calendarURL);
  const data = await response.json();
  const events = data.items;

  const container = document.getElementById('booking-calendar');
  container.innerHTML = '';

  events.forEach((event) => {
    const start = new Date(event.start.dateTime || event.start.date).toLocaleString();
    const end = new Date(event.end.dateTime || event.end.date).toLocaleString();
    const title = event.summary || 'No Title';

    const button = document.createElement('button');
    button.classList.add('slot');
    button.textContent = `${start} ➔ ${end} (${title})`;

    if (title.toLowerCase().includes('booked')) {
      button.classList.add('slot--booked');
    }

    container.appendChild(button);
  });
}

// Hamburger Menu Toggle
const toggleButton = document.getElementById('navbar-toggle');
const navLinks = document.getElementById('navbar-links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

