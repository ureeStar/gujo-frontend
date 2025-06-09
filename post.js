document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8080/post", {
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) throw new Error("조회 실패");

    const data = await response.json();
    console.log("받은 데이터:", data);
    const reversedData = data.slice().reverse(); // 최신글 먼저

    const tableBody = document.querySelector("#applications-table tbody");
    console.log("tbody 있음?", tableBody);
    
    reversedData.forEach((post, index) => {
      const row = document.createElement("tr");

      // 이름 마스킹: 홍길동 → 홍*동
      const name = maskName(post.name ?? "익명");

      row.innerHTML = `
        <td>${reversedData.length - index}</td>
        <td>${name}</td>
        <td>${post.number || "010-****-****"}</td>
        <td>비밀 글입니다.</td>
        <td>${post.createdAt?.replace("T", " ").substring(0, 16) || "-"}</td>
      `;

      tableBody.appendChild(row);
    });

  } catch (err) {
    console.error("문의글 조회 실패:", err);
    alert("불러오기 중 오류가 발생했습니다.");
  }
});

function maskName(name) {
  if (name.length < 2) return "*";
  return name
    .split("")
    .map((ch, i) => (i === 1 ? "*" : ch))  // 두 번째 글자만 마스킹
    .join("");
}
