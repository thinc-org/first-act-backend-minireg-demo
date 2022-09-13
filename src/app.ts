interface Course {
  courseNo: string;
  abbrName: string;
  courseNameTh: string;
  courseNameEn: string;
  department: string;
  credit: number;
  creditHours: string;
  genEdType: string;
  updatedAt: string;
}

while (true) {
  const backendUrl = prompt("Enter backend URL (ex: http://localhost:3000)");
  if (backendUrl) {
    sessionStorage.setItem("backendUrl", backendUrl);
    break;
  }
}

async function getCourse() {
  //get course
  const backendUrl = sessionStorage.getItem("backendUrl");
  const response = await fetch(`${backendUrl}/course/`);
  const data = await response.json();
  const courses: Course[] = data.courses;
  return courses;
}

async function init() {
  const courses = await getCourse();
  for (const course of courses) {
    const section = document.createElement("section");
    section.classList.add("course");
    section.innerHTML = `
                        <div class="">
                          <h3>${course.courseNo} ${course.abbrName}</h3>
                          <h4>จำนวนหน่วยกิต</h4>
                          <p>${course.credit} หน่วยกิต</p>
                          <h4>ภาควิชา/กลุ่มวิชา/สาขาวิชา</h4>
                          <p>${course.department}</p>
                          <h4>ประเภท GenEd</h4>
                          <p>${
                            course.genEdType === "NO"
                              ? "ไม่ใช่ GenEd"
                              : course.genEdType
                          }</p>
                        </div>
                        <button type="button" class="btn delete-btn">
                          Delete
                        </button>
                        `;

    const container = document.getElementById("courses-container");
    container?.appendChild(section);
  }
}

async function deleteCourse(courseId: string) {
  //delete course
  const backendUrl = sessionStorage.getItem("backendUrl");
  const response = await fetch(`${backendUrl}/course/${courseId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  await init();
  alert("Deleted Course");
}

init();
