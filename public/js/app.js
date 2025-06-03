const data = {
  users: [],
  courses: [],
};

const toggleMenu = document.querySelector(".toggle-sidebar");
const showUsersElem = document.querySelector(".show-users");
const coursesBody = document.querySelector(".table-body");
const modalScreen = document.querySelector(".modal-screen");
const pagination = document.querySelector(".pagination");
const coursesData = document.querySelectorAll(".courses-data");
const usersData = document.querySelector(".users-data");
const toast = document.querySelector(".toast");
const createCourseBtn = document.querySelector(".create-course");

const userSection = () => {
  fetch("https://js-cms.iran.liara.run/api/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        data.users.push(user);

        const lastUsers = data.users.slice(-4)

        showUsersElem.innerHTML = "";
        lastUsers.forEach((user) => {
          showUsersElem.insertAdjacentHTML(
            "beforeend",
            `
            <article>
              <span class="icon-card">
                <i class="fa-solid fa-user"></i>
              </span>
              <div>
                <p class="user-name">${user.firstname} ${user.lastname}</p>
                <p class="user-email">${user.email}</p>
              </div>
            </article>
            `
          )
        })
      });
      usersData.innerHTML = data.users.length
    })
};

const coursesSection = () => {
  fetch("https://js-cms.iran.liara.run/api/courses")
    .then((response) => response.json())
    .then((courses) => {
      courses.forEach((course) => {
        data.courses.push(course);

        const lastCourses = data.courses.slice(-4)

        coursesBody.innerHTML = "";
        lastCourses.forEach(course => {


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
                <button class="remove-btn" onclick="showRemoveCourseModal(${course._id})">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            `
          );
        })
      });

      coursesData.innerHTML = data.courses.length
    }
  )
}

function showEditCourseModal(courseID) {
  modalScreen.classList.remove("hidden");
  modalScreen.innerHTML = "";
  modalScreen.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal">
      <i class="ui-border top red"></i>
      <i class="ui-border bottom red"></i>
      <header class="modal-header">
        <h3>ویرایش دوره</h3>
        <button class="close-modal">
          <i class="fas fa-times"></i>
        </button>
      </header>
      <main class="modal-content">
        <input type="text" class="modal-input" placeholder="عنوان دوره را وارد نمائید ..." id="course-title" />
        <input type="number" class="modal-input" placeholder="قیمت دوره را وارد نمائید ..." id="course-price" />
        <input type="text" class="modal-input" placeholder="دسته بندی دوره را وارد نمائید ..." id="course-category" />
      </main>
      <footer class="modal-footer">
        <button class="cancel">انصراف</button>
        <button class="submit">تائید</button>
      </footer>
    </div>
    `
  );

  const closeModalBtn = modalScreen.querySelector(".close-modal");
  const cancelBtn = modalScreen.querySelector(".cancel");
  const submitBtn = modalScreen.querySelector(".submit");

  const titleInput = modalScreen.querySelector("#course-title");
  const priceInput = modalScreen.querySelector("#course-price");
  const categoryInput = modalScreen.querySelector("#course-category");

  closeModalBtn.addEventListener("click", HideModalScreen);
  cancelBtn.addEventListener("click", HideModalScreen);

  const selectedCourse = data.courses.find((c) => c.id === courseID);

  titleInput.value = selectedCourse.title;
  priceInput.value = selectedCourse.price;
  categoryInput.value = selectedCourse.category;

  submitBtn.addEventListener("click", function () {
    selectedCourse.title = titleInput.value;
    selectedCourse.price = +priceInput.value;
    selectedCourse.category = categoryInput.value;
    coursesSection();
    HideModalScreen();
    ShowToast();
  });
}

function showCreateCourseModal() {
  modalScreen.classList.remove("hidden");
  modalScreen.innerHTML = "";
  modalScreen.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal">
      <i class="ui-border top red"></i>
      <i class="ui-border bottom red"></i>
      <header class="modal-header">
        <h3>ایجاد دوره</h3>
        <button class="close-modal">
          <i class="fas fa-times"></i>
        </button>
      </header>
      <main class="modal-content">
        <input type="text" class="modal-input" placeholder="عنوان دوره را وارد نمائید ..." id="course-title" />
        <input type="number" class="modal-input" placeholder="قیمت دوره را وارد نمائید ..." id="course-price" />
        <input type="text" class="modal-input" placeholder="دسته بندی دوره را وارد نمائید ..." id="course-category" />
      </main>
      <footer class="modal-footer">
        <button class="cancel">انصراف</button>
        <button class="submit">تائید</button>
      </footer>
    </div>
    `
  );

  const closeModalBtn = modalScreen.querySelector(".close-modal");
  const cancelBtn = modalScreen.querySelector(".cancel");
  const submitBtn = modalScreen.querySelector(".submit");

  const titleInput = modalScreen.querySelector("#course-title");
  const priceInput = modalScreen.querySelector("#course-price");
  const categoryInput = modalScreen.querySelector("#course-category");

  closeModalBtn.addEventListener("click", HideModalScreen);
  cancelBtn.addEventListener("click", HideModalScreen);

  submitBtn.addEventListener("click", function () {
    const newCourse = {
      id: data.courses.length + 1,
      title: titleInput.value,
      price: +priceInput.value,
      category: categoryInput.value,
    };

    data.courses.push(newCourse);
    coursesSection();
    HideModalScreen();
    ShowToast();
  });
}

function showRemoveCourseModal(courseID) {
  modalScreen.classList.remove("hidden");
  modalScreen.innerHTML = "";
  modalScreen.insertAdjacentHTML("beforeend",
    `
    <div class="modal">
      <i class="ui-border top red"></i>
      <i class="ui-border bottom red"></i>
      <header class="modal-header">
        <h3>حذف دوره</h3>
        <button class="close-modal">
          <i class="fas fa-times"></i>
        </button>
      </header>
      <main class="modal-content">
        <p class="remove-text">آیا از حذف این دوره اطمینان دارید؟</p>
      </main>
      <footer class="modal-footer">
        <button class="cancel">انصراف</button>
        <button class="submit">تائید</button>
      </footer>
    </div>
    `
  );

  const closeModalBtn = modalScreen.querySelector(".close-modal");
  const cancelBtn = modalScreen.querySelector(".cancel");
  const submitBtn = modalScreen.querySelector(".submit");

  closeModalBtn.addEventListener("click", HideModalScreen);
  cancelBtn.addEventListener("click", HideModalScreen);

  submitBtn.addEventListener("click", function () {
    const index = data.courses.findIndex((c) => c.id === courseID);
    if (index === -1) return;
    data.courses.splice(index, 1);
    coursesSection();
    HideModalScreen();
  });
}

function HideModalScreen() {
  modalScreen.classList.add("hidden");
}

function ShowToast() {
  const process = toast.querySelector(".process");
  toast.classList.remove("hidden");

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
}

toggleMenu.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});

if (showUsersElem) {
  userSection();
}

coursesSection();