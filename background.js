function notify(message) {
    browser.notifications.create({
        type: "basic",
        iconUrl: "icons/128.png",
        title: "Send to Motrix",
        message: message,
    });
}

async function ariaDownload(info) {
    const data = {
        jsonrpc: "2.0",
        id: "qwer",
        method: "aria2.addUri",
        params: ["token:" + token, [info.linkUrl]],
    };
    const response = await fetch("http://localhost:16800/jsonrpc", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
    }).catch(function (error) {
        notify(
            "Unable to send '" +
                info.linkText +
                "' to Motrix.\nCheck that Motrix is running and that the RPC token was entered correctly."
        );
    });

    if (response.status != 200) {
        notify(
            "Unable to send '" +
                info.linkText +
                "' to Motrix.\nCheck that Motrix is running and that the RPC token was entered correctly.\n" +
                response.status +
                ": " +
                response.statusText
        );
    } else {
        notify("Sending '" + info.linkText + "' to Motrix.");
    }
}

function logStorageChange(changes, area) {
    token = changes["token"].newValue;
}

browser.menus.create({
    id: "Send to Motrix",
    title: "Send to Motrix",
    contexts: ["link", "selection"],
    icons: {
        16: "icons/16.png",
        32: "icons/32.png",
        64: "icons/64.png",
        128: "icons/128.png",
        256: "icons/256.png",
    },
});

browser.menus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "Send to Motrix") {
        if (info.linkUrl) {
            ariaDownload(info);
        }
    }
});

browser.storage.onChanged.addListener(logStorageChange);

chrome.storage.local.get("token", function (items) {
    token = items.token;
});
