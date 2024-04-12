
const number=document.getElementById("num");
// id가 num인 요소를 가져와서 변수에 할당

const increase=document.getElementById("increase");
// id가 increase인 요소를 가져와서 변수에 할당하기

const decrease=document.getElementById("decrease");
// id가 decrease인 요소를 가져와서 변수에 할당하기

// increase 버튼 클릭 시 이벤트 핸들러 설정
increase.onclick=()=>{
    const current=parseInt(number.innerText, 10);
    // 현재 표시된 숫자를 가져와서 10진수로 변환 후 current 변수에 할당
    number.innerText=current+1;
    // 가져온 숫자에 1을 더한 값을 표시된 숫자로 설정하기
    // innerText는 Element의 속성으로 사용자에게 보여지는 text값을 가져오거나 설정할 수 있다
    console.log("increase +1")
    // 콘솔에 increase 버튼이 클릭됨을 표시
};

decrease.onclick=()=>{
    const current=parseInt(number.innerText, 10);
    number.innerText=current-1;
    console.log("decrease -1")
};
