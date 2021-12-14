function onChange() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=re-password]');
    console.log('pass:' + password.value);
    console.log('confirm: '+confirm.value);
    if (confirm.value === password.value) {
        confirm.setCustomValidity('');
    } else {
        confirm.setCustomValidity('Passwords do not match');
    }
}