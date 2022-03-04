// redux
// store
// view
// action

// state
// reducer{action,state}
// store
// Store Methods​
// getState()
// dispatch(action)
// subscribe(listener)
// replaceReducer(nextReducer)
console.log(window.Redux);
//destructuring
const { createStore } = window.Redux;

const initialState = JSON.parse(localStorage.getItem("hobby_list")) || [];

const hobbyReducer = (state = initialState, action) => {
  //Buoc kiem tra
  switch (action.type) {
    case "ADD_HOBBY": {
      //clone ve mang moi
      const newList = [...state];
      newList.push(action.payload);
      return newList;
    }
    default:
      return state;
  }
};

const store = createStore(hobbyReducer);
//createStore co the nhan multiple reducer

//RENDER REDUX HOBBY LIST

const renderHobbyList = (hobbyList) => {
  //check co phai la mang hoac la mang rong
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return null;
  const ulElement = document.querySelector("#hobbyListId");
  if (!ulElement) return null;
  //reset previous content of ul
  ulElement.innerHTML = "";
  for (const hobby of hobbyList) {
    const liElement = document.createElement("li");
    liElement.textContent = hobby;
    ulElement.appendChild(liElement);
  }
};

//RENDER INITIAL HOBBY LIST
// getState()
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);
//truyen data tinh
// renderHobbyList(["Play football", "Listen to music", "Watch movie"]);

//handle form submit

const hobbyFormElement = document.querySelector("#hobbyForm");
if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const hobbyTextElement = document.querySelector("#hobbyText");
    if (!hobbyTextElement) return null;
    // console.log('SUBMIT', hobbyTextElement.value);
    const action = {
      type: "ADD_HOBBY",
      payload: hobbyTextElement.value,
    };
    store.dispatch(action);
  };
  hobbyFormElement.addEventListener("submit", handleFormSubmit);
}

store.subscribe(() => {
  console.log("STATE UPDATE:", store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);
  //Lưu xuống localStorage
  localStorage.setItem("hobby_list", JSON.stringify(newHobbyList));
});
