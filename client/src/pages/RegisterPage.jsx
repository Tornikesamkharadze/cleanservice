import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    })
    const [passwordMatch, setPasswordMatch] = useState(true)

    useEffect(() => { setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "") })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value,
        });
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const register_form = new FormData()

            for (var key in formData) {
                register_form.append(key, formData[key])
            }

            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                body: register_form
            })

            if (response.ok) {
                navigate("/login")
            }
        } catch (err) {
            console.log("Registration failed", err.message)
        }
    }

    return (
        <div className='register'>
            <div className='register_content'>
                <form className='register_content_form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='სახელი'
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder='გვარი'
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder='იმეილი'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder='ტელეფონის ნომერი'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder='პაროლი'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder='გაიმეორეთ პაროლი'
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    {!passwordMatch && (
                        <p style={{ color: "red" }}>პაროლი არ ემთხვევა</p>
                    )}

                    <input
                        type="file"
                        name="profileImage"
                        accept='image/*'
                        onChange={handleChange}
                        required
                        style={{ display: "none", borderRadius: "50%" }}
                        id="image"
                    />

                    <label htmlFor='image'>
                        <img src='/assets/addImage.png' alt="add profile poto" />
                        <p>დაამატე პროფილის სურათი</p>
                    </label>
                    {formData.profileImage && (
                        <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="profile photo"
                            style={{ maxWidth: "80px" }}
                        />
                    )}
                    <button type='submit' disabled={!passwordMatch}>რეგისტრაცია</button>
                </form>
                <a href="/login">Already have an account? Log in here</a>
            </div>
        </div>
    )
}

export default RegisterPage;
