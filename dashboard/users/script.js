const data = {
    users: [],
  };
const toggleMenu = document.querySelector(".toggle-sidebar");
const showUsersElem = document.querySelector(".table-body");
const pagination = document.querySelector(".pagination");
const usersData = document.querySelector(".users-data");
const modalScreen = document.querySelector(".modal-screen")
const toast = document.querySelector(".toast")

const latestUsersSection = () => {
    fetch("https://js-cms.iran.liara.run/api/users")
      .then((response) => response.json())
      .then((apiUsers) => {
        data.users = apiUsers;
  
          let page = 1;
          let userPerPage = 5;
          let startUserIndex = (page - 1) * userPerPage;
          let endUserIndex = startUserIndex + userPerPage;
  
          const showUsers = data.users.slice(startUserIndex, endUserIndex);
  
          showUsersElem.innerHTML = "";
  
          showUsers.forEach((user) => {
            showUsersElem.insertAdjacentHTML("beforeend",
            `
            <div class="tableRow">
              <p class="user-fullName">${user.firstname} ${user.lastname}</p>
              <p class="user-username">${user.username}</p>
              <p class="user-email">${user.email}</p>
              <p class="user-city">${user.city}</p>
              <div class="course-manage">
                <button class="edit-btn">
                  <!-- Edit icon -->
                  <i class="fas fa-edit"></i>
                </button>
                <button class="remove-btn" onclick="showRemoveUserModal('${user._id}')">
                  <!-- Ban icon -->
                  <i class="fas fa-ban"></i>
                </button>
              </div>
            </div>
            `
            );
        });
        if (usersData) {
          usersData.innerHTML = data.users.length;
        }
      })
    }

  const showRemoveUserModal = (userID) => {
    modalScreen.classList.remove("hidden")
    modalScreen.innerHTML = "";
    modalScreen.insertAdjacentHTML("beforeend",
        `
        <div class="modal">
            <i class="ui-border top red"></i>
            <i class="ui-border bottom red"></i>
            <header class="modal-header">
              <h3>اخراج کاربر</h3>
              <button class="close-modal">
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
    )
  }

const removeUser = (userID) => {
  fetch(`https://js-cms.iran.liara.run/api/users/${userID}`, {method: "DELETE"})
    .then(response => {
        if (response.status === 200){
            const process = toast.querySelector(".process");
            const toastText = toast.querySelector(".toast-content")
            toast.classList.remove("hidden");
            toastText.innerHTML = "کاربر با موفقیت حذف شد"
          
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
    })
}

toggleMenu.addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("open");
  });

latestUsersSection();