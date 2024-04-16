/* 좋아요 버튼(하트) 클릭 시 비동기로 좋아요 INSERT/DELETE */

// Thymeleaf는 아래와 같이 이뤄져 있음
// - html 코드(+ css, js) 
// - th: 코드(java) , Spring EL

// Thymeleaf 코드 해석 순서
// 1. th: 코드(java) , Spring EL
// 2. html 코드(+ css, js) 

// 1) 로그인한 회원 번호 준비
//    --> session에서 얻어오기 (session은 서버에서 관리하기때문에 JS로 얻어 올 수 없음)

// 2) 현재 게시글 번호 준비

// 3) 좋아요 여부 준비


//--------------------------------------------------------------------------------------------------------------

//1. #boardLike가 클릭 되었을 때
const boardLike = document.querySelector("#boardLike");
boardLike.addEventListener("click",e=>{

  //2. 로그인 상태가 아닌 경우 동작이 안되도록 하기
  if(loginMemberNo == null){
    alert("로그인 후 이용해 주세요");
    return;
  }

  //3. 준비된 3개의 변수를 객체로 저장 (JSOM 변환 예정)
  const obj ={
    "memberNo" : loginMemberNo,
    "boardNo" : boardNo,
    "likeCheck" : likeCheck
  };

  //4. 좋아요 INSERT/DELETE 비동기 요청
  fetch("/board/like",{
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(obj) //객체를 JSON으로 문자열화
  })
.then(resp => resp.text()) //반환 결과 test(글자)형태로 변환
.then(count=>{
  // count == 첫 번째 then의 파싱되어 반환된 값(-1 또는 게시글 좋아요 수)
  //console.log("result : ",result);

  if(count == -1){
    console.log("좋아요 처리 실패");
    return;
  }

  //5. likeCheck 값 0 <-> 1 q변환
  //  (왜? > 클릭될 때마다 INSERT/DELETE 동작을 번갈아 가면서 할 수 있음)
  likeCheck = likeCheck == 0 ? 1 : 0;

  //6. 하트를 채웠다/비웠다 바꾸기 -> 토글 이용
  e.target.classList.toggle("fa-regular");
  e.target.classList.toggle("fa-solid");

  //7. 게시글 좋아요 수 수정
  e.target.nextElementSibling.innerText = count;
});
});


//--------삭제버튼 클릭시-----------------------------------------------
const deleteBtn = document.querySelector("#deleteBtn");

if(deleteBtn != null){

  deleteBtn.addEventListener("click",()=>{

    if(!confirm("삭제하시겠습니까?")){
      alert("취소되었습니다");
      return;
    }

    // 확인버튼 클릭시
    //location.href = `/editBoard/${boardCode}/${boardNo}/delete?cp=${cp}`;
    //location.replace -> 기능: 기존페이지를 새로운 페이지로 변경
    //location.pathname -> hostname 뒤의 '/'문자 뒤의 경로를 가져옴
    //location.search -> '?' 뒤의 쿼리스트링을 가져옴 
    const url = location.pathname.replace("board","editBoard") + "/delete"; // /editBoard/1/2000/delete
    const queryString = location.search; // ? cp=1
    location.href = url + queryString;
  
  });

};



