// Sample Events Data (replace with actual API fetch if available)
const EVENTS_DATA = [
  {
    id: 1,
    title: "AI & Robotics Symposium 2025",
    description: "Annual symposium featuring keynote speakers from industry and academia",
    date: "2025-01-15",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium",
    type: "conference",
  },
  {
    id: 2,
    title: "Machine Learning Workshop",
    description: "Hands-on workshop covering fundamentals of machine learning",
    date: "2025-01-20",
    time: "2:00 PM - 6:00 PM",
    location: "Computer Lab 1",
    type: "workshop",
  },
  {
    id: 3,
    title: "Robotics Competition",
    description: "Inter-college robotics competition with exciting challenges",
    date: "2025-02-01",
    time: "10:00 AM - 4:00 PM",
    location: "Sports Complex",
    type: "competition",
  },
  {
    id: 4,
    title: "Guest Lecture: Future of AI",
    description: "An insightful session with a leading AI expert on emerging trends.",
    date: "2025-01-25",
    time: "3:00 PM - 4:30 PM",
    location: "Seminar Hall",
    type: "lecture",
  },
  {
    id: 5,
    title: "Hackathon: Smart City Solutions",
    description: "24-hour coding challenge to develop AI-powered smart city solutions.",
    date: "2025-02-10",
    time: "9:00 AM - 9:00 AM (next day)",
    location: "Innovation Lab",
    type: "competition",
  },
  // New event data
  {
    id: 6,
    title: "Workshop: Advanced Robotics",
    description: "Hands-on workshop on advanced robotics concepts and programming.",
    date: "2025-09-08", // Second week of September
    time: "10:00 AM - 1:00 PM",
    location: "Robotics Lab",
    type: "workshop",
  },
  {
    id: 7,
    title: "Uttkarsh Fest Proposed Events",
    description: "Brainstorming and planning session for Uttkarsh Fest activities.",
    date: "2025-02-15", // Mid of February
    time: "4:00 PM - 6:00 PM",
    location: "Student Union Hall",
    type: "meeting",
  },
]

const calendarDays = document.getElementById("calendarDays")
const currentMonthYear = document.getElementById("currentMonthYear")
const prevMonthBtn = document.getElementById("prevMonth")
const nextMonthBtn = document.getElementById("nextMonth")
const eventList = document.getElementById("eventList")
const selectedDateDisplay = document.getElementById("selectedDateDisplay")
const noEventsMessage = document.getElementById("noEventsMessage") // Get the existing element

const currentDate = new Date()

function renderCalendar() {
  calendarDays.innerHTML = ""
  // Clear only dynamically added event items
  const existingEventItems = eventList.querySelectorAll(".event-item")
  existingEventItems.forEach((item) => item.remove())

  // Ensure the noEventsMessage is visible by default when rendering a new month
  noEventsMessage.style.display = "block"
  selectedDateDisplay.textContent = "" // Clear previous date display

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  currentMonthYear.textContent = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

  // Fill in leading empty days
  for (let i = 0; i < firstDayOfMonth; i++) {
    const dayDiv = document.createElement("div")
    dayDiv.classList.add("calendar-day")
    calendarDays.appendChild(dayDiv)
  }
    console.log("js loaded")
  // Fill in days of the month
  for (let day = 1; day <= lastDayOfMonth; day++) {
    const dayDiv = document.createElement("div")
    dayDiv.classList.add("calendar-day", "current-month")
    dayDiv.textContent = day
    dayDiv.dataset.date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    const today = new Date()
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayDiv.classList.add("today")
    }

    // Check for events on this day
    const eventsOnThisDay = EVENTS_DATA.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
    })

    if (eventsOnThisDay.length > 0) {
      dayDiv.classList.add("has-event")
      const eventDot = document.createElement("div")
      eventDot.classList.add("event-dot")
      dayDiv.appendChild(eventDot)
    }

    dayDiv.addEventListener("click", () => showEventsForDate(dayDiv.dataset.date))
    calendarDays.appendChild(dayDiv)
  }
}

function showEventsForDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number)
  const selectedDate = new Date(year, month - 1, day) // month is 0-indexed

  selectedDateDisplay.textContent = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const eventsForDate = EVENTS_DATA.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getDate() === day &&
      eventDate.getMonth() === month - 1 && // month is 0-indexed
      eventDate.getFullYear() === year
    )
  })

  // Clear previous event items
  const existingEventItems = eventList.querySelectorAll(".event-item")
  existingEventItems.forEach((item) => item.remove())

  if (eventsForDate.length > 0) {
    noEventsMessage.style.display = "none" // Hide the "No events" message
    eventsForDate.forEach((event) => {
      const eventItem = document.createElement("div")
      eventItem.classList.add("event-item")
      eventItem.innerHTML = `
                <h4>${event.title}</h4>
                <p>${event.description}</p>
                <div class="event-item-meta">
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
            `
      eventList.appendChild(eventItem)
    })
  } else {
    noEventsMessage.style.display = "block" // Show the "No events" message
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1)
  renderCalendar()
  // After rendering, re-select the first day of the new month to show its events (or no events)
  const newMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const newMonthFirstDayString = `${newMonthFirstDay.getFullYear()}-${String(newMonthFirstDay.getMonth() + 1).padStart(2, "0")}-${String(newMonthFirstDay.getDate()).padStart(2, "0")}`
  showEventsForDate(newMonthFirstDayString)
})

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1)
  renderCalendar()
  // After rendering, re-select the first day of the new month to show its events (or no events)
  const newMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const newMonthFirstDayString = `${newMonthFirstDay.getFullYear()}-${String(newMonthFirstDay.getMonth() + 1).padStart(2, "0")}-${String(newMonthFirstDay.getDate()).padStart(2, "0")}`
  showEventsForDate(newMonthFirstDayString)
})

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex"
  })
}

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.style.display = "none"
    }
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (mobileMenu && mobileMenuBtn && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.style.display = "none"
  }
})

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar()
  // Set initial selected date to today
  const today = new Date()
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  showEventsForDate(todayString)
})
