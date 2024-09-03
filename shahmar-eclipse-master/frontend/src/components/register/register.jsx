import React, { useEffect, useState } from 'react';
import "./register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [registerFormData, setRegisterFormData] = useState({
        fullName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
        gender: "male",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUpClick = () => {
        setRightPanelActive(true);
    };

    const notify = () => toast.success("Account created successfully. Please sign in to continue!");

    const handleSignInClick = () => {
        setRightPanelActive(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (!formData.email || !formData.password) {
            setErrorMessage("All fields are required.");
            setLoading(false);
            return;
        }

        const storedUser = localStorage.getItem('users');
        if (storedUser) {
            const users = JSON.parse(storedUser);
            const user = users.find(user => user.email === formData.email && user.password === formData.password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = "/";
            } else {
                setErrorMessage("Invalid email or password.");
            }
        } else {
            setErrorMessage("No users found.");
        }

        setLoading(false);
    };

    const handleRegisterInputChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setErrorMessage("");

        const { fullName, email, userName, password, confirmPassword } = registerFormData;

        if (!fullName || !email || !userName || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        const newUser = {
            fullName,
            email,
            userName,
            password,
            profilePic: registerFormData.profilePic,
            gender: registerFormData.gender
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.email === newUser.email)) {
            setErrorMessage("Email is already registered.");
            return;
        }
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        notify();
        handleSignInClick();
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setRegisterFormData({
                    ...registerFormData,
                    profilePic: reader.result,
                });
            };
            reader.readAsDataURL(file);
        } else {
            setErrorMessage("Please upload a valid image file.");
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            window.location.href = "/";
        }
    }, []);

    return (
        <div className={`my-10 mx-5 h-[430px] md:h-[540px] sm:w-[500px] md:w-[661px] lg:w-[861px] sm:mx-auto containers relative ${rightPanelActive ? "right-panel-active" : ""}`} id="containers">
            <div className="">
            </div>

            <div className="form-containers sign-up-containers">
                <form className='register-form px-5 sm:px-[50px]' action="#">
                    {errorMessage && <div className='mt-3 w-full rounded-lg p-2 bg-red-500 text-white'>{errorMessage}</div>}
                    <h1 className='text-xs md:text-base font-semibold'>Create Account</h1>
                    <div className="social-containers">
                        <button type="submit" name="signInWithGoogle" className="border flex items-center justify-center gap-x-5 rounded-lg p-1">
                            <img src="https://static.chrono24.com/images/icons/svg/google-logo.svg" alt="" className="" />
                            <span className='hidden lg:block'>Continue with Google</span>
                        </button>
                    </div>
                    <span className='text-xs md:text-base'>or use your email</span>
                    <input value={registerFormData.email} onChange={handleRegisterInputChange} name="email" className='register-input text-xs md:text-base border' type="email" placeholder="Email" />
                    <input value={registerFormData.fullName} onChange={handleRegisterInputChange} name="fullName" className='register-input text-xs md:text-base border' type="text" placeholder="Full Name" />
                    <input value={registerFormData.userName} onChange={handleRegisterInputChange} name="userName" className='register-input text-xs md:text-base border' type="text" placeholder="Username" />
                    <input value={registerFormData.password} onChange={handleRegisterInputChange} name="password" className='register-input text-xs md:text-base border' type="password" placeholder="Password" />
                    <input value={registerFormData.confirmPassword} onChange={handleRegisterInputChange} name="confirmPassword" className='register-input text-xs md:text-base border' type="password" placeholder="Confirm Password" />
                    <select className='register-input text-xs md:text-base border' name="gender" value={registerFormData.gender} onChange={handleRegisterInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input onChange={handleProfilePicChange} className='register-input text-xs md:text-base' type="file" placeholder="Profile Picture" />
                    {loading ?
                        <button className='register-button text-xs md:text-base' style={{ backgroundColor: "gray" }} disabled>Loading...</button> :
                        <button className='register-button text-xs md:text-base' onClick={handleRegister}>Sign Up</button>
                    }
                </form>
            </div>

            <div className="form-containers sign-in-containers">
                <form className='register-form px-5 sm:px-10' onSubmit={handleSignIn}>
                    {errorMessage && <div className='w-full rounded-lg p-2 bg-red-500 text-white'>{errorMessage}</div>}
                    <h1 className='text-xs md:text-base font-semibold'>Sign in</h1>
                    <div className="social-containers">
                        <button type="submit" name="signInWithGoogle" className="border flex items-center justify-center gap-x-5 rounded-lg p-1">
                            <img src="https://static.chrono24.com/images/icons/svg/google-logo.svg" alt="" className="" />
                            <span className='hidden lg:block'>Continue with Google</span>
                        </button>
                    </div>
                    <span className='text-xs md:text-base'>or use your account</span>
                    <input value={formData.email} className='text-xs md:text-base register-input border' name='email' onChange={handleInputChange} type="email" placeholder="Email" />
                    <input value={formData.password} className='text-xs md:text-base register-input border' name='password' onChange={handleInputChange} type="password" placeholder="Password" />
                    <a className='text-xs md:text-base' href="#">Forgot your password?</a>
                    {loading ?
                        <button className='mt-2 register-button text-xs md:text-base' style={{ backgroundColor: "gray" }} disabled>Loading...</button> :
                        <button className='mt-2 register-button text-xs md:text-base'>Sign In</button>}
                </form>
            </div>

            <div className="overlay-containers">
                <div className="overlay">
                    <div className="overlay-panel px-5 sm:px-[50px] overlay-left">
                        <h1 className='text-xs md:text-base font-semibold'>Welcome Back!</h1>
                        <p className='text-xs md:text-base'>To keep connected with us please login with your personal info.</p>
                        <button className='register-button text-xs md:text-base' id="signIn" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel px-5 sm:px-[50px] overlay-right">
                        <h1 className='text-xs md:text-base font-semibold'>Hello, Friend!</h1>
                        <p className='text-xs md:text-base'>Enter your personal details and start journey with us.</p>
                        <button className='register-button text-xs md:text-base' id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
