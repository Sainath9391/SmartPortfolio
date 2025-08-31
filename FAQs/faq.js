const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const maxHeight = answer.style.maxHeight;

    // Close all open answers
    document.querySelectorAll(".faq-answer").forEach(a => a.style.maxHeight = null);

    // Toggle current answer
    if (!maxHeight) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});
