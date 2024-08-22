
function replaceSynonym(element) {
    const synonyms = ['Entrepreneur', 'Business Owner', 'Innovator'];
    const currentText = element.textContent;
    const index = synonyms.indexOf(currentText);
    const nextIndex = (index + 1) % synonyms.length;
    element.textContent = synonyms[nextIndex];
  }