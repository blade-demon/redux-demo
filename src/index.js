let appState = {
  title: {
    text: "this is title",
    color: "red"
  },
  content: {
    text: "this is content",
    color: "blue"
  }
};

function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return; // 数据没有变化就不渲染了
  console.log("render app...");
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return;
  console.log("render title...");
  const titleDOM = document.getElementById("title");
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return;
  console.log("render content...");
  const contentDOM = document.getElementById("content");
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

function createStore(state, stateChanger) {
  const listeners = [];
  const subscribe = listener => listeners.push(listener);
  const getState = () => state;
  const dispatch = action => {
    state = stateChanger(state, action);
    listeners.forEach(listener => listener());
  };
  return { getState, dispatch, subscribe };
}

function stateChanger(state, action) {
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      state.title.text = action.text;
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case "UPDATE_TITLE_COLOR":
      state.title.color = action.color;
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };

    default:
      return state;
  }
}

const store = createStore(appState, stateChanger);
let oldState = store.getState();
store.subscribe(() => {
  const newState = store.getState();
  renderApp(newState, oldState);
  oldState = newState;
});
renderApp(store.getState());
store.dispatch({ type: "UPDATE_TITLE_TEXT", text: "this is dispatch" });
store.dispatch({ type: "UPDATE_TITLE_COLOR", color: "blue" });
