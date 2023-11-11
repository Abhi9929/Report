const academics = document.querySelectorAll(".academics");

academics.forEach((academic) => {
  academic.addEventListener("click", (e) => {
    document.querySelector("#slct_course").style.display = "none";
    removeAll();
    showSubjects();

    if (e.target.id == "institute") {
      academic_type.textContent = `Institute Name: `;
      institute_session.style.display = "inline";

      const options = institute_session.querySelectorAll("option");
      institute_session.addEventListener("change", (e) => {
        const selectedOption = options[institute_session.selectedIndex];

        changeCourse(selectedOption.text);

        if (selectedOption.text == "Hotel Management") {
          Sub(
            "front office",
            "Room Service",
            "Food and Beverages",
            "Food Production"
          );
        } else if (selectedOption.text == "Programming") {
          Sub("C language", "C++", "OOPs", "DSA", "Aptitude");
        }
        marks_data.style.display = "block";
      });
    } else if (e.target.id == "school") {
      academic_type.textContent = `School Name: `;
      school_session.style.display = "inline";

      const options = school_session.querySelectorAll("option");
      school_session.addEventListener("change", (e) => {
        const selectedOption = options[school_session.selectedIndex];
        changeCourse(selectedOption.text);

        if (selectedOption.text == "Arts") {
          Sub(
            "English",
            "Geography",
            "Hindi",
            "Political Science",
            "Sociology"
          );
        } else if (selectedOption.text == "Science") {
          Sub("Biology", "Chemistry", "Mathematics", "Physics", "English");
        } else {
          Sub(
            "Accounts",
            "Business Study",
            "Economics",
            "English",
            "Mathematics"
          );
        }
        marks_data.style.display = "block";
      });
    } else if (e.target.id == "college") {
      academic_type.textContent = `College Name: `;
      college_session.style.display = "inline";

      const options = college_session.querySelectorAll("option");

      college_session.addEventListener("change", (e) => {
        const selectedOption = options[college_session.selectedIndex];
        changeCourse(selectedOption.text);

        if (selectedOption.text == "B.Tech") {
          Sub(
            "Operating System",
            "Computer Networking",
            "OOPs",
            "IOT",
            "Data Base"
          );
        } else if (selectedOption.text == "MBA") {
          Sub(
            "Finance",
            "Marketing",
            "Human Resources",
            "International Business",
            "Entrepreneurship"
          );
        } else {
          Sub(
            "Management",
            "Mathematics",
            "Operating System",
            "Computer Architecture",
            "E-commerce"
          );
        }
        marks_data.style.display = "block";
      });
    }
  });
});

function removeAll() {
  marks_data.style.display = "none";
  institute_session.style.display = "none";
  college_session.style.display = "none";
  school_session.style.display = "none";
}

function Sub(a, b, c, d, e) {
  sub1.innerHTML = `${a}`;
  sub2.innerHTML = `${b}`;
  sub3.innerHTML = `${c}`;
  sub4.innerHTML = `${d}`;
  sub5.innerHTML = `${e}`;
}

function showSubjects() {
  marks_data.innerHTML = `
    <div class="box">
      <h3 class="marks">Enter Marks:</h3>
        <div class="detail-box flex ">
          <label class="w6 " for="" id="sub1">Subject 1</label><input type="number" class="sub_marks" min="0" max="100">
        </div>
        <div class="detail-box flex ">
          <label class="w6 " for="" id="sub2">Subject 2</label><input type="number" class="sub_marks" min="0" max="100">
        </div>
        <div class="detail-box flex ">
          <label class="w6 " for="" id="sub3">Subject 3</label><input type="number" class="sub_marks" min="0" max="100">
        </div>
        <div class="detail-box flex ">
          <label class="w6 " for="" id="sub4">Subject 4</label><input type="number" class="sub_marks" min="0" max="100">
        </div>
         <div class="detail-box flex ">
          <label class="w6 " for="" id="sub5">Subject 5</label><input type="number" class="sub_marks" min="0" max="100">
        </div>
    </div>     
    `;
}

