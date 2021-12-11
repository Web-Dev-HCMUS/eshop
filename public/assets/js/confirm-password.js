function onChange() {
    const password = document.querySelector('input[name=SIpassword]');
    const confirm = document.querySelector('input[name=re-password]');
    if (confirm.value === password.value) {
        confirm.setCustomValidity('');
    } else {
        confirm.setCustomValidity('Passwords do not match');
    }
}