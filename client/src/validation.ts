export function validationStart() {
    const form = document.getElementById("address-form") as HTMLFormElement;
    const errorElement = document.getElementById("address-error");
    const divInput = document.getElementById("address-input");
    if (!form || !errorElement || !divInput) return; 
    const changableElements = {
        divInput,
        errorElement,
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        let address = formData.get("address") as string;
        if (typeof address !== "string") {
            return;
        }
        address = address.trim();

        const validationResult = "some error";
        if (!validationResult) {
            clearError(changableElements);
            console.log("Valid address:", address);
        } else {
            showError(changableElements, validationResult);
            return;
        }
    });
}

const showError = function ({divInput, errorElement}: {divInput: HTMLElement, errorElement: HTMLElement}, message: string) {
    divInput.classList.remove("ring-white/60", "ring-1");
    divInput.classList.add("ring-red-500", "ring-2");
    
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
}

const clearError = function ({divInput, errorElement}: {divInput: HTMLElement, errorElement: HTMLElement}) {
    divInput.classList.remove("ring-red-500", "ring-2");
    divInput.classList.add("ring-white/60", "ring-1");

    errorElement.textContent = "";
    errorElement.classList.add("hidden");
}
