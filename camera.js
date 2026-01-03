document.addEventListener("DOMContentLoaded", () => {

  const name = sessionStorage.getItem("customerName");
  const phone = sessionStorage.getItem("customerPhone");
  const demoResult = JSON.parse(
    sessionStorage.getItem("demoResult")
  );

  if (!name || !phone || !demoResult) {
    alert("ابدأ من الأول");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("customerName").textContent =
    "أهلاً " + name;

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      document.getElementById("camera").srcObject = stream;
    })
    .catch(() => {
      alert("مش قادر نشغّل الكاميرا");
    });

  // ===== WhatsApp Message Builder =====
  function buildWhatsAppMessage() {
    return `
أهلاً ${name} 🌸

دي نتيجة تحليل بشرتك:

- لون البشرة: ${demoResult.skinTone}
- شكل الوجه: ${demoResult.faceShape}

المنتجات المقترحة:
- Foundation: ${demoResult.foundation}
- Lipstick: ${demoResult.lipstick}
- Blush: ${demoResult.blush}

شكراً لزيارتك 💄
`;
  }

  document.getElementById("captureBtn").onclick = () => {
    document.getElementById("skinTone").textContent =
      demoResult.skinTone;

    document.getElementById("faceShape").textContent =
      demoResult.faceShape;

    document.getElementById("foundation").textContent =
      demoResult.foundation;

    document.getElementById("lipstick").textContent =
      demoResult.lipstick;

    document.getElementById("blush").textContent =
      demoResult.blush;
  };

  document.getElementById("whatsappBtn").onclick = () => {
    const url =
      "https://wa.me/" +
      phone +
      "?text=" +
      encodeURIComponent(buildWhatsAppMessage());

    window.open(url, "_blank");
  };

  document.getElementById("qrBtn").onclick = () => {
  const waLink =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(buildWhatsAppMessage());

  const qrImg = document.getElementById("qrImage");

  // توليد صورة QR
  qrImg.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(waLink);

  // فتح الـ Modal
  const modalElement = document.getElementById("qrModal");
  const qrModal = new bootstrap.Modal(modalElement);

  qrModal.show();
};


});

