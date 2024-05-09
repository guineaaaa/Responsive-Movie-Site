import { useState } from "react";
import styled from 'styled-components';
import React from "react";

const LogInContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    text-align: center;
    color: white;
    font-size: 28px;
    padding:45px;
`;

const Input = styled.input`
    width:30%;
    height:50px;
    background-color:white;
    border:none;
    border-radius:20px;
    
`;

const Submit = styled.button`
    width: 30%; 
    height: 50px;
    border-radius: 20px;
    border: none;
    background-color: ${props => (props.active ? "yellow" : "white")};
    color: black;
`;

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [isName, setIsName] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const handleNameChange = (e) => {
        const currentName = e.target.value;
        setName(currentName);
        setIsName(!!currentName.trim()); // 이름이 비어있지 않으면 true
    };

    const handlePasswordChange = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        setIsPassword(!!currentPassword.trim()); // 비밀번호가 비어있지 않으면 true
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isName && isPassword) {
            // 이름과 비밀번호가 모두 입력되었을 때 로그인 처리
            console.log("로그인 처리:", { name, password });
            // 로그인 처리 로직을 추가하세요
        } else {
            alert("이름과 비밀번호를 모두 입력해주세요.");
        }
    };

    return (

        <LogInContainer onSubmit={handleSubmit}>
                <Title>로그인 페이지</Title>
                <Input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="이름을 입력해주세요"
                />
                <br></br>
                <Input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호를 입력해주세요"
                />
                <br></br>
                <Submit type="submit">로그인</Submit>
        </LogInContainer>
    );
}

export default Login;
