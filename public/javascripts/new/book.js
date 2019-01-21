let hasConfirmed = false;
$("#confirmModal").on("hide.bs.modal", (e) => {
    console.log(e);
    if (e.type === "hide") return;

    hasConfirmed = true;
});

$("#form").submit((e) => {
    if (!hasConfirmed) {
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
