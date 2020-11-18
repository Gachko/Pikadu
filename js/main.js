var firebaseConfig = {
  apiKey: "AIzaSyBACDMaBRffSHE56QyI4KYoynYU_hH1Vrw",
  authDomain: "pikakadu.firebaseapp.com",
  databaseURL: "https://pikakadu.firebaseio.com",
  projectId: "pikakadu",
  storageBucket: "pikakadu.appspot.com",
  messagingSenderId: "132306588859",
  appId: "1:132306588859:web:3780a28d815633f478459e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 

const refExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');


const listUsers = [
  {
    id: '01',
    email: 'test@mail.ru',
    password: '12345',
    displayName: 'Test',
    photo: 'https://i.pinimg.com/236x/74/05/5f/74055f83bfbdc20fdc1f9d1fc116fd26.jpg'
  },
  {
    id: '02',
    email: 'test1@mail.ru',
    password: 'qwerty',
    displayName: 'Test1'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if(!refExpValidEmail.test(email)) return alert('Email не валиден')
    const user = this.getUser(email);
    if(user && user.password === password) {
      this.authorizedUser(user);
      handler();
    }
    else {
      alert('Пользователь не найден')
    }
  },
  logOut(handler) {
    this.user = null;
    handler()
  },
  signUp(email, password, handler) {

    if(!refExpValidEmail.test(email)) return alert('Email не валиден')

    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }

   if(!this.getUser(email) ) {
      const user = {
        email, 
        password, 
        displayName: email.substring(0, email.indexOf('@')),
        photo: 'https://i.pinimg.com/236x/74/05/5f/74055f83bfbdc20fdc1f9d1fc116fd26.jpg'
      };
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован')
    }
  },
  editUser(username, photoURL = '', handler) {
    if(username) {
      this.user.displayName = username;
    }

    if(photoURL) {
      this.user.photo = photoURL;
    }

    handler();
  },
  getUser(email) {
    return listUsers.find(user => user.email === email )
  },
  authorizedUser(user) {
    this.user = user;
  },
};

const setPosts = {
  allPosts: [
    {
      title: 'Title',
      text: 'Lorem ispum daert fvjdj veedved vededed ecedcdced evedvedvdev',
      tags: [ 'new', 'hot', 'shtn', '2020' ],
      author: {displayName: 'test', photo: 'https://i.pinimg.com/236x/74/05/5f/74055f83bfbdc20fdc1f9d1fc116fd26.jpg'},
      date: '11.11.2020, 11:34:00',
      like: 15,
      comments: 20
    },
    {
      title: 'Title1',
      text: 'Lorem ispum daert fvjdj veedved vededed ecedcdced evedvedvdev',
      tags: [ 'new', 'hot', 'shtn', '2020' ],
      author: {displayName: 'test1', photo: 'https://lh3.googleusercontent.com/proxy/eqyCitSEYRyt9XoC3GhXTjW_CVDUTcjz0YoSxOgGHwpqwQ84xcU-l6h0d2evUjiiwxw6mQItSE-YDmFckJT8nhjve94JwU9YFCFa9x3Lpis9y9taKsipZVAJJb8eWDUESfLCjRsF_rhwN4AoIz4b_YF5nkg5SJzCmq-aU_k'},
      date: '12.11.2020, 13:34:00',
      like: 10,
      comments: 10
    }
  ],

  addPost(title, text, tags, handler) {

    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo:  setUsers.user.photo 
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0
    });
    //везде такая проверка
    if(handler) {
      handler();
    }


  }


};

const toggleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.style.display = 'block';
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.style.display = 'none';
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const showAllPosts = () => {



  let postsHTML = '';

  setPosts.allPosts.forEach( post => {
    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-text">${post.text}</p>         
      <div class="tags">
      ${post.tags.map((tag) => `<a href="#" class="tag">#${tag}</a>` )}           
      </div>
    </div>
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${post.like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${post.comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <!-- /.post-buttons -->
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${post.author.displayName}</a>
          <span class="post-time">${post.date}</span>
        </div>
        <a href="#" class="author-link"><img src="${post.author.photo || "img/avatar.png"}" alt="avatar" class="author-avatar"></a>
      </div>
      <!-- /.post-author -->
    </div>
    <!-- /.post-footer -->
  </section>
    `;
  });


  postsWrapper.innerHTML = postsHTML;
  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};



const init = () => {
  
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  });
  
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const emailValue = emailInput.value;
    const passwordValue =  passwordInput.value;
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom );
    loginForm.reset();
  
  });
  
  loginSignup.addEventListener('click', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue =  passwordInput.value;
  
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  
  });
  
  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  
  });
  
  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName
  });
  
  editContainer.addEventListener('submit', event => {
    event.preventDefault();
  
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
    editContainer.classList.remove('visible');
  });

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', event => {
    event.preventDefault();
   // const formElements = [...addPostElem.elements].filter(elem =>  elem.tagName !== 'button')
  // const fork = [...addPostElem.elements];
    
   const { title, text, tags } = addPostElem.elements; 

   if(title.value.length < 6) {
     alert('Слишком короткий заголовок');
     return;
   }

   if(text.value.length < 50) {
    alert('Слишком короткий текст');
    return;
  }


   setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

   addPostElem.classList.remove('visible');
   addPostElem.reset();

   });

  showAllPosts();
  toggleAuthDom();
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});





