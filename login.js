document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', function () {
        const input = document.getElementById('UsernameorEmail').value.trim();
        const password = document.getElementById('password').value.trim();



        if (input === '' || password === '') {
            alert("Both username and password are required.");
            return;
        }

        if (input.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input)) {
                alert("Please Enter a valid email address.");
                return;
            }
        } else {
            if (input.length < 6) {
                alert("Username must be atleast 4 characters.");
                return;
            }
        }



        alert("Login input validated successfully!");

    });
});