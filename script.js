// ✅ URL에서 link 파라미터 읽는 함수
function getLinkParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get('link'); // 없으면 null
}

// ✅ link 파라미터 ↔️ 탭 아이디 매핑
const linkToTab = {
  cslca2ox: 'tab1',
  cxwqbewy: 'tab2',
  code3: 'tab3',
  code4: 'tab4',
  code5: 'tab5',
  code6: 'tab6',
  code7: 'tab7',
  code8: 'tab8'
};
const tabToLink = {
  tab1: 'cslca2ox',
  tab2: 'cxwqbewy',
  tab3: 'code3',
  tab4: 'code4',
  tab5: 'code5',
  tab6: 'code6',
  tab7: 'code7',
  tab8: 'code8'
};

// ✅ 문서 준비 완료
document.addEventListener('DOMContentLoaded', () => {

  // 1️⃣ nav 버튼 active 처리 + 클릭시 이동
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav button').forEach(button => {
    const buttonHref = button.getAttribute('data-href');
    if (buttonHref === currentPath) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      location.href = buttonHref;
    });
  });

  // 2️⃣ 지도 초기화
  const container = document.getElementById('map');
  let map, marker;
  if (container) { // 지도가 존재할 때만 초기화!
    const options = {
      center: new kakao.maps.LatLng(37.06986, 127.01770),
      level: 3
    };
    map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(37.06986, 127.01770);
    marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
  }

  // 3️⃣ 기본 탭 설정
  const linkParam = getLinkParam();
  const defaultTab = linkToTab[linkParam] || 'tab1';
  activateTab(defaultTab);

  // 문서 로드 직후 (네가 이미 가지고 있던 activateTab 호출 아래!)
if (defaultTab === 'tab2' && map && marker) {
  setTimeout(() => {
    map.relayout();
    const centerPosition = new kakao.maps.LatLng(37.06986, 127.01770);
    map.setCenter(centerPosition);
    marker.setPosition(centerPosition);
  }, 200);
}

  // 4️⃣ 탭 클릭 이벤트
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      const newLink = tabToLink[tabId] || 'cslca2ox';

      // URL 파라미터 갱신
      const url = new URL(window.location);
      url.searchParams.set('link', newLink);
      window.history.pushState({}, '', url);

      // 탭 활성화
      activateTab(tabId);

      // 지도 탭일 때 지도 리사이즈/마커 다시 지정
      if (tabId === 'tab2' && map && marker) {
        setTimeout(() => {
          map.relayout();
          const centerPosition = new kakao.maps.LatLng(37.06986, 127.01770);
          map.setCenter(centerPosition);
          marker.setPosition(centerPosition);
        }, 200);
      }
    });
  });

  // 5️⃣ 길찾기/지도에서 보기 버튼
  const findWayBtn = document.getElementById('find-way-btn');
  const viewMapBtn = document.getElementById('view-map-btn');
  if (findWayBtn) {
    findWayBtn.addEventListener('click', () => {
      const placeName = "다원엔지니어링";
      const lat = 37.06986;
      const lng = 127.01770;
      const kakaoMapUrl = `https://map.kakao.com/link/to/${encodeURIComponent(placeName)},${lat},${lng}`;
      window.open(kakaoMapUrl, '_blank');
    });
  }
  if (viewMapBtn) {
    viewMapBtn.addEventListener('click', () => {
      const placeName = "다원엔지니어링";
      const lat = 37.06986;
      const lng = 127.01770;
      const kakaoMapUrl = `https://map.kakao.com/link/map/${encodeURIComponent(placeName)},${lat},${lng}`;
      window.open(kakaoMapUrl, '_blank');
    });
  }

});

// ✅ 탭 활성화 함수
function activateTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  const activeTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const activeContent = document.getElementById(tabId);
  if (activeTab && activeContent) {
    activeTab.classList.add('active');
    activeContent.classList.add('active');
  }
}


// 견적문의_ 모달 창

  // 요소 선택
  const modal = document.getElementById("privacyModal");
  const openBtn = document.getElementById("privacyLink");
  const closeBtn = document.getElementById("closeBtn");
  const closeSpan = document.querySelector(".close");

  // 열기
  openBtn.onclick = function(e) {
    e.preventDefault(); // 기본 동작 방지
    modal.style.display = "block";
  }

  // 닫기
  closeBtn.onclick = function() {
    modal.style.display = "none";
  }
  closeSpan.onclick = function() {
    modal.style.display = "none";
  }

  // 바깥 영역 클릭하면 닫기
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
  document.getElementById('fileInput').addEventListener('change', function(e) {
    const files = e.target.files;
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // 이미지 미리보기 표시
                console.log(e.target.result); // base64 데이터
            };
            reader.readAsDataURL(file);
        }
    });
});
});


// 견적문의 폼 제출 이벤트
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault(); // 폼 기본 동작 막기

    const name = document.getElementById("name").value.trim();
    const number = document.getElementById("contact").value.trim();
    const content = document.getElementById("message").value.trim();
    const agreed = document.getElementById("privacy").checked;

    if (!name || !number || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (!agreed) {
      alert("개인정보 수집에 동의하셔야 등록이 가능합니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ name, number, content })
      });

      if (response.ok) {
        alert("문의가 등록되었습니다!");
        document.querySelector("form").reset(); // 입력값 초기화
      } else {
        const text = await response.text();
        alert("등록 실패: " + text);
      }
    } catch (err) {
      alert("서버 연결 실패");
      console.error(err);
    }
  });
});

// 로그인 함수
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password }),
    credentials: "include" // ✅ JSESSIONID 쿠키 받기 위해 꼭 필요!
  });

  const text = await response.text();
  console.log("로그인 응답:", text);

  if (response.ok) {
    alert("로그인 성공!");

    // ✅ 로그인 성공 시 견적 목록 페이지로 이동
    window.location.href = "/admin/applications.html";
    
  } else {
    alert("로그인 실패: " + text);
  }
}


// 파일 업로드 버튼 클릭 시 실행될 함수
async function uploadPhoto() {
  const fileInput = document.querySelector('#fileInput'); // input type="file" 요소
  const file = fileInput.files[0]; // 사용자가 선택한 파일

  const formData = new FormData();
  formData.append('file', file); // key는 서버에서 받는 이름: file

  const response = await fetch('http://localhost:8080/admin/uploadPhoto', {
    method: 'POST',
    body: formData,
    credentials: 'include' // 세션 쿠키(JSESSIONID) 같이 보내기!
  });

  const result = await response.text(); // 서버 응답
  console.log(result); // 결과 출력
}


// 문의 게시판 익명화
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/inquiries");
  const data = await response.json();

  const container = document.getElementById("post-list");

  data.forEach(item => {
    const box = document.createElement("div");
    box.className = "inquiry-box";

    const maskedContent = item.secret ? "비밀 글입니다." : item.content;

    box.innerHTML = `
      <div><strong>이름:</strong> ${item.secret ? "비공개" : item.name}</div>
      <div><strong>연락처:</strong> ${item.secret ? "비공개" : item.phone}</div>
      <div><strong>내용:</strong> ${maskedContent}</div>
      <div><strong>작성일:</strong> ${item.createdAt}</div>
    `;

    container.appendChild(box);
  });
});
