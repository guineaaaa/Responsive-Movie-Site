import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    text-align: center;
    color: white;
    font-size: 2em;
    padding: 35px;
    margin-top: 30px;
    margin-bottom: -10px;
`;

const Input = styled.input`
    margin-bottom: -15px;
    width: 30%;
    height: 50px;
    background-color: white;
    border: none;
    border-radius: 40px;
`;

const Warning = styled.p`
    color: red; 
`;

const Submit = styled.button`
    width: 30%;
    height: 50px;
    border-radius: 20px;
    border: none;
    background-color: ${props => props.active ? "yellow" : "white"};
    color: black;
    cursor: ${props => props.active ? "pointer" : "not-allowed"};
`;

const BacktoMain = styled.button`
    border: none;
    font-size: 1em;
    background: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

const If = styled.span`
    margin-top: 30px;
    font-size: 1em;
    color: white;
`;

const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordConfirm] = useState("");

    const [nameMessage, setNameMessage] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [ageMessage, setAgeMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    const [error, setError] = useState("");

    const [isName, setIsName] = useState(false);
    const [isUsername, setIsUsername] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isAge, setIsAge] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    const navigate = useNavigate();

    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);
        if (!currentName.trim()) {
            setNameMessage("이름을 입력하세요");
            setIsName(false);
        } else {
            setIsName(true);
            setNameMessage("");
        }
    };

    const onChangeUsername = (e) => {
        const currentUsername = e.target.value;
        setUsername(currentUsername);
        if (!currentUsername.trim()) {
            setUsernameMessage("아이디를 입력하세요");
            setIsUsername(false);
        } else {
            setIsUsername(true);
            setUsernameMessage("");
        }
    };

    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!currentEmail.trim()) {
            setEmailMessage("이메일을 입력하세요");
            setIsEmail(false);
        } else if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일 형식에 맞게 다시 입력해주세요!");
            setIsEmail(false);
        } else {
            setIsEmail(true);
            setEmailMessage("");
        }
    };

    const onChangeAge = (e) => {
        const currentAge = e.target.value;
        setAge(currentAge);

        if (!currentAge.trim()) {
            setAgeMessage("나이를 입력하세요");
            setIsAge(false);
        } else if (isNaN(currentAge) || parseInt(currentAge) < 0 || parseFloat(currentAge) % 1 !== 0) {
            setAgeMessage("올바른 나이를 입력하세요");
            setIsAge(false);
        } else if (parseInt(currentAge) < 19) {
            setAgeMessage("19세 이상만 가입할 수 있습니다");
            setIsAge(false);
        } else {
            setIsAge(true);
            setAgeMessage("");
        }
    };

    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);

        if (!currentPassword.trim()) {
            setPasswordMessage("비밀번호를 입력하세요");
            setIsPassword(false);
        } else if (currentPassword.length < 4) {
            setPasswordMessage("비밀번호는 최소 4자리 이상이어야 합니다");
            setIsPassword(false);
        } else if (currentPassword.length > 12) {
            setPasswordMessage("비밀번호는 최대 12자리까지 가능합니다");
            setIsPassword(false);
        } else {
            const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
            if (!passwordRegExp.test(currentPassword)) {
                setPasswordMessage("영어, 숫자, 특수문자를 모두 포함하여 입력하세요");
                setIsPassword(false);
            } else {
                setIsPassword(true);
                setPasswordMessage("");
            }
        }
    };

    const onChangePasswordConfirm = (e) => {
        const currentPasswordConfirm = e.target.value;
        setPasswordConfirm(currentPasswordConfirm);

        if (!currentPasswordConfirm.trim()) {
            setPasswordConfirmMessage("비밀번호를 다시 입력해 주세요!");
            setIsPasswordConfirm(false);
        } else if (password !== currentPasswordConfirm) {
            setPasswordConfirmMessage("비밀번호가 일치하지 않습니다!");
            setIsPasswordConfirm(false);
        } else {
            setIsPasswordConfirm(true);
            setPasswordConfirmMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    age,
                    username,
                    password,
                    passwordCheck,
                }),
            });

            if (response.status === 201) {
                const data = await response.json();
                console.log("회원가입 성공!", data);
                alert("회원가입이 정상적으로 처리되었습니다!");
                navigate("/login");
            } else {
                const data = await response.json();
                setError(data.message);
                alert(data.message); // 서버에서 받은 에러 메시지를 사용자에게 알림
            }
        } catch (error) {
            console.error("Error:", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const submitButtonStyle = isName && isUsername && isEmail && isAge && isPassword && isPasswordConfirm;

    return (
        <SignUpContainer>
            <Title>회원가입 페이지</Title>

            <Input id="name" name="name" value={name} onChange={onChangeName} placeholder="이름을 입력해주세요" />
            <Warning>{nameMessage}</Warning>

            <Input id="username" name="username" value={username} onChange={onChangeUsername} placeholder="아이디를 입력해주세요" />
            <Warning>{usernameMessage}</Warning>

            <Input id="email" name="Email" value={email} onChange={onChangeEmail} placeholder="이메일을 입력해주세요" />
            <Warning>{emailMessage}</Warning>

            <Input id="age" name="Age" value={age} onChange={onChangeAge} placeholder="나이를 입력해주세요" />
            <Warning>{ageMessage}</Warning>

            <Input id="password" name="Password" type="password" value={password} onChange={onChangePassword} placeholder="비밀번호를 입력해주세요" />
            <Warning>{passwordMessage}</Warning>

            <Input id="passwordCheck" name="PasswordCheck" type="password" value={passwordCheck} onChange={onChangePasswordConfirm} placeholder="비밀번호 확인" />
            <Warning>{passwordConfirmMessage}</Warning>

            <Submit active={submitButtonStyle} onClick={handleSubmit} disabled={!submitButtonStyle}>제출하기</Submit>

            <If>이미 아이디가 있으신가요? <BacktoMain onClick={() => navigate('/Login')}>로그인 페이지로 이동하기</BacktoMain></If>
        </SignUpContainer>
    );
};

export default Signup;
