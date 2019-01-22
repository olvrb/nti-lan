let hasConfirmed = false;
$("#confirmModal").on("hide.bs.modal", (e) => {
    console.log(e);
    if (e.type === "hide") return;

    hasConfirmed = true;
});

$("#submit").click((e) => {
    const modalInfo = document.querySelector("#modalInfo");
    const seatInfo = document.querySelector("#seat");

    console.log(seatInfo.value);
    modalInfo.innerHTML = `Sittplats: ${
        seatInfo.value ? seatInfo.value : "ingen vald"
    }`;
    modalInfo.innerHTML += `<br/>Pris: ${seatInfo.value ? 60 : 30}kr`;
});

$("#form").submit((e) => {
    if (!hasConfirmed) {
        // modalInfo.innerHTML = `Sittplats: ${
        //     seat.value ? obj.id : "ingen vald"
        // }.\nPris: ${obj}`;
        console.log("has not confirmed");

        e.preventDefault();
        return false;
    }
});

$("#submitConfirm").click((e) => {
    console.log("submitting form bcs confirm");
    hasConfirmed = true;
    $("#form").submit();
});