// Functioning Of Submit btn
document.querySelector(".submitBtn").addEventListener("click", (e) => {
  showResult();
  document.querySelector(".container").style.display = "none";
  document.querySelector(".res-container").style.display = "block";
});

//  Changing the Course name
const changeCourse = (myVal) => {
  document.getElementById("crse").innerHTML = `Course: ${myVal}`;
};

// Obtaning Details from User:
function showResult() {
  const nameOfStd = document.getElementById("Stdname").value;
  const nameOfFather = document.getElementById("Fthrname").value;
  student_name.innerHTML = `Name: ${nameOfStd}`;
  father_name.innerHTML = `Father's Name: ${nameOfFather}`;

  const marks = document.querySelectorAll(".sub_marks");

  const session = session_from.value + "-" + session_to.value;
  session_year.innerText = `Session: ${session}`;

  let tableContent = `
  <tr id="darkBg">
    <th>Subject</th>
    <th>Marks Obtained</th>
    <th>Grade</th>
  </tr>
  `;
  for (let i = 0; i < 5; i++) {
    const subject = window["sub" + (i + 1)].innerText;
    const marksObtained = parseInt(marks[i].value);
    let grade = "";
    if (!isNaN(marksObtained)) {
      // grade calculation
      if (marksObtained >= 90) {
        grade = "A1";
      } else if (marksObtained >= 80) {
        grade = "A2";
      } else if (marksObtained >= 70) {
        grade = "B1";
      } else if (marksObtained >= 60) {
        grade = "B2";
      } else if (marksObtained >= 50) {
        grade = "C1";
      } else if (marksObtained >= 40) {
        grade = "C2";
      } else if (marksObtained >= 33) {
        grade = "D";
      } else {
        grade = "F";
      }

      tableContent += `
      <tr>
      <td>${subject}</td>
      <td>${marksObtained}</td>
      <td>${grade}</td>
      </tr>`;
    } else {
      tableContent += `
            <tr>
              <td>${subject}</td>
              <td>-</td>
              <td>F</td>
            </tr>`;
    }
  }
  // Adding the obtained values in result
  table2.innerHTML = tableContent;


  // Calculating Toatlmarks, Grades and Percentage:
  const total = Array.from(marks).reduce((acc, inputElement) => {
    // Access the value of each input element
    const inputValue = parseFloat(inputElement.value) || 0;
    return acc + inputValue;
  }, 0);

  const percent = parseFloat(((total / 500) * 100).toFixed(1));
  const fixedPercent = Math.floor(percent);
  overallMarks.innerHTML = `${total} / 500`;
  percentage.innerHTML = `${percent}`;
  if (fixedPercent >= 91 && fixedPercent <= 100) {
    grade.innerHTML = `A1`;
  } else if (fixedPercent >= 81 && fixedPercent <= 90) {
    grade.innerHTML = `A2`;
  } else if (fixedPercent >= 71 && fixedPercent <= 80) {
    grade.innerHTML = `B1`;
  } else if (fixedPercent >= 61 && fixedPercent <= 70) {
    grade.innerHTML = `B2`;
  } else if (fixedPercent >= 51 && fixedPercent <= 60) {
    grade.innerHTML = `C1`;
  } else if (fixedPercent >= 41 && fixedPercent <= 50) {
    grade.innerHTML = `C2`;
  } else if (fixedPercent >= 33 && fixedPercent <= 40) {
    grade.innerHTML = `D`;
  } else {
    grade.innerHTML = `E`;
  }
}


// Print the Report Card:
const printBtn = document.querySelector(".res-btn");

printBtn.addEventListener("click", () => {
  darkBg.style.backgroundColor = "transparent";
  darkBg.style.color = "black";
  printBtn.remove();
  window.print();
});
