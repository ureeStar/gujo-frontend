document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8080/admin/applications", {
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) throw new Error("조회 실패");

    const data = await response.json();
    const reversedData = data.slice().reverse(); // 최신 글 위로
    const tableBody = document.querySelector("#applications-table tbody");

    // 모달 관련 요소
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const closeBtn = document.querySelector(".close");

    // 테이블 그리기
    reversedData.forEach((form, index) => {
      const maxLength = 50;
      const shortContent = form.content.length > maxLength
        ? form.content.slice(0, maxLength) + "..."
        : form.content;

        console.log("삭제할 ID:", form.id)

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${reversedData.length - index}</td> <!-- No: 큰 숫자부터 작아짐 -->
        <td>${form.name}</td>
        <td>${form.number}</td>
        <td class="content-cell" style="cursor:pointer;" data-full="${form.content}" title="클릭하여 전체 보기">${shortContent}</td>
        <td>${form.createdAt?.replace("T", " ").substring(0, 16) || "-"}</td>
        <td><button class="delete-button" data-id="${form.id}">삭제</button></td>
      `;

      tableBody.appendChild(row);
    });

    // 🔹 모달 열기
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("content-cell")) {
        const fullContent = e.target.dataset.full;
        modalText.textContent = fullContent;
        modal.style.display = "block";
      }
    });

    // 🔹 모달 닫기
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
      if (e.target == modal) modal.style.display = "none";
    };

  } catch (err) {
    console.error("견적 목록 불러오기 실패:", err);
    alert("조회에 실패했습니다. 로그인 상태를 확인해주세요.");
  }
});

// 🔹 삭제 버튼 클릭 이벤트는 DOMContentLoaded 밖에서도 가능
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-button")) {
    const id = e.target.dataset.id;
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`http://localhost:8080/admin/applications/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!response.ok) throw new Error("삭제 실패");

      // DOM에서 해당 tr 제거
      const row = e.target.closest("tr");
      if (row) row.remove();

    } catch (err) {
      console.error("삭제 중 오류:", err);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  }
});
