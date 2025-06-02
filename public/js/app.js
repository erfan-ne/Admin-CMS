//* Cms -> Content Management System

const data = {
  users: [
    {
      id: 1,
      name: "عرفان نشاطی",
      username: "erfan",
      email: "erfan@gmail.com",
      password: "erfan1212",
    },
    {
      id: 2,
      name: "اصغر اصغری",
      username: "asghar",
      email: "asghar@gmail.com",
      password: "asghar1212",
    },
    {
      id: 3,
      name: "کاظم کاظمی",
      username: "kazem",
      email: "kazem@gmail.com",
      password: "kazem1212",
    },
    {
      id: 4,
      name: "مراد مرادی",
      username: "morad",
      email: "morad@gmail.com",
      password: "morad1212",
    },{
      id: 5,
      name: "امیر امیری",
      username: "amir",
      email: "amir@gmail.com",
      password: "amir1212",
    },
    {
      id: 6,
      name: "فرید فریدی",
      username: "farid",
      email: "farid@gmail.com",
      password: "farid1212",
    },
    {
      id: 7,
      name: "محمد محمدی",
      username: "mmd",
      email: "mmd@gmail.com",
      password: "mmd1212",
    },
    {
      id: 8,
      name: "احمد احمدی",
      username: "ahmad",
      email: "ahmad@gmail.com",
      password: "ahmad1212",
    },
  ],

  products: [
    {
      id: 1,
      title: "کفش ورزشی",
      price: 2000000,
      slug: "nike-sport-shoe",
    },
    {
      id: 2,
      title: "تیشرت",
      price: 550000,
      slug: "sport-shirt",
    },
    {
      id: 3,
      title: "پیراهن",
      price: 1000000,
      slug: "blues",
    },
    {
      id: 4,
      title: "راکت تنیس",
      price: 5600000,
      slug: "tennis-racket",
    },
    {
      id: 5,
      title: "توپ فوتبال",
      price: 4200000,
      slug: "football-ball",
    },
    {
      id: 6,
      title: "کمربند ورزشی",
      price: 1700000,
      slug: "sport-Belt",
    },
    {
      id: 7,
      title: "دستکش",
      price: 200000,
      slug: "gloves",
    },
    {
      id: 8,
      title: "جوراب",
      price: 100000,
      slug: "socks",
    },
  ],
};

const toggleMenu = document.querySelector(".toggle-sidebar");
const latestUsers = document.querySelector(".latest-users");
const productsBody = document.querySelector(".table-body");
const modalScreen = document.querySelector(".modal-screen")
const pagination = document.querySelector(".pagination")
const productsData = document.querySelectorAll(".products-data")
const usersData = document.querySelector(".users-data")
const toast = document.querySelector(".toast")
const createProductBtn = document.querySelector(".create-product")

function loadPage(){
  productsData.forEach(function(productData){
    productData.innerHTML = data.products.length
  })
  
  if (usersData){
    usersData.innerHTML = data.users.length
  }
}

function latestUsersSection(){
  let page = 1;
  let userPerPage = 5;
  let startUserIndex = (page - 1) * userPerPage;
  let endUserIndex = startUserIndex + userPerPage;

  const showUsers = data.users.slice(startUserIndex , endUserIndex)

  showUsers.forEach(function(user){
    latestUsers.insertAdjacentHTML("beforeend" , 
      `
      <article>
        <!-- user icon -->
        <span class="icon-card">
          <i class="fa-solid fa-user"></i>
        </span>
        <!-- user data -->
        <div>
          <p class="user-name">${user.name}</p>
          <p class="user-email">${user.email}</p>
        </div>
      </article>
      `
    )
  })
}

function productsSection(){
  let page = 1;
  let productPerPage = 6;

  renderProducts(page);
  
  const pagesCount = data.products.length / productPerPage
  
  if(pagination){
    pagination.innerHTML = "";

    for (let i = 0 ; i < pagesCount ; i++){
      pagination.insertAdjacentHTML("beforeend" , 
      `
      <span class="page ${i=== 0 ? "active" : ""}" 
      onclick="changePageHandler(${i}+1)">${i+1}</span>
      `
      )
    }
  }
    window.changePageHandler = function(userSelectedPage){
      page = userSelectedPage;

      const pageNumbers = document.querySelectorAll(".page")

      pageNumbers.forEach(function(number){
        if (+number.innerHTML === page){
          number.classList.add("active")
        } else {
          number.classList.remove("active")
        }
      })
      renderProducts(page);
    }

    function renderProducts(currentPage){
      productsBody.innerHTML = ""
      let startProductIndex = (currentPage - 1) * productPerPage;
      let endProductIndex = startProductIndex + productPerPage;
      const showProducts = data.products.slice(startProductIndex , endProductIndex)
      
      showProducts.forEach(function(product){
        productsBody.insertAdjacentHTML("beforeend" ,
          `
          <div class="tableRow">
            <p class="product-title">${product.title}</p>
            <p class="product-price">${product.price.toLocaleString()}</p>
            <p class="product-shortName">${product.slug}</p>
            <div class="product-manage">
              <button class="edit-btn" onclick="showEditModal(${product.id})">
                <!-- Edit icon -->
                <i class="fas fa-edit"></i>
              </button>
              <button class="remove-btn" onclick="showRemoveModal(${product.id})">
                <!-- Delete fas icon -->
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          `
        )
      })
    }
}

