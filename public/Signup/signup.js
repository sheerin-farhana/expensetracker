

const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const phoneInput = document.querySelector('#phone-input');
const passwordInput = document.querySelector('#password-input');
const confirmPasswordInput = document.querySelector('#confirm-password-input');


function successalert(msg) {
    const alertDiv = document.getElementById('success-alert');
    alertDiv.classList.remove("d-none");
    alertDiv.innerText = msg
    setTimeout(() => {
        alertDiv.classList.add("d-none")
    }, 2000);

}

function failurealert(msg) {
    const errorAlertDiv = document.getElementById('failure-alert');
    errorAlertDiv.classList.remove("d-none");
    errorAlertDiv.innerText = msg;
    setTimeout(() => {
        errorAlertDiv.classList.add("d-none");
    }, 2000);
}


const signupBtn = document.querySelector('#signup-btn');

signupBtn.addEventListener('click',async (e) => {
    e.preventDefault();

    if (validateForm()) {
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        try {
            const userObject = {
                name: name,
                email: email,
                phone: phone,
                password:password
            }
            const users = await axios.post('http://localhost:3000/users/signup', userObject);
            successalert("signed up successfully");
            
            
            console.log(users.data.data);
        }
        catch (err) {
            // check if error exixts and error status is 403
            if (err.response && err.response.status === 403) {
                failurealert(err.response.msg || "Something went wrong");
                
                
            }
            console.error(err);
        }

        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";

        window.location.href = '../Login/login.html';
        
    }
        
});

function validateForm() {

    //Check if all fields are entered
    if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '' || passwordInput.value === '' || confirmPasswordInput.value === '') {
        failurealert("enter all fields")
        return false;
    }

    //check if phone number is valid
    if (isNaN(phoneInput.value) || phoneInput.value.length !== 10) {
        failurealert("Enter a valid phone number");
        // alert("enter a valid phone number");
        return false;
    }


    //check if the password and confirm password fields are same
    if (passwordInput.value !== confirmPasswordInput.value) {
        failurealert("passwords do not match");
        return false;
    }


    return true; // If all validations pass
}
document.getElementById('nav-login-btn').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../Login/login.html';
});