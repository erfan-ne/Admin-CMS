const data = {
    courses: [],
  };
  
  const toggleMenu = document.querySelector(".toggle-sidebar");
  const coursesBody = document.querySelector(".table-body");
  const coursesData = document.querySelectorAll(".courses-data");
  const pagination = document.querySelector(".pagination");
  
  let page = 1;
  let coursePerPage = 6;
  
  const coursesSection = () => {
    fetch("https://js-cms.iran.liara.run/api/courses")
      .then((response) => response.json())
      .then((courses) => {
        data.courses.push(...courses);
  
        renderCourses(page);
        renderPagination();
  
        coursesData.forEach((course) => (course.innerHTML = data.courses.length));
      });
  };
  
  function renderCourses(currentPage) {
    coursesBody.innerHTML = "";
    const startIndex = (currentPage - 1) * coursePerPage;
    const endIndex = startIndex + coursePerPage;
    const showCourses = data.courses.slice(startIndex, endIndex);
  
    showCourses.forEach(function (course) {
      coursesBody.insertAdjacentHTML(
        "beforeend",
        `
        <div class="tableRow">
          <p class="course-title">${course.title}</p>
          <p class="course-price">${course.price.toLocaleString()}</p>
          <p class="course-category">${course.category}</p>
          <div class="course-manage">
            <button class="edit-btn" onclick="showEditCourseModal(${course.id})">
              <i class="fas fa-edit"></i>
            </button>
            <button class="remove-btn" onclick="showRemoveCourseModal(${course.id})">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        `
      );
    });
  }
  
  function renderPagination() {
    const pagesCount = Math.ceil(data.courses.length / coursePerPage);
    if (pagination) {
      pagination.innerHTML = "";
      for (let i = 0; i < pagesCount; i++) {
        pagination.insertAdjacentHTML(
          "beforeend",
          `<span class="page ${i === 0 ? "active" : ""}" onclick="changePageHandler(${i + 1})">${i + 1}</span>`
        );
      }
    }
  }
  
  window.changePageHandler = function (userSelectedPage) {
    page = userSelectedPage;
  
    const pageNumbers = document.querySelectorAll(".page");
    pageNumbers.forEach((number) => {
      number.classList.toggle("active", +number.innerHTML === page);
    });
  
    renderCourses(page);
  };
  
  toggleMenu.addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("open");
  });
  
  coursesSection();
  