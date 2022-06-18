let emailWindow;
let filterWall;
let previousFocusedElement;
let redactionConfirmationRequired;

document.body.addEventListener("click", (e) => {
    previousFocusedElement = e.target;
});

function showEmailWindow(titleCourriel, bodyCourriel) {    
    setupEmailWindow(titleCourriel);
    
    document.body.appendChild(emailWindow);

    let contentEl = emailWindow.querySelector(".content");
    contentEl.innerText = bodyCourriel;

    previousFocusedElement = emailWindow;
    redactionConfirmationRequired = false;
}

function closeConfirmationWindow() {
    let confirmationWindow = document.createElement("div");
    confirmationWindow.classList.add("confirmation-window");
    document.body.appendChild(confirmationWindow);

    let warningEl = document.createElement("p");
    warningEl.classList.add("confirmation-warning");
    warningEl.innerText = "En fermant la fenêtre, votre rédaction sera perdue. Continuer ?";
    confirmationWindow.appendChild(warningEl);

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("confirmation-close-btn");
    closeBtn.innerText = "Fermer quand même";
    confirmationWindow.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
        redactionConfirmationRequired = false;
        closeEmailWindow();
        document.body.removeChild(confirmationWindow);
    });

    let cancelBtn = document.createElement("span");
    cancelBtn.classList.add("confirmation-cancel-btn");
    cancelBtn.innerText = "Annuler";
    confirmationWindow.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
        document.body.removeChild(confirmationWindow);
    });
}

function closeEmailWindow() {
    if (redactionConfirmationRequired) {
        closeConfirmationWindow();
        return;
    }
    document.body.removeChild(emailWindow);
    document.body.removeChild(document.querySelector(".filter-wall"));
}

function setupEmailWindow(titleCourriel) {
    emailWindow = document.createElement("div");
    emailWindow.classList.add("email-window");

    emailWindow.addEventListener("keydown", (e) => {
        redactionConfirmationRequired = true;
    });
    
    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.innerText = "Fermer";
    emailWindow.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
        closeEmailWindow();
    });

    let title = document.createElement("h1");
    title.innerText = "Email";
    emailWindow.appendChild(title);
    
    let adresseEmail = document.createElement("span");
    adresseEmail.classList.add("adresse-email");
    adresseEmail.innerHTML = "emilien@em-ilien.fr";
    emailWindow.appendChild(adresseEmail);
    adresseEmail.addEventListener("click", (e) => {
        selectText(adresseEmail);
    });

    let contentEl = document.createElement("p");
    contentEl.classList.add("content");
    contentEl.setAttribute("contenteditable", "true");
    emailWindow.appendChild(contentEl);

    let sendBtn = document.createElement("span");
    sendBtn.classList.add("send-btn");
    sendBtn.innerText = "Envoyer";
    emailWindow.appendChild(sendBtn);
    sendBtn.addEventListener("click", () => {
        if (emailWindow.querySelector(".warning") == null) {
            let warningEl = document.createElement("p");
            warningEl.classList.add("warning");
            warningEl.innerText = "Si rien ne se passe, copiez et envoyez manuellement le courriel.";
            emailWindow.appendChild(warningEl);
        }

        contentEl.addEventListener("click", (e) => {
            if (previousFocusedElement == contentEl)
                return;
    
            selectText(contentEl);
        });

        let content = contentEl.innerText;
        content = content.replace(/\n/g, "%0D%0A");

        window.open(`mailto:emilien@em-ilien.fr?subject=${titleCourriel}&body=${content}`);
        redactionConfirmationRequired = false;      
    });

    filterWall = document.createElement("div");
    filterWall.classList.add("filter-wall");
    document.body.appendChild(filterWall);
    filterWall.addEventListener("click", () => {
        closeEmailWindow();
    });
}

function selectText(node) {
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}