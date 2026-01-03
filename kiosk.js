const form = document.getElementById("customerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const phone = data.get("phone").trim();
  if (!phone.match(/^01\d{9}$/)) {
    alert("من فضلك اكتبي رقم موبايل صحيح");
    return;
  }

  sessionStorage.setItem("customerName", data.get("name") || "");
  sessionStorage.setItem("customerPhone", phone);

  window.location.href = "/frontend/camera.html";
});


const phone = sessionStorage.getItem("customerPhone");

const message = `
دي نتيجة تحليل بشرتك:
- Tone: Medium
- Undertone: Warm
- Foundation: Warm Beige 03
- Lipstick: Peach Nude
`;

const whatsappUrl =
  "https://wa.me/" +
  phone +
  "?text=" +
  encodeURIComponent(message);

window.open(whatsappUrl, "_blank");
