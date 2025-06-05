const data = {
    users: [],
  };
  
  const toggleMenu = document.querySelector(".toggle-sidebar");
  const showUsersElem = document.querySelector(".table-body");
  const pagination = document.querySelector(".pagination");
  const usersData = document.querySelector(".users-data");
  const modalScreen = document.querySelector(".modal-screen");
  const toast = document.querySelector(".toast");
  
  let page = 1;
  const userPerPage = 6;
  
  const latestUsersSection = () => {
    fetch("https://js-cms.iran.liara.run/api/users")
      .then((response) => response.json())
      .then((apiUsers) => {
        data.users = apiUsers;
  
        renderUsers(page);
        renderPagination();
  
        if (usersData) {
          usersData.innerHTML = data.users.length;
        }
      });
  };
  
  function renderUsers(currentPage) {
    showUsersElem.innerHTML = "";
  
    const startIndex = (currentPage - 1) * userPerPage;
    const endIndex = startIndex + userPerPage;
    const showUsers = data.users.slice(startIndex, endIndex);
  
    showUsers.forEach((user) => {
      showUsersElem.insertAdjacentHTML(
        "beforeend",
        `
        <div class="tableRow">
          <p class="user-fullName">${user.firstname} ${user.lastname}</p>
          <p class="user-username">${user.username}</p>
          <p class="user-email">${user.email}</p>
          <p class="user-city">${user.city}</p>
          <div class="course-manage">
            <button class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button class="remove-btn" onclick="showRemoveUserModal('${user._id}')">
              <i class="fas fa-ban"></i>
            </button>
          </div>
        </div>
        `
      );
    });
  }
  
  function renderPagination() {
    const pagesCount = Math.ceil(data.users.length / userPerPage);
    if (pagination) {
      pagination.innerHTML = "";
      for (let i = 0; i < pagesCount; i++) {
        pagination.insertAdjacentHTML(
          "beforeend",
          `<span class="page ${i === 0 ? "active" : ""}" onclick="changeUserPageHandler(${i + 1})">${i + 1}</span>`
        );
      }
    }
  }
  
  window.changeUserPageHandler = function (userSelectedPage) {
    page = userSelectedPage;
  
    const pageNumbers = document.querySelectorAll(".page");
    pageNumbers.forEach((number) =>
      number.classList.toggle("active", +number.innerHTML === page)
    );
  
    renderUsers(page);
  };
  
  const showRemoveUserModal = (userID) => {
    modalScreen.classList.remove("hidden");
    modalScreen.innerHTML = "";
    modalScreen.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modal">
          <i class="ui-border top red"></i>
          <i class="ui-border bottom red"></i>
          <header class="modal-header">
            <h3>اخراج کاربر</h3>
            <button class="close-modal" onclick="hideRemoveUserModal()">
              <i class="fas fa-times"></i>
            </button>
          </header>
          <main class="modal-content">
            <p class="remove-text">آیا از اخراج(بن) کردن این کاربر اطمینان دارید؟</p>
          </main>
          <footer class="modal-footer">
            <button class="cancel" onclick="hideRemoveUserModal()">انصراف</button>
            <button class="submit" onclick="removeUser('${userID}')">تائید</button>
          </footer>
      </div>
      `
    );
  };

  const hideRemoveUserModal = () => modalScreen.classList.add("hidden")
  
  const removeUser = (userID) => {
    fetch(`https://js-cms.iran.liara.run/api/users/${userID}`, { method: "DELETE" }).then((response) => {
      if (response.status === 200) {
        const process = toast.querySelector(".process");
        const toastText = toast.querySelector(".toast-content");
        toast.classList.remove("hidden");
        toastText.innerHTML = "کاربر با موفقیت حذف شد";
  
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
  
        latestUsersSection();
        hideRemoveUserModal()
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
              type="text"
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
  
  const createNewCourse = () => {
    const courseTitle = document.querySelector("#course-title")
    const coursePrice = document.querySelector("#course-price")
    const courseCategory = document.querySelector("#course-category")
  
    const newCourse = {
      title: courseTitle.value,
      price: +coursePrice.value,
      category: courseCategory.value,
      registersCount: 100,
      discount: "1",
      desc: "fake desc"
    }
  
    fetch("https://js-cms.iran.liara.run/api/courses" ,{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCourse)
    }).then(response => {
      if(response.status === 201){
        const process = toast.querySelector(".process");
        const toastText = toast.querySelector(".toast-content");
        toast.classList.remove("hidden");
        toastText.innerHTML = "دوره با موفقیت اضافه شد";
      
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
  
        coursesSection()
        hideModal()
      }
    })
  }
  
  toggleMenu.addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("open");
  });
  
  latestUsersSection();  