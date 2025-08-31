
class PortfolioAI {
  constructor() {
    this.modal = document.getElementById("ai-assistant-modal");
    this.chatMessages = document.getElementById("ai-chat-messages");
    this.input = document.getElementById("ai-input");
    this.sendBtn = document.getElementById("ai-send-btn");
    this.aiBtn = document.getElementById("ai-assistant-btn");
    this.closeBtn = document.querySelector(".ai-close");
    this.voiceStartBtn = document.getElementById("voice-start-btn");
    this.voiceStopBtn = document.getElementById("voice-stop-btn");
    this.synth = window.speechSynthesis;

    if (!this.modal || !this.chatMessages || !this.input || !this.sendBtn || !this.closeBtn || !this.voiceStartBtn || !this.voiceStopBtn) {
      console.error("AI Assistant elements missing in DOM!");
      return;
    }

    this.recognition = null;
    this.typingIndicator = null;

      this.portfolioContext = `
You are PortfolioAI, a friendly assistant for Sainath’s portfolio website. 
Always reply in a conversational, human-like tone with emojis when relevant. 
If asked about personal info, skills, projects, work, or education, answer from the data below. 
If something isn’t mentioned, politely say you don’t know.

---
👤 About Me:
Hi! I’m Sainath, currently pursuing B.Tech in Computer Science & Engineering (Data Science) 
at Malla Reddy Engineering College, Hyderabad.  
I’m passionate about coding, problem-solving, and building impactful web applications.  

Core skills: Data Structures & Algorithms in C++, Full Stack Web Development (JavaScript, SQL, NoSQL).  
Internship: EY GDS + AICTE Virtual Internship (Feb–Mar 2025), worked on MERN stack projects.  

I enjoy learning new technologies, contributing to real-world projects, and actively participating in hackathons.

---
🛠️ Skills:
- HTML5, CSS3, JavaScript, React, Node.js, Tailwind CSS  
- MySQL, MongoDB, C++  
- Data Structures & Algorithms, MERN stack, Problem Solving  

---
💻 Projects:
1. AI Voice Assistant  
   Description: Built an AI-powered personal assistant.  
   Tech: Next.js, Node.js, MongoDB  
   Live Demo: https://voice-assistant-pwa.onrender.com/ 
   Source Code: https://github.com/Sainath9391/AI-voice-Assistant

2. SoulSync Emotion-Aware AI  
   Description: Emotion-aware AI application for real-time interaction.  
   Tech: React, MongoDB, Node.js  
   Live Demo: Upload soon... 
   Source Code: https://github.com/Sainath9391/SoulSync-Emotion-Aware-AI

3. Zomato Clone  
   Description: Food ordering platform clone with interactive UI.  
   Tech: HTML, CSS, JavaScript  
   Live Demo: https://sainath9391.github.io/FULLSTACK-WEBDEVELOPMENT-PROJECT/  
   Source Code: https://github.com/Sainath9391/FULLSTACK-WEBDEVELOPMENT-PROJECT

4. ForgetMeNot-AI  
   Description: Memory assistant app for tracking tasks and reminders.  
   Tech: React, Node.js, MongoDB  
   Live Demo: https://forgetmenot-ai-1.onrender.com/ 
   Source Code: https://github.com/Sainath9391/ForgetMeNot-AI-

5. MyStoryBuilder  
   Description: Interactive storytelling platform for creating custom stories.  
   Tech: HTML, CSS, JavaScript, Node.js, MongoDB  
   Live Demo: Upload soon... 
   Source Code: https://github.com/Sainath9391/MyStoryBuilder
---
💼 Work Experience:
- Full-Stack Developer Intern – EY GDS + AICTE (Feb–Mar 2025)  
  * Built scalable web apps with MERN stack  
  * Integrated authentication, RESTful APIs, Agile collaboration  
  * Led backend of multilingual quiz platform  

- Smart India Hackathon (Sept 2024)  
  * Developed quiz platform with real-time evaluation  
  * Solved deployment & synchronization challenges  

- Open Source Contributor – GirlScript Summer of Code (GSSoC) (Aug 2025)  
  * Contributed to global open-source projects  
  * Implemented features, fixed bugs, improved docs  

- 24-Hour Internal Hackathon (Nov 2024)  
  * Built real-time learning platform with scoring  
  * Delivered under strict deadlines with rapid iteration  

---
🎓 Education:
- B.Tech CSE (Data Science) – Malla Reddy Engineering College, Hyderabad (2023–2027 expected)  
  * Specialization: Data Science, System Architecture, Performance Optimization  
  * Projects: AI Voice Assistant, Food Delivery App, Smart Event Insights Dashboard  
  * Hackathons: SIH, Internal Hackathons  

- Higher Secondary Diploma – Govt Polytechnic Nizamabad (2021–2024)  
  * Focus: Physics, Chemistry, Mathematics  
  * CGPA: 9.3  

- Secondary School (SSC) – Telangana State Residential School, Madnoor, Kamareddy (2015–2021)  
  * CGPA: 10  
  * Active in games, exhibitions, extracurriculars  

---
📩 Contact:
Email: (sainathpendalwar43@gmail.com)  
LinkedIn: (https://www.linkedin.com/in/pendalwar-sainath-598169349/)  
GitHub: (https://github.com/Sainath9391)  
`;
    this.initializeSpeech();
    this.initializeEventListeners();
  }

