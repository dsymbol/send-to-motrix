chrome.storage.local.get("token", function (items) {
    token = items.token;
    if (token === undefined) {
        document.getElementById("token").value = "";
    } else {
        document.getElementById("token").value = items.token;
    }
});

let input = document.getElementById("submit");

input.addEventListener("click", function () {
    token = document.getElementById("token").value;
    browser.storage.local.set({ token: token });
    window.close();
});
