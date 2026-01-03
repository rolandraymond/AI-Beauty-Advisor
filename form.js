const form = document.getElementById("customerForm");

function normalizePhone(phone) {
  // نشيل أي حاجة مش رقم
  let cleaned = phone.replace(/\D/g, "");

  // نشيل الصفر المحلي لو موجود
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  }

  return cleaned;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const name = data.get("name").trim();
  const countryCode = data.get("country"); // +20, +966, ...
  const phone = data.get("phone").trim();

  if (!name || !countryCode || !phone) {
    alert("من فضلك كملي البيانات");
    return;
  }

  const cleanPhone = normalizePhone(phone);
  const finalPhone =
    countryCode.replace("+", "") + cleanPhone;

  // Debug مهم جدًا
  console.log("FINAL PHONE:", finalPhone);

  sessionStorage.setItem("customerName", name);
  sessionStorage.setItem("customerPhone", finalPhone);

  sessionStorage.setItem(
    "demoResult",
    JSON.stringify({
      skinTone: "Medium",
      faceShape: "Oval",
      foundation: "Warm Beige 03",
      lipstick: "Peach Nude",
      blush: "Soft Coral",
    })
  );

  window.location.href = "camera.html";
});
