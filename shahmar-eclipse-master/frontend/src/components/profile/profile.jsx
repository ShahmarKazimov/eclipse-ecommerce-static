import { useEffect, useState } from 'react';
import profilePicture from "../../assets/linkedinjpg.jpg";

const Profile = () => {
    const [userData, setUserData] = useState({
        email: "",
        userName: "",
        fullName: "",
        profilePic: profilePicture,
        gender: ""
    });

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUserData(JSON.parse(loggedInUser));
        } else {
            console.error('No logged-in user data found.');
            window.location.href = '/login';
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...userData, [name]: value };
        setUserData(updatedData);
        localStorage.setItem('loggedInUser', JSON.stringify(updatedData));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        const updatedData = { ...userData, profilePic: fileURL };
        setUserData(updatedData);
        localStorage.setItem('loggedInUser', JSON.stringify(updatedData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        window.location.href = "/"
    };

    return (
        <div className='mb-20 sm:w-[561px] my-5 md:w-[761px] lg:w-[961px] xl:w-[1271px] mx-auto'>
            <form onSubmit={handleSubmit}>
                <div className="bg-white overflow-hidden sm:rounded-lg shadow-md">
                    <div className="px-4 py-5 mb-2 sm:px-6">
                        <h2 className="text-3xl font-bold inline-block">Edit User Profile</h2>
                        <p className="mt-1 max-w-2xl text-md text-gray-500 mx-auto">
                            Details and information about the user.
                        </p>
                    </div>
                    <div className="border border-gray-200">
                        <dl>
                            <div className="bg-gray-50 border px-4 py-5 sm:grid flex justify-between items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-md font-medium text-gray-500">
                                    Email
                                </dt>
                                <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        name="email"
                                        value={userData.email}
                                        disabled
                                        type="text"
                                        className="border border-gray-300 p-2 rounded-md w-full sm:col-span-2"
                                    />
                                </dd>
                            </div>
                            <div className="bg-white border px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-evenly items-center">
                                <dt className="text-md font-medium text-gray-500">
                                    Username
                                </dt>
                                <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        name="userName"
                                        value={userData.userName}
                                        onChange={handleChange}
                                        type="text"
                                        className="border border-gray-300 p-2 rounded-md w-full"
                                    />
                                </dd>
                            </div>
                            <div className="border bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-evenly items-center">
                                <dt className="text-md font-medium text-gray-500">
                                    Full Name
                                </dt>
                                <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        name="fullName"
                                        value={userData.fullName}
                                        onChange={handleChange}
                                        type="text"
                                        className="border border-gray-300 p-2 rounded-md w-full"
                                    />
                                </dd>
                            </div>
                            <div className="bg-white border px-4 py-[6px] grid grid-cols-3 sm:gap-4 sm:px-6 items-center">
                                <dt className="text-md mx-auto font-medium text-gray-500">
                                    <img
                                        src={userData.profilePic}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </dt>
                                <input
                                    className='w-max mx-auto ml-0'
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="bg-gray-50 px-4 border py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-evenly items-center">
                                <dt className="text-md font-medium text-gray-500">
                                    Gender
                                </dt>
                                <dd className="flex mt-1 text-md text-gray-900 sm:mt-0 ">
                                    <select
                                        className='border px-2 rounded-md'
                                        name="gender"
                                        value={userData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </dd>
                            </div>
                            <button
                                className='border px-7 py-2 text-lg rounded-lg my-5 hover:bg-[#a07822] duration-300 font-semibold bg-[#C4932C] text-white'
                                type='submit'
                            >
                                Submit
                            </button>
                        </dl>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;
