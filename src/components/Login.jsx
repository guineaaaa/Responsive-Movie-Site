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
            const storedId = localStorage.getItem('id');
            const storedPasswordToken = localStorage.getItem('passwordToken');
            const storedPasswordData = storedPasswordToken ? JSON.parse(atob(storedPasswordToken)) : null;
    
            console.log("storedId:", storedId);
            console.log("storedPasswordData:", storedPasswordData);
    
            if (storedId && storedPasswordData) {
                const { password: storedPassword } = storedPasswordData;
                console.log("storedPassword:", storedPassword); 
    
                if (id === storedId && password === storedPassword) {
                    alert(`${id}님 환영합니다.`);
                    localStorage.setItem('token', 'dummy-token'); // Save a dummy token for session management
                    localStorage.setItem('userId', id);
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/');
                } else {
                    alert("아이디 혹은 비밀번호를 확인하세요.");
                }
            } else {
                alert("저장된 계정 정보가 없습니다. 회원가입을 진행해주세요.");
            }
        } else {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isLoggedIn');
        alert("로그아웃 되었습니다.");
        navigate('/login'); // Redirect to the login page or any other appropriate page
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
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </LogInContainer>
    );
}

export default Login;