function showEditModal(productID){
  modalScreen.classList.remove("hidden")
  modalScreen.innerHTML = "";
  modalScreen.insertAdjacentHTML("beforeend" ,
    `
    <div class="modal">
      <i class="ui-border top red"></i>
      <i class="ui-border bottom red"></i>
      <header class="modal-header">
          <h3>ویرایش محصول</h3>
          <button class="close-modal">
            <i class="fas fa-times"></i>
          </button>
        </header>
        <main class="modal-content">
          <input
            type="text"
            class="modal-input"
            placeholder="عنوان محصول را وارد نمائید ..."
            id="product-title"
          />
          <input
            type="number"
            class="modal-input"
            placeholder="قیمت محصول را وارد نمائید ..."
            id="product-price"
          />
          <input
            type="text"
            class="modal-input"
            placeholder="عنوان کوتاه محصول را وارد نمائید ..."
            id="product-shortName"
          />
        </main>
        <footer class="modal-footer">
          <button class="cancel">انصراف</button>
          <button class="submit">تائید</button>
        </footer>
    </div>
    `
  );
  const closeModalBtn = modalScreen.querySelector(".close-modal")
  const cancelDeleteBtn = modalScreen.querySelector(".cancel")
  const submitDeleteBtn = modalScreen.querySelector(".submit")
  const titleInput = modalScreen.querySelector("#product-title")
  const priceInput = modalScreen.querySelector("#product-price")
  const shortNameInput = modalScreen.querySelector("#product-shortName")
  
  closeModalBtn.addEventListener("click" , HideModalScreen)
  cancelDeleteBtn.addEventListener("click" , HideModalScreen)

  const selectProduct = data.products.find(function(p){
    return p.id === productID
  });

  titleInput.value = selectProduct.title;
  priceInput.value = selectProduct.price;
  shortNameInput.value = selectProduct.slug;

  submitDeleteBtn.addEventListener("click" , function(){
    
    selectProduct.title = titleInput.value
    selectProduct.price = +priceInput.value
    selectProduct.slug = shortNameInput.value
    productsBody.innerHTML = ""
    productsSection()
    HideModalScreen()
    ShowToast()
  })
}

function showCreateModal(){
  modalScreen.classList.remove("hidden")
  modalScreen.innerHTML = "";
  modalScreen.insertAdjacentHTML("beforeend" , 
    `
    <div class="modal">
        <i class="ui-border top red"></i>
        <i class="ui-border bottom red"></i>
        <header class="modal-header">
            <h3>ایجاد محصول</h3>
            <button class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </header>
          <main class="modal-content">
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان محصول را وارد نمائید ..."
              id="product-title"
            />
            <input
              type="number"
              class="modal-input"
              placeholder="قیمت محصول را وارد نمائید ..."
              id="product-price"
            />
            <input
              type="number"
              class="modal-input"
              placeholder="عنوان کوتاه محصول را وارد نمائید ..."
              id="product-shortName"
            />
          </main>
          <footer class="modal-footer">
            <button class="cancel">انصراف</button>
            <button class="submit">تائید</button>
          </footer>
      </div>
    `
  )
  const closeModalBtn = modalScreen.querySelector(".close-modal")
  const cancelDeleteBtn = modalScreen.querySelector(".cancel")
  const submitDeleteBtn = modalScreen.querySelector(".submit")
  const titleInput = modalScreen.querySelector("#product-title")
  const priceInput = modalScreen.querySelector("#product-price")
  const shortNameInput = modalScreen.querySelector("#product-shortName")
  
  closeModalBtn.addEventListener("click" , HideModalScreen)
  cancelDeleteBtn.addEventListener("click" , HideModalScreen)

  submitDeleteBtn.addEventListener("click" , function(){
    const NewProduct = {
      id: data.products.length + 1,
      title: titleInput.value,
      price: priceInput.value,
      slug: shortNameInput.value,
    }

    data.products.push(NewProduct)

    productsSection()
    HideModalScreen()
    loadPage()
  })
}

function showRemoveModal(productID){
  modalScreen.classList.remove("hidden")
  modalScreen.innerHTML = "";
  modalScreen.insertAdjacentHTML("beforeend" , 
    `      
    <div class="modal">
      <i class="ui-border top red"></i>
      <i class="ui-border bottom red"></i>
      <header class="modal-header">
        <h3>حذف محصول</h3>
        <button class="close-modal">
          <i class="fas fa-times"></i>
        </button>
      </header>
      <main class="modal-content">
        <p class="remove-text">آیا از حذف این محصول اطمینان دارید؟</p>
      </main>
      <footer class="modal-footer">
        <button class="cancel">انصراف</button>
        <button class="submit">تائید</button>
      </footer>
    </div>
    `
  )
  const closeModalBtn = modalScreen.querySelector(".close-modal")
  const cancelDeleteBtn = modalScreen.querySelector(".cancel")
  const submitDeleteBtn = modalScreen.querySelector(".submit")

  closeModalBtn.addEventListener("click" , HideModalScreen)
  cancelDeleteBtn.addEventListener("click" , HideModalScreen)

  submitDeleteBtn.addEventListener("click", function () {
    const index = data.products.findIndex(p => p.id === productID);
    if (index === -1) return;
    data.products.splice(index, 1);
    productsBody.innerHTML = "";
    productsSection();
    HideModalScreen();
  });
}

function HideModalScreen(){
  modalScreen.classList.add("hidden")
}

function ShowToast(){
  const process = toast.querySelector(".process")
  toast.classList.remove("hidden")
  
  let Timer;
  let proccessWidth = 0;

  Timer = setInterval(function(){
    process.style.width = `${proccessWidth++}%`;
    if (proccessWidth === 120){
      clearInterval(Timer)
      toast.classList.add("hidden")
      process.style.width = "0%" ;
      proccessWidth = 0 ;
    }
  } , 50)
}

toggleMenu.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});

if (latestUsers){
  latestUsersSection()
}

productsSection()