const data = {
    users: [],
  };
const showUsersElem = document.querySelector(".table-body");
const pagination = document.querySelector(".pagination");
const usersData = document.querySelector(".users-data");

const latestUsersSection = () => {
    fetch("https://js-cms.iran.liara.run/api/users")
      .then((response) => response.json())
      .then((apiUsers) => {
        apiUsers.forEach((user) => {
          data.users.push(user)
  
          let page = 1;
          let userPerPage = 5;
          let startUserIndex = (page - 1) * userPerPage;
          let endUserIndex = startUserIndex + userPerPage;
  
          const showUsers = data.users.slice(startUserIndex, endUserIndex);
  
          showUsersElem.innerHTML = "";
  
          showUsers.forEach(function (user) {
            showUsersElem.insertAdjacentHTML("beforeend",
            `
            <div class="tableRow">
              <p class="user-fullName">${user.firstname} ${user.lastname}</p>
              <p class="user-username">${user.username}</p>
              <p class="user-email">${user.email}</p>
              <p class="user-city">${user.city}</p>
              <div class="product-manage">
                <button class="edit-btn">
                  <!-- Edit icon -->
                  <i class="fas fa-edit"></i>
                </button>
                <button class="remove-btn">
                  <!-- Ban icon -->
                  <i class="fas fa-ban"></i>
                </button>
              </div>
            </div>
            `
            );
          });
        });
        if (usersData) {
          usersData.innerHTML = data.users.length;
        }
      });
  };


latestUsersSection();
console.log(data.users);