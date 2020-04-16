# 리액트에 리덕스 사용하기

리덕스란 애플리케이션 상태를 관리하기 위한 JavaScript 라이브러리입니다. 상태 값을 글로벌로 가지고 있으며 각 컴포넌트에서 손쉽게 상태 관리가 가능하게 해 줍니다.

## 리덕스 사용 이유

리액트에서 `useReducer` Hook과 `ContextAPI`를 통해 글로벌 상태 관리가 가능해졌지만 리덕스를 사용하는 이유가 있습니다.

#### 1. 미들웨어

리덕스는 미들웨어라는 개념이 존재하며 액션 객체와 리듀서 간의 비동기 작업을 할 때 사용됩니다.

#### 2. Context

기능별로 **Context**를 생성하는 ContextAPI와는 달리 리덕스는 모든 글로벌 상태를 하나의 상태 객체에 넣어 사용하므로 매번 Context를 만드는 수고를 덜 수 있습니다.

## 리덕스 사용 규칙

1.  하나의 애플리케이션에는 하나의 스토어가 존재합니다.
2.  상태 값은 불변 객체입니다.
3.  리듀서는 순수 함수입니다.

## 용어

#### 액션(Action)

액션은 상태 값이 변경될 때 사용하며, `type` 속성 값이 필수적으로 사용됩니다.

```javascript
{
    type:'Action Type',
    // ...
}
```

액션의 `type`값은 컴포넌트에서도 재사용되기 때문에 액션 생성 함수(Action Creator)를 만들어 사용합니다.

```javascript
const ACTION_TYPE = 'ACTION_TYPE`;  // 상수로 생성

// 액션 생성함수
export const actionCreator = data => ({
    type: ACTION_TYPE,
    data
});
```

#### 리듀서(Reducer)

리듀서는 변화를 일으키는 함수입니다.

```javascript
function reducer(state, action) {
    switch(action.type) {  // 액션 타입으로 구분하여 처리
        case ACTION_TYPE: 
            return [ ...state, action.data ];   // 불변객체
        default:
            return state;
    }
}
```

#### 스토어(Store)

한 애플리케이션당 하나의 스토어를 생성하며, 스토어 안에는 현재의 앱 상태, 리듀서, 내장 함수들이 있습니다.

## 리덕스 사용하기

간단한 todo-list를 만들어 보면서 리덕스를 어떻게 사용하는지 알아보겠습니다.

먼저 리액트에서 리덕스를 사용하기 위해 `cra`와 `redux`, `react-redux`를 설치해줍니다.

```javascript
$ npx create-react-app todo-list
$ npm i redux
$ npm i react-redux
```

src 밑에 `components`, `containers`, `modules` 폴더를 생성합니다.  
`components`폴더 안에는 프레젠테이션 컴포넌트 파일을, `containers`폴더 안에는 컨테이너 컴포넌트 파일을 생성하고 `modules`에는 리덕스 모듈 파일을 생성하겠습니다.

**components/TodoList.jsx**

```javascript
import React, { useState } from 'react';

const Todo = React.memo(function Todo({ todo }) {
  return (
    <li>{todo}</li>
  )
});

function Todos({ todos }) {
  const mapToTodos = () => {
    return todos.map((todo, i) => <Todo todo={todo} key={i} />);
  }

  return (
    <ul>
      {mapToTodos()}
    </ul>
  )
}

function TodoList({ todos, onCreateTodo }) {
  const [todo, setTodo] = useState('');  // TodoList 내에서만 사용할 상태 값
  const onChange = e => {
    setTodo(e.currentTarget.value);
  }
  const onSubmit = e => {
    e.preventDefault();

    if(!todo) { return; }

    onCreateTodo(todo);
    setTodo('');
  }

  return(
    <>
      <Todos todos={todos} />
      <form onSubmit={onSubmit}>
        <textarea 
          placeholder='할 일을 적어주세요.' 
          value={todo} 
          onChange={onChange} 
        />
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

export default TodoList;
```

**containers/TodoContainer.js**

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoList from '../components/TodoList';
import { createTodo } from '../modules/todos';

function TodoContainer() {
  const { todos } = useSelector(state => ({  // 리덕스 스토어의 상태값을 볼 수 있는 Hook
    todos: state.todos
  }))

  const dispatch = useDispatch();  // 리덕스 스토어의 dispatch 작업을 할 수 있는 Hook
  const onCreateTodo = (todo) => dispatch(createTodo(todo));

  return (
    <TodoList
      todos={todos}
      onCreateTodo={onCreateTodo}
    />
  )
}

export default TodoContainer;
```

**modules/todos.js**

```javascript
// Action
const CREATE_TODO = 'todo/CREATE_TODO';

// Action Creator
export const createTodo = todo => ({
  type: CREATE_TODO,
  todo
})

// Initial State
const initialState = [];

// Reducer
export default function Reducer(state=initialState, action) {
  switch(action.type) {
    case CREATE_TODO:
      return [ ...state, action.todo ];
    default:
      return state;
  }
}
```

**modules/index.js**

```javascript
import { combineReducers } from 'redux';
import todos from './todos';

const rootReducer = combineReducers({  // 리덕스 모듈을 묶어 하나의 리듀서로 만들어주는 함수
    todos
});

export default rootReducer;
```

**App.js**

```javascript
import React from 'react';
import './App.css';

import TodoContainer from './containers/TodoContainer';

function App() {
  return (
    <>
      <TodoContainer />
    </>
  );
}

export default App;
```

**index.js**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer);  // 스토어 생성
// console.log(store.getState());  // 스토어 상태값 볼 수 있음

ReactDOM.render(
  <React.StrictMode>
    {/* App 안의 모든 컴포넌트에서 리덕스 스토어 접근 가능 */}
    <Provider store={store}>  
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```