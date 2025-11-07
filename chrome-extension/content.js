// Content script untuk mengisi survey secara otomatis

(function() {
  'use strict';

  // Fungsi untuk mendapatkan semua grup pertanyaan (radio button groups)
  function getAllQuestionGroups() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const groups = {};
    
    radioButtons.forEach(radio => {
      const name = radio.getAttribute('name');
      if (name && name !== 'userid' && name !== '_token') {
        if (!groups[name]) {
          groups[name] = [];
        }
        groups[name].push(radio);
      }
    });
    
    return groups;
  }

  // Fungsi untuk memilih jawaban random untuk satu grup
  function selectRandomAnswer(radioButtons) {
    if (radioButtons.length === 0) return false;
    
    // Pilih random index
    const randomIndex = Math.floor(Math.random() * radioButtons.length);
    const selectedRadio = radioButtons[randomIndex];
    
    // Set checked
    selectedRadio.checked = true;
    
    // Trigger events untuk memastikan form mengenali perubahan
    selectedRadio.dispatchEvent(new Event('change', { bubbles: true }));
    selectedRadio.dispatchEvent(new Event('click', { bubbles: true }));
    
    // Trigger pada label jika ada
    const label = selectedRadio.closest('label');
    if (label) {
      label.classList.add('active');
      label.click();
    }
    
    return true;
  }

  // Fungsi utama untuk mengisi semua jawaban
  function fillAllRandomAnswers() {
    const groups = getAllQuestionGroups();
    let filledCount = 0;
    let skippedCount = 0;
    
    Object.keys(groups).forEach(groupName => {
      const radioButtons = groups[groupName];
      
      // Cek apakah sudah ada yang terpilih
      const alreadySelected = radioButtons.some(radio => radio.checked);
      
      if (alreadySelected) {
        skippedCount++;
        return; // Skip jika sudah ada jawaban
      }
      
      if (selectRandomAnswer(radioButtons)) {
        filledCount++;
      }
    });
    
    return {
      filled: filledCount,
      skipped: skippedCount,
      total: Object.keys(groups).length
    };
  }

  // Fungsi untuk mengisi jawaban yang belum terisi saja
  function fillUnansweredOnly() {
    const groups = getAllQuestionGroups();
    let filledCount = 0;
    
    Object.keys(groups).forEach(groupName => {
      const radioButtons = groups[groupName];
      
      // Hanya isi jika belum ada yang terpilih
      const alreadySelected = radioButtons.some(radio => radio.checked);
      
      if (!alreadySelected) {
        if (selectRandomAnswer(radioButtons)) {
          filledCount++;
        }
      }
    });
    
    return {
      filled: filledCount,
      total: Object.keys(groups).length
    };
  }

  // Fungsi untuk mendapatkan statistik
  function getStatistics() {
    const groups = getAllQuestionGroups();
    let answered = 0;
    let unanswered = 0;
    
    Object.keys(groups).forEach(groupName => {
      const radioButtons = groups[groupName];
      const hasAnswer = radioButtons.some(radio => radio.checked);
      
      if (hasAnswer) {
        answered++;
      } else {
        unanswered++;
      }
    });
    
    return {
      total: Object.keys(groups).length,
      answered: answered,
      unanswered: unanswered
    };
  }

  // Listen untuk pesan dari popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillAll') {
      const result = fillAllRandomAnswers();
      sendResponse({ success: true, result: result });
    } else if (request.action === 'fillUnanswered') {
      const result = fillUnansweredOnly();
      sendResponse({ success: true, result: result });
    } else if (request.action === 'getStats') {
      const stats = getStatistics();
      sendResponse({ success: true, stats: stats });
    }
    
    return true; // Keep channel open for async response
  });

  // Expose functions untuk debugging (optional)
  window.surveyAutoFiller = {
    fillAll: fillAllRandomAnswers,
    fillUnanswered: fillUnansweredOnly,
    getStats: getStatistics
  };

  console.log('Survey Auto Filler loaded!');
})();

