import { useState } from "react";
import styled from 'styled-components';
import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

const SignUpContainer = styled.div`
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
    margin-bottom:-10px;
    width:30%;
    height:50px;
    background-color:white;
    border:none;
    border-radius:20px;
`;

const Warning = styled.p`
    color:red;
    
`;

const Submit = styled.button`
    width:30%;
    height:50px;
    border-radius:20px;
    border:none;
    background-color:${props => props.active ? "yellow" : "white"};
    color:black;
`;

const BacktoMain=styled.button`
    border:none;
    font-size:15px;
    background:none;
    color:white;
    font-weight:bold;
`;

const If=styled.span`
    margin-top:30px;
    font-size:15px;
    color:white;
`;

const Signup = () => {
    // 초기값 세팅하기 - 이름, 이메일, 나이, 비밀번호, 비밀번호 확인
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // 오류 메세지 상태 저장
    const [nameMessage, setNameMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [ageMessage, setAgeMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setpasswordConfirmMessage] = useState("");

    // 유효성 검사
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isAge, setIsAge] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    const navigate = useNavigate(); // useNavigate 훅 사용

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

    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!currentEmail.trim()) {
            setNameMessage("이메일을 입력하세요");
            setIsEmail(false);
            return;
        } else if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일 형식에 맞게 다시 입력해주세요!");
            setIsEmail(false);
            return;
        } else {
            setIsEmail(true);
            setEmailMessage("");
            
            return;
        }
    };

    const onChangeAge = (e) => {
        const currentAge = e.target.value;
        setAge(currentAge);

        if (!currentAge.trim()) {
            setAgeMessage("나이를 입력하세요");
            setIsAge(false);
            return;
        }

        if (isNaN(currentAge) || parseInt(currentAge) < 0 || parseFloat(currentAge) % 1 !== 0) {
            setAgeMessage("올바른 나이를 입력하세요");
            setIsAge(false);
            return;
        }

        if (parseInt(currentAge) < 19) {
            setAgeMessage("19세 이상만 가입할 수 있습니다");
            setIsAge(false);
            return;
        }

        setAgeMessage("");
        setIsAge(true);
    };

    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);

        if (!currentPassword.trim()) {
            setPasswordMessage("비밀번호를 입력하세요");
            setIsPassword(false);
            return;
        }

        if (currentPassword.length < 4) {
            setPasswordMessage("비밀번호는 최소 4자리 이상이어야 합니다");
            setIsPassword(false);
            return;
        }

        if (currentPassword.length > 12) {
            setPasswordMessage("비밀번호는 최대 12자리까지 가능합니다");
            setIsPassword(false);
            return;
        }

        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage("영어, 숫자, 특수문자를 모두 포함하여 입력하세요");
            setIsPassword(false);
            return;
        }
        setPasswordMessage("");
        setIsPassword(true);
    };

    const onChangePasswordConfirm = (e) => {
        const currentPasswordConfirm = e.target.value;
        setPasswordConfirm(currentPasswordConfirm);

        if (!currentPasswordConfirm.trim()) {
            setpasswordConfirmMessage("비밀번호를 다시 입력해 주세요!");
            setIsPasswordConfirm(false);
        } else if (password !== currentPasswordConfirm) {
            setpasswordConfirmMessage("비밀번호가 일치하지 않습니다!");
            setIsPasswordConfirm(false);
        } else {
            setpasswordConfirmMessage("");
            setIsPasswordConfirm(true);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const signupInfo = {
            name: name,
            email: email,
            age: age,
            password: password,
        };
    
        // 로컬 스토리지에 회원 가입 정보 저장
        localStorage.setItem('signupInfo', JSON.stringify(signupInfo));
    
        const signup_info = {
            method: "POST", //서버로 데이터 전송하기
            body: JSON.stringify(signupInfo), //전송할데이터를 JSON형식으로
            headers: { //HTTP요청 헤더를 설정한다. 전송되는 데이터의 형식은 JSON임
                "Content-Type": "application/json"
            }
        };
    
        if (isName && isEmail && isAge && isPassword && isPasswordConfirm) {
            console.log(signupInfo);
            fetch("http://localhost:3000/Login", signup_info)
                .then(() => {
                    alert("가입이 완료 되었습니다.");
                    navigate("/Login"); // useNavigate 훅을 사용하여 라우팅 처리
                })
                .catch(error => console.error('Error:', error));
        } else {
            alert("입력 값을 확인해주세요");
        }
    
        // 로컬 스토리지에 저장된 회원 가입 정보 콘솔에 출력
        const storedSignupInfo = JSON.parse(localStorage.getItem('signupInfo'));
        console.log("Stored Signup Info:", storedSignupInfo);
    }
    

    // 제출하기 버튼 스타일링을 위한 클래스 조건 설정
    const submitButtonStyle = isName && isEmail && isAge && isPassword && isPasswordConfirm ? true : false;

    return (
        <SignUpContainer>
            <Title>회원가입 페이지</Title>

            <Input id="name" name="name" value={name} onChange={onChangeName} placeholder="이름을 입력해주세요" />
            <Warning className="message">{nameMessage}</Warning>

            <Input id="email" name="Email" value={email} onChange={onChangeEmail} placeholder="이메일을 입력해주세요" />
            <Warning className="message">{emailMessage}</Warning>

            <Input id="age" name="Age" value={age} onChange={onChangeAge} placeholder="나이를 입력해주세요" />
            <Warning className="message">{ageMessage}</Warning>

            <Input id="password" name="Password" value={password} onChange={onChangePassword} placeholder="비밀번호를 입력해주세요" />
            <Warning className="message">{passwordMessage}</Warning>

            <Input id="passwordConfirm" name="PasswordConfirm" value={passwordConfirm} onChange={onChangePasswordConfirm} placeholder="비밀번호 확인" />
            <Warning className="message">{passwordConfirmMessage}</Warning>

            <Submit active={submitButtonStyle} onClick={handleSubmit}>제출하기</Submit>

            <If>이미 아이디가 있으신가요?<BacktoMain onClick={() => navigate('/Login')}>로그인 페이지로 이동하기</BacktoMain></If> 
        </SignUpContainer>
    );
}

export default Signup;
