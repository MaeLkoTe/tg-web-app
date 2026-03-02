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

        const validationResult = validateTonAddress(address);
        if (!validationResult) {
            clearError(changableElements);
            console.log("Valid address:", address);
        } else {
            showError(changableElements, validationResult);
            return;
        }
    });
}

const validateTonAddress = function (address: string): string | null {
    const prefixAddressRegex = /^(?:UQ|EQ)/;
    const consistOfBase64Regex = /^[a-zA-Z0-9-_]+$/;
    const validLength = address.length === 48;

    if (!address){
        return "Address field is empty";
    }
    if (!prefixAddressRegex.test(address)) {
        return "Address is not starting with UQ or EQ";
    }
    if (!validLength) {
        return "Address length is not valid";
    }
    if (!consistOfBase64Regex.test(address)) {
        return "Address should consist of base64url characters";
    }

    return null;
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
