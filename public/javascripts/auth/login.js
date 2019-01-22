const url = new URL(window.location.href);
const err = url.searchParams.get("loginError");

if (err !== null) {
    const el = document.querySelector(".invalid-feedback");
    el.style.display = "block";
}
