// Popup script untuk Chrome extension

document.addEventListener("DOMContentLoaded", function () {
  const fillUnansweredBtn = document.getElementById("fillUnansweredBtn");
  const fillAllBtn = document.getElementById("fillAllBtn");
  const refreshStatsBtn = document.getElementById("refreshStatsBtn");
  const resultDiv = document.getElementById("result");

  // Update statistik saat popup dibuka
  updateStatistics();

  // Button handlers
  fillUnansweredBtn.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "fillUnanswered",
      });

      if (response && response.success) {
        showResult(
          `✅ Berhasil mengisi ${response.result.filled} jawaban!`,
          "success"
        );
        updateStatistics();
      } else {
        showResult(
          "❌ Gagal mengisi survey. Pastikan Anda berada di halaman survey.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showResult("❌ Error: " + error.message, "error");
    }
  });

  fillAllBtn.addEventListener("click", async () => {
    if (
      !confirm(
        "Apakah Anda yakin ingin mengisi semua jawaban? Ini akan menimpa jawaban yang sudah ada."
      )
    ) {
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "fillAll",
      });

      if (response && response.success) {
        const result = response.result;
        let message = `✅ Berhasil mengisi ${result.filled} jawaban!`;
        if (result.skipped > 0) {
          message += ` (${result.skipped} sudah terisi, dilewati)`;
        }
        showResult(message, "success");
        updateStatistics();
      } else {
        showResult(
          "❌ Gagal mengisi survey. Pastikan Anda berada di halaman survey.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showResult("❌ Error: " + error.message, "error");
    }
  });

  refreshStatsBtn.addEventListener("click", () => {
    updateStatistics();
  });

  // Fungsi untuk update statistik
  async function updateStatistics() {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "getStats",
      });

      if (response && response.success) {
        const stats = response.stats;
        document.getElementById("totalQuestions").textContent = stats.total;
        document.getElementById("answeredQuestions").textContent =
          stats.answered;
        document.getElementById("unansweredQuestions").textContent =
          stats.unanswered;
      } else {
        // Jika tidak di halaman survey, tampilkan pesan
        document.getElementById("totalQuestions").textContent = "-";
        document.getElementById("answeredQuestions").textContent = "-";
        document.getElementById("unansweredQuestions").textContent = "-";
        showResult("⚠️ Pastikan Anda berada di halaman survey UPI", "warning");
      }
    } catch (error) {
      console.error("Error getting stats:", error);
      document.getElementById("totalQuestions").textContent = "-";
      document.getElementById("answeredQuestions").textContent = "-";
      document.getElementById("unansweredQuestions").textContent = "-";
      showResult(
        "⚠️ Tidak dapat mengambil statistik. Pastikan Anda berada di halaman survey.",
        "warning"
      );
    }
  }

  // Fungsi untuk menampilkan hasil
  function showResult(message, type = "info") {
    resultDiv.textContent = message;
    resultDiv.className = "result " + type;
    resultDiv.style.display = "block";

    // Auto hide setelah 5 detik
    setTimeout(() => {
      resultDiv.style.display = "none";
    }, 5000);
  }
});
