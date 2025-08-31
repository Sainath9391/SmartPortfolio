document.addEventListener("DOMContentLoaded", () => {
    // Typed.js for Hero Text Animation
    const typed = new Typed(".hero h1 span", {
      strings: ["Pendalwar Sainath","Pendalwar Sainath","a Web Developer", "a Learner"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });
  
    // Typed.js initialization for another section
    var typedText = new Typed('#typed-text', {
      strings: ['Software Engineer', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    });
  
    // Smooth scroll for navigation links
    document.querySelectorAll(".nav-links a").forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector(anchor.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  
    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.querySelector("nav ul");
    menuToggle.addEventListener("click", () => {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    });
  
    // Header scroll effect
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(44, 62, 80, 0.9)";
      } else {
        header.style.backgroundColor = "var(--secondary-color)";
      }
    });
  
    // Skill Bar Animation
    const skillBars = document.querySelectorAll(".skill-bar");
    const animateSkillBars = () => {
      skillBars.forEach((bar) => {
        const skillLevel = bar.getAttribute("data-skill");
        bar.style.width = `${skillLevel}%`;
      });
    };
  
    window.addEventListener("scroll", () => {
      if (document.querySelector(".skills").getBoundingClientRect().top < window.innerHeight) {
        animateSkillBars();
      }
    });
  
    // Skill Bars Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillLevel = entry.target.getAttribute('data-skill');
          entry.target.style.width = `${skillLevel}%`;
        }
      });
    }, { threshold: 0.5 });
  
    skillBars.forEach(bar => observer.observe(bar));
  
   // Form Submission Handling
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.querySelector("input[name='name']").value,
    email: document.querySelector("input[name='email']").value,
    message: document.querySelector("textarea[name='message']").value,
  };

  try {
    const response = await fetch("http://localhost:6000/contact-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert("✅ Message sent successfully!");
      contactForm.reset();
    } else {
      alert("❌ Failed to send message.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Something went wrong!");
  }
});

  
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.project-card, .experience-item, .education-item');
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });
  
    animatedElements.forEach(el => animationObserver.observe(el));
  });
  
  
  
  // Get all sections and nav links
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
      let current = '';
  
      sections.forEach(section => {
          const sectionTop = section.offsetTop - 80; // Adjust for fixed navbar height
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
              current = section.getAttribute('id');
          }
      });
  
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
          }
      });
  });
  

  // Select elements
const modal = document.getElementById('project-modal');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const closeBtn = modal.querySelector('.close');

// Open modal on image click
document.querySelectorAll('.project-img').forEach(img => {
  img.addEventListener('click', () => {
    modalTitle.textContent = img.dataset.title;
    modalDescription.textContent = img.dataset.description;
    modal.style.display = 'block';
  });
});

// Close modal on close button click
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal if clicked outside modal content
window.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.style.display = 'none';
  }
});




  const modal1 = document.getElementById("assistant-modal");
  const openBtn = document.getElementById("open-assistant");
  const closeBtn1 = document.getElementById("close-assistant");
  const sendBtn = document.getElementById("send-btn");
  const voiceBtn = document.getElementById("voice-btn");
  const userInput = document.getElementById("user-input");
  const assistantResponse = document.getElementById("assistant-response");

  openBtn.addEventListener("click", () => { modal.style.display = "flex"; });
  closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
  window.addEventListener("click", e => { if(e.target === modal) modal.style.display="none"; });

  // Dummy AI response function
  function sendMessage(question){
    if(!question) return;
    assistantResponse.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
    const answer = "This is a demo AI response. Replace with your backend API call.";
    assistantResponse.innerHTML += `<p><strong>AI:</strong> ${answer}</p>`;
    userInput.value = "";
    assistantResponse.scrollTop = assistantResponse.scrollHeight;
  }

  sendBtn.addEventListener("click", () => sendMessage(userInput.value));

  // Voice recognition
  let recognition;
  if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userInput.value = transcript;
      sendMessage(transcript);
    };
  } else {
    voiceBtn.disabled = true;
    voiceBtn.innerText = "❌";
  }

  voiceBtn.addEventListener("click", () => {
    if(recognition) recognition.start();
  });
