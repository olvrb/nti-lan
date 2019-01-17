window.seat = seatsio;

const form = document.querySelector("#form");

form.onsubmit = () => {
    if (!seatsio.charts[0].selectedObjects[0]) return alert("Välj en seat.");
    appendHtml(form, "<input name='seat' id='seat'>");
    const newChild = document.querySelector("#seat");
    newChild.value = seatsio.charts[0].selectedObjects[0];
};

function appendHtml(el, str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}
