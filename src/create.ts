document.getElementById("create")?.addEventListener("click", submit);

async function submit(e: Event) {
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
  console.log("saving", course);
  alert("บันทึกสำเร็จ");
  window.history.back();
}
