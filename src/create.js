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
var _a;
(_a = document.getElementById("create")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", submit);
function submit(e) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let course = {};
        for (const f of field) {
            const input = document.getElementById(f);
            course[f] = input.value;
        }
        course.credit = Number(course.credit);
        // Request
        console.log("saving", course);
        alert("บันทึกสำเร็จ");
        window.history.back();
    });
}
