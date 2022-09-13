document.getElementById("create")?.addEventListener("click", submit);

while (!sessionStorage.getItem("backendUrl")) {
  const backendUrl = prompt("Enter backend URL (ex: http://localhost:3000)");
  if (backendUrl) {
    sessionStorage.setItem("backendUrl", backendUrl);
    break;
  }
}

async function submit(e: Event) {
  const backendUrl = sessionStorage.getItem("backendUrl");
  e.preventDefault();
  const field = [
    "courseNo",
    "abbrName",
    "courseNameTh",
    "courseNameEn",
    "department",
    "credit",
    "creditHours",
    "genEdType",
  ];
  let course: any = {};
  for (const f of field) {
    const input = document.getElementById(f) as HTMLInputElement;
    course[f] = input.value as string;
  }
  course.credit = Number(course.credit);
  // Request
  const response = await fetch(`${backendUrl}/course/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  const data = await response.json();
  console.log(data);
  console.log("saving", course);
  alert("บันทึกสำเร็จ");
  window.history.back();
}