  initializeSpeech() {
    if ("webkitSpeechRecognition" in window) this.createRecognition();
    else { this.voiceStartBtn.disabled = true; this.voiceStopBtn.disabled = true; }
  }

  createRecognition() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "en-US";

    this.recognition.onresult = (event) => {
      this.input.value = event.results[0][0].transcript;
      this.sendMessage();
    };
    this.recognition.onerror = () => { this.voiceStartBtn.disabled = false; this.voiceStopBtn.disabled = true; };
    this.recognition.onend = () => { this.voiceStartBtn.disabled = false; this.voiceStopBtn.disabled = true; };
  }

  initializeEventListeners() {
    if (this.aiBtn) this.aiBtn.addEventListener("click", () => this.openModal());
    this.closeBtn.addEventListener("click", () => { this.closeModal(); this.stopVoiceAssistant(); });
    window.addEventListener("click", (e) => { if (e.target === this.modal) { this.closeModal(); this.stopVoiceAssistant(); } });
    this.sendBtn.addEventListener("click", () => this.sendMessage());
    this.input.addEventListener("keypress", (e) => { if (e.key === "Enter") this.sendMessage(); });
    this.voiceStartBtn.addEventListener("click", () => { if (this.recognition) { this.recognition.start(); this.voiceStartBtn.disabled = true; this.voiceStopBtn.disabled = false; } });
    this.voiceStopBtn.addEventListener("click", () => this.stopVoiceAssistant());
  }

  stopVoiceAssistant() {
    if (this.recognition) try { this.recognition.abort(); } catch(e){ console.warn(e); }
    if (this.synth.speaking || this.synth.pending) this.synth.cancel();
    this.voiceStartBtn.disabled = false;
    this.voiceStopBtn.disabled = true;
    this.createRecognition();
  }

  openModal() { this.modal.style.display = "flex"; document.body.style.overflow = "hidden"; }
  closeModal() { this.modal.style.display = "none"; document.body.style.overflow = "auto"; }

  async sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;
    this.addUserMessage(message);
    this.input.value = "";
    this.showTyping();

    const response = await this.askGemini(message);
    const formattedResponse = this.formatResponse(response);
    this.hideTyping();
    this.addAIMessage(formattedResponse);
    this.speak(formattedResponse.replace(/<[^>]+>/g, ""));
  }

  showTyping() {
    this.typingIndicator = document.createElement("div");
    this.typingIndicator.className = "ai-message ai-assistant typing";
    this.typingIndicator.innerHTML = `<div class="ai-avatar">🤖</div><div class="ai-message-content"><p><i>💭Thinking...</i></p></div>`;
    this.chatMessages.appendChild(this.typingIndicator);
    this.scrollToBottom();
  }

  hideTyping() {
    if (this.typingIndicator) { this.typingIndicator.remove(); this.typingIndicator = null; }
  }

  speak(text) {
    if (this.synth.speaking) this.synth.cancel();
    const utter = new SpeechSynthesisUtterance(text.replace(/<br>/g, ". "));
    this.synth.speak(utter);
  }

  addUserMessage(message) {
    const msg = document.createElement("div");
    msg.className = "ai-message ai-user";
    msg.innerHTML = `<div class="ai-avatar">👤</div><div class="ai-message-content"><p>${this.sanitize(message)}</p></div>`;
    this.chatMessages.appendChild(msg);
    this.scrollToBottom();
  }

  addAIMessage(message) {
    const msg = document.createElement("div");
    msg.className = "ai-message ai-assistant";
    msg.innerHTML = `<div class="ai-avatar">🤖</div><div class="ai-message-content">${message}</div>`;
    this.chatMessages.appendChild(msg);
    this.scrollToBottom();
  }

  sanitize(text) { return text.replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  scrollToBottom() { setTimeout(() => { this.chatMessages.scrollTop = this.chatMessages.scrollHeight; }, 50); }

   formatResponse(text) {
  return text
    // Convert newlines to <br>
    .replace(/\n/g, "<br>")
    // Replace "- " with bullet points
    .replace(/- /g, "• ")
    // Format Live Demo links if not already wrapped
    .replace(/(Live Demo:\s*)(https?:\/\/[^\s<]+)/g, `<b>$1</b><a href="$2" target="_blank" style="color:blue;">$2</a>`)
    // Format Source Code links if not already wrapped
    .replace(/(Source Code:\s*)(https?:\/\/[^\s<]+)/g, `<b>$1</b><a href="$2" target="_blank" style="color:blue;">$2</a>`)
    // Highlight common emojis
    .replace(/(👤|🛠️|💻|💼|🎓|📩)/g, `<span style="font-weight:bold; font-size:1.1em;">$1</span>`);
}



  async askGemini(question) {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAAd4HZ0Q9fDZecRLIR_y4LnN2aGlXO0ls",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: this.portfolioContext }, { text: "User Question: " + question }] }]
          })
        }
      );
      const data = await response.json();
      if (!data.candidates || !data.candidates[0]) return "⚠️ Oops, I didn’t get a proper reply from Gemini.";
      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      console.error("Gemini API Error:", err);
      return "❌ Something went wrong. Please try again.";
    }
  }
}



document.addEventListener("DOMContentLoaded", () => new PortfolioAI());

