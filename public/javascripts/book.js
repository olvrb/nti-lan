let hasConfirmed = false;
$("#confirmModal").on("hide.bs.modal", (e) => {
    if (e.type === "hide") return;

    hasConfirmed = true;
});

$("#submit").click((e) => {
    const modalInfo = document.querySelector("#modalInfo");
    const seatInfo = document.querySelector("#seat");
    modalInfo.innerHTML = `Sittplats: ${
        seatInfo.value ? seatInfo.value : "ingen vald (endast entré)"
        }`;
    modalInfo.innerHTML += `<br/>Pris: ${seatInfo.value ? 60 : 30}kr`;
});

$("#form").submit((e) => {
    if (!hasConfirmed) {

        e.preventDefault();
        return false;
    }
});

$("#submitConfirm").click((e) => {
    hasConfirmed = true;
    $("#form").submit();
});
