// 1. 이름 입력 정보, 성공메세지, 실패메세지 가져오기
let elInputUsername = document.querySelector('#username');
let elSuccessUsernameMessage = document.querySelector('.success-name');
let elFailureUsernameMessage = document.querySelector('.fail-name');

// 2. 이메일 입력 정보, 성공메세지, 실패메세지 가져오기
let elInputEmail = document.querySelector('#email');
let elSuccessEmailMessage = document.querySelector('.success-email');
let elFailureEmailMessage = document.querySelector('.fail-email');

// 3. 나이 입력 정보, 성공메세지, 실패메세지 가져오기
let elInputAge = document.querySelector('#age');
let elSuccessAgeMessage = document.querySelector('.success-age');
let elFailureAgeMessage = document.querySelector('.fail-age');

// 4. 비밀번호 입력 정보, 성공메세지, 실패메세지 가져오기
let elInputPassword = document.querySelector('#password');
let elSuccessPasswordMessage = document.querySelector('.success-password');
let elFailurePasswordMessage = document.querySelector('.fail-password');

// 5. 비밀번호 확인 입력 정보, 불일치 메세지, 일치 메세지 가져오기
let elInputPasswordRetype = document.querySelector('#password-retype');
let elMismatchMessage = document.querySelector('.mismatch-message');
let elMatchMessage = document.querySelector('.match-message');


//!!! 유효성 검증 함수 작성하기!!!
//1. 이름, 3. 나이 => 빈칸X
function isNotEmpty(value) {
    return value.trim() !== ''; 
    // 입력값이 빈칸이 아니면 true 반환
}

//2. 이메일 형식
function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // 이메일 형식이 맞으면 true 반환
}

//4. 비밀번호 4자리 이상
function pwLength(value){
    return value.length>=4;
    // 4글자 이상이면 true, 이하면 false
}

//5. 비밀번호 일치
function isMatch(password1, password2){
    return password1==password2;
    // 비밀번호 확인이 일치 true, 불일치 false
}


//!!! 이벤트

//1. 이름 이벤트
elInputUsername.onkeyup = function() {
    //값을 입력한 경우
    if (isNotEmpty(elInputUsername.value)) {
        //실패 메세지 가리기
        elFailureUsernameMessage.classList.add('hide');
        //성공 메세지 보이기
        elSuccessUsernameMessage.classList.remove('hide');
    } else {
        //입력하지 않은경우, 성공 메세지 가리기
        elSuccessUsernameMessage.classList.add('hide');
        //입력하지 않은 경우. 실패 메세지 보이기
        elFailureUsernameMessage.classList.remove('hide');
    }
};


//2. 이메일 이벤트
elInputEmail.onkeyup=function() {
    //유효한 이메일 값을 입력한 경우
    if (validateEmailFormat(elInputEmail.value)) {
        // 실패 메세지 가리기
        elFailureEmailMessage.classList.add('hide');
        // 성공 메세지 보이기
        elSuccessEmailMessage.classList.remove('hide');
    } else {
        // 성공 메세지 가리기
        elSuccessEmailMessage.classList.add('hide');
        //실패 메세지 보이기
        elFailureEmailMessage.classList.remove('hide');
    }
};



//3. 나이 이벤트
elInputAge.onkeyup=function(){
    //값을 입력한 경우
    if (isNotEmpty(elInputAge.value)) {
        //실패 메세지 가리기
        elFailureAgeMessage.classList.add('hide');
        //성공 메세지 보이기
        elSuccessAgeMessage.classList.remove('hide');
    } else {
        //입력하지 않은경우, 성공 메세지 가리기
        elSuccessAgeMessage.classList.add('hide');
        //입력하지 않은 경우. 실패 메세지 보이기
        elFailureAgeMessage.classList.remove('hide');
    }
};




//4. 비밀번호 이벤트
elInputPassword.onkeyup=function(){
    //값을 입력한 경우
    if(elInputPassword.value.length!==0){
        if(pwLength(elInputPassword.value)){
            elFailurePasswordMessage.classList.add('hide');
            //실패 메세지 가리기
            elSuccessPasswordMessage.classList.remove('hide');
            //성공 메세지 보이기
        }
        else{
            elFailurePasswordMessage.classList.remove('hide');
            //실패 메세지 보이기
        }
    }else{
        elFailurePasswordMessage.remove('hide');
        //값을 입력하지 않은 경우 실패 메세지 보이기
    }
};


//5. 비밀번호 확인 이벤트
elInputPasswordRetype.onkeyup=function(){
    if(elInputPasswordRetype.value.length!==0){
        if(isMatch(elInputPassword.value, elInputPasswordRetype.value)){
            elMismatchMessage.classList.add('hide');
            //실패 메세지 가리기
            elMatchMessage.classList.remove('hide');
            // 성공 메세지 보이기
        }
        else{
            elMismatchMessage.classList.remove('hide');
            //실패 메세지 보이기
            elMatchMessage.classList.add('hide');
            //성공 메세지 가리기
        }
    }else{
        elMismatchMessage.classList.remove('hide');
        //값을 입력하지 않은 경우 실패 메세지 보이기
    }
}

// 모달을 열기 위한 버튼 요소를 가져옵니다.
var openButton = document.getElementById("signupButton");
// 모달 요소를 가져옵니다.
var modalWrapper = document.querySelector(".modal-wrapper");
// 모달 닫기 버튼 요소를 가져옵니다.
var closeButton = document.getElementById("close");

// 모달 열기 버튼 클릭 이벤트를 처리합니다.
openButton.addEventListener("click", function() {
  modalWrapper.style.display = "block"; // 모달을 보이도록 설정합니다.
});

// 모달 닫기 버튼 클릭 이벤트를 처리합니다.
closeButton.addEventListener("click", function() {
  modalWrapper.style.display = "none"; // 모달을 숨깁니다.
});
