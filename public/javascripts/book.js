window.seat = seatsio;
const SearchTextField = new mdc.textField.MDCTextField(
    document.querySelector(".mdc-text-field")
);

const dialog = new mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
let hasConfirmed = false;

const form = document.querySelector("#form");

dialog.listen("MDCDialog:closed", (obj) => {
    console.log(obj);

    if (obj.detail.action === "close") {
        hasConfirmed = false;
        return;
    } else {
        hasConfirmed = true;
        const newChild = document.querySelector("#seat");
        newChild.value = seatsio.charts[0].selectedObjects[0];
        form.submit();
    }
});
form.onsubmit = () => {
    if (hasConfirmed) {
        return true;
    } else {
        const seat = seatsio.charts[0].selectedObjects[0];
        document.querySelector("#my-dialog-content").innerHTML = `Plats: ${
            seat ? seat : "endast entré."
        }<br>Pris: ${seat ? 60 : 30}`;
        dialog.open();
        return false;
    }
};
