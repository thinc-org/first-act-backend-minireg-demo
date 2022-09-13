"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
while (!sessionStorage.getItem("backendUrl")) {
    const backendUrl = prompt("Enter backend URL (ex: http://localhost:3000)");
    if (backendUrl) {
        sessionStorage.setItem("backendUrl", backendUrl);
        break;
    }
}
function getCourse() {
    return __awaiter(this, void 0, void 0, function* () {
        //get course
        const backendUrl = sessionStorage.getItem("backendUrl");
        const response = yield fetch(`${backendUrl}/course/`);
        const data = yield response.json();
        const courses = data.courses;
        return courses;
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield getCourse();
        const container = document.getElementById("courses-container");
        if (container) {
            container.innerHTML = "";
        }
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
                          <p>${course.genEdType === "NO"
                ? "ไม่ใช่ GenEd"
                : course.genEdType}</p>
                        </div>
                        <button type="button" onclick="deleteCourse('${course.courseNo}')" class="btn delete-btn">
                          Delete
                        </button>
                        `;
            const container = document.getElementById("courses-container");
            container === null || container === void 0 ? void 0 : container.appendChild(section);
        }
    });
}
function deleteCourse(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        //delete course
        const backendUrl = sessionStorage.getItem("backendUrl");
        const response = yield fetch(`${backendUrl}/course/${courseId}`, {
            method: "DELETE",
        });
        const data = yield response.json();
        console.log(data);
        yield init();
        alert("Deleted Course");
    });
}
init();
