const data = {
    courses: [],
  };
  
const toggleMenu = document.querySelector(".toggle-sidebar");
const coursesBody = document.querySelector(".table-body");
const coursesData = document.querySelectorAll(".courses-data");
const pagination = document.querySelector(".pagination");
const modalScreen = document.querySelector(".modal-screen");
const toast = document.querySelector(".toast");
const createCourseBtn = document.querySelector("#create-course")

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
          <button class="remove-btn" onclick="showRemoveCourseModal('${course._id}')">
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

const showRemoveCourseModal = (courseID) => {
  modalScreen.classList.remove("hidden");
  modalScreen.innerHTML = "";
  modalScreen.insertAdjacentHTML("beforeend",
    `
    <div class="modal">
      <i class="ui-border top red"></i>
      <i class="ui-border bottom red"></i>
      <header class="modal-header">
        <h3>حذف دوره</h3>
        <button class="close-modal" onclick="hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </header>
      <main class="modal-content">
        <p class="remove-text">آیا از حذف این دوره اطمینان دارید؟</p>
      </main>
      <footer class="modal-footer">
        <button class="cancel" onclick="hideModal()">انصراف</button>
        <button class="submit" onclick="removeCourse('${courseID}')">تائید</button>
      </footer>
    </div>
    `
  );
};

const hideModal = () => modalScreen.classList.add("hidden")

const removeCourse = (courseID) => {
  fetch(`https://js-cms.iran.liara.run/api/courses/${courseID}`, { method: "DELETE" })
      .then((response) => {
          if (response.status === 200) {
            const process = toast.querySelector(".process");
            const toastText = toast.querySelector(".toast-content");
            toast.classList.remove("hidden");
            toastText.innerHTML = "دوره با موفقیت حذف شد";
          
            let timer;
            let processWidth = 0;
          
            timer = setInterval(function () {
              process.style.width = `${processWidth++}%`;
              if (processWidth === 120) {
                clearInterval(timer);
                toast.classList.add("hidden");
                process.style.width = "0%";
                processWidth = 0;
              }
            }, 50);
        
            coursesSection();
            hideModal();
          }
      });
};

const showCreateCourseModal = () => {
  modalScreen.classList.remove("hidden")
  modalScreen.innerHTML = "";
  modalScreen.insertAdjacentHTML("beforeend",
    `
    <div class="modal">
      <i class="ui-border top red"></i>
      <i class="ui-border bottom red"></i>
        <header class="modal-header">
          <h3>ایجاد دوره</h3>
          <button class="close-modal" onclick="hideModal()">
            <i class="fas fa-times"></i>
          </button>
        </header>
        <main class="modal-content">
          <input
            type="text"
            class="modal-input"
            placeholder="عنوان دوره را وارد نمائید ..."
            id="course-title"
          />
          <input
            type="number"
            class="modal-input"
            placeholder="قیمت دوره را وارد نمائید ..."
            id="course-price"
          />
          <input
            type="number"
            class="modal-input"
            placeholder="دسته بندی دوره را وارد نمائید ..."
            id="course-category"
          />
        </main>
        <footer class="modal-footer">
          <button class="cancel" onclick="hideModal()">انصراف</button>
          <button class="submit" onclick="createNewCourse()">تائید</button>
        </footer>
    </div>
    `
  );
}



createCourseBtn.addEventListener("click" , showCreateCourseModal)
toggleMenu.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});

coursesSection();
  