// 모달을 열기 위한 버튼 요소를 가져옵니다.
var openButton = document.getElementById("open");
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
