import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const LogInContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 300px;
`;

const Title = styled.h1`
    text-align: center;
    color: white;
    font-size: 28px;
    padding: 45px;
    padding-left: 380px;
`;

const Input = styled.input`
    width: 300%;
    height: 50px;
    background-color: white;
    border: none;
    border-radius: 40px;
    margin-bottom: -15px;
`;

const Warning = styled.p`
    color: red;
    text-align: right;
    position: relative;
    left: 155px;
    top: 10px;
`;

const Submit = styled.button`
    width: 300%;
    height: 50px;
    border-radius: 20px;
    border: none;
    background-color: ${props => (props.active ? "yellow" : "white")};
    color: black;
`;

const LogoutButton = styled.button`
    margin-top: 20px;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background-color: red;
    color: white;
`;

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [idMessage, setIDMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [isId, setIsID] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const navigate = useNavigate();

    const handleIDChange = (e) => {
        const currentID = e.target.value;
        setId(currentID);
        if (!currentID.trim()) {
            setIDMessage("아이디를 입력하세요");
            setIsID(false);
        } else {
            setIsID(true);
            setIDMessage("");
        }
    };

    const handlePasswordChange = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        if (!currentPassword.trim()) {
            setPasswordMessage("비밀번호를 입력하세요");
            setIsPassword(false);
        } else {
            setIsPassword(true);
            setPasswordMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isId && isPassword) {
            const loginInfo = {
                username: id,
                password,
            };

            const login_info = {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const response = await fetch("http://localhost:8080/auth/login", login_info);

                if (response.ok) {
                    const data = await response.json();
                    console.log("로그인 성공!", data);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', id);
                    localStorage.setItem('isLoggedIn', 'true');
                    alert(`${id}님 환영합니다.`);
                    navigate('/');
                } else {
                    const data = await response.json();
                    setError(data.message);
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } else {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
        }
    };

    return (
        <LogInContainer>
            <Title>로그인 페이지</Title>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={id}
                    onChange={handleIDChange}
                    placeholder="아이디를 입력해주세요"
                />
                <Warning className="message">{idMessage}</Warning>
                <br />
                <Input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호를 입력해주세요"
                />
                <Warning className="message">{passwordMessage}</Warning>
                <br />
                <Submit type="submit">로그인</Submit>
            </form>
        </LogInContainer>
    );
}

export default Login;
