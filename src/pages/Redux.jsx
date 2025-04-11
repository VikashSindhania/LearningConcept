import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { call, put, takeLatest, all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

// Initial states
const userInitialState = {
  user: null,
  loading: false,
  error: null,
};

const postsInitialState = {
  posts: {
    byId: {},
    allIds: [],
  },
};

// Reducers
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "FETCH_USER_START":
      return { ...state, loading: true, error: null };
    case "FETCH_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload, error: null };
    case "FETCH_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const normalizedReducer = (state = postsInitialState, action) => {
  switch (action.type) {
    case "RECEIVE_POSTS":
      return {
        ...state,
        posts: {
          byId: action.payload.reduce((acc, post) => {
            acc[post.id] = post;
            return acc;
          }, {}),
          allIds: action.payload.map((post) => post.id),
        },
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: {
          ...state.posts,
          byId: {
            ...state.posts.byId,
            [action.payload.id]: {
              ...state.posts.byId[action.payload.id],
              ...action.payload,
            },
          },
        },
      };
    default:
      return state;
  }
};

// RTK Query API
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      transformResponse: (response) => response.data,
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id) => `users/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),
  }),
});

// Sagas
function* fetchUser(action) {
  try {
    yield put({ type: "FETCH_USER_START" });
    const user = yield call(api.endpoints.getUser.initiate, action.payload);
    yield put({ type: "FETCH_USER_SUCCESS", payload: user });
  } catch (error) {
    yield put({ type: "FETCH_USER_FAILURE", payload: error.message });
  }
}

function* watchFetchUser() {
  yield takeLatest("FETCH_USER_REQUEST", fetchUser);
}

function* rootSaga() {
  yield all([
    watchFetchUser(),
    // Add other sagas here
  ]);
}

// Store Configuration
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    posts: normalizedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(sagaMiddleware)
      .concat(logger),
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

// Components
const Redux = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Understanding Redux</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Redux is a predictable state container for JavaScript apps. It
              helps you write applications that behave consistently, run in
              different environments, and are easy to test.
            </p>
          </div>

          {/* Core Concepts */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Core Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Store</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Single source of truth</li>
                  <li>State is read-only</li>
                  <li>Changes through pure functions</li>
                  <li>Predictable state updates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Actions</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Plain JavaScript objects</li>
                  <li>Must have a type property</li>
                  <li>Describe what happened</li>
                  <li>Payload for data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reducers</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Pure functions</li>
                  <li>Take previous state</li>
                  <li>Return new state</li>
                  <li>No side effects</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Flow */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Data Flow</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-semibold">Action</h4>
                    <p className="text-sm text-gray-600">Dispatch an action</p>
                  </div>
                </div>
                <div className="text-2xl">→</div>
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h4 className="font-semibold">Reducer</h4>
                    <p className="text-sm text-gray-600">Process the action</p>
                  </div>
                </div>
                <div className="text-2xl">→</div>
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h4 className="font-semibold">Store</h4>
                    <p className="text-sm text-gray-600">Update state</p>
                  </div>
                </div>
                <div className="text-2xl">→</div>
                <div className="text-center">
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <h4 className="font-semibold">View</h4>
                    <p className="text-sm text-gray-600">Re-render</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middleware */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Middleware</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Common Middleware
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Redux Thunk - Async actions</li>
                  <li>Redux Saga - Complex side effects</li>
                  <li>Redux Logger - Action logging</li>
                  <li>Redux DevTools - Debugging</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Middleware Flow</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Intercept actions</li>
                  <li>Perform side effects</li>
                  <li>Transform actions</li>
                  <li>Dispatch new actions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">State Management</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Normalize state shape</li>
                  <li>Keep state minimal</li>
                  <li>Use selectors</li>
                  <li>Memoize computations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Code Organization
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Feature-based structure</li>
                  <li>Ducks pattern</li>
                  <li>Action creators</li>
                  <li>Type constants</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Performance Considerations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Optimizations</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Reselect for memoization</li>
                  <li>Immutable updates</li>
                  <li>Action batching</li>
                  <li>Normalized state</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Common Pitfalls</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Unnecessary re-renders</li>
                  <li>Deep state nesting</li>
                  <li>Large action payloads</li>
                  <li>Complex reducers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Redux Toolkit */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Redux Toolkit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Features</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>createSlice for reducers</li>
                  <li>createAsyncThunk</li>
                  <li>Immer for immutable updates</li>
                  <li>RTK Query for API calls</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Benefits</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Reduced boilerplate</li>
                  <li>Built-in best practices</li>
                  <li>TypeScript support</li>
                  <li>DevTools integration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* When to Use Redux */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">When to Use Redux</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Use Cases</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Large applications</li>
                  <li>Complex state logic</li>
                  <li>Shared state</li>
                  <li>Time-travel debugging</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Alternatives</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Context API</li>
                  <li>useReducer</li>
                  <li>MobX</li>
                  <li>Zustand</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Advanced Examples */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Advanced Examples</h2>
            <div className="space-y-8">
              <RTKQueryExample />
              <SagaExample />
              <NormalizedStateExample />
              <DynamicReducerExample />
              <MiddlewareExample />
              <MemoizedSelectorsExample />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

// Advanced Example 1: Redux with RTK Query
const RTKQueryExample = () => {
  const { data: users, isLoading, error } = api.useGetUsersQuery();
  const [createUser] = api.useCreateUserMutation();
  const [updateUser] = api.useUpdateUserMutation();

  const handleCreateUser = async () => {
    try {
      await createUser({
        name: "New User",
        email: "new@example.com",
      }).unwrap();
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">RTK Query Example</h3>
      <div className="space-y-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : (
          <div className="space-y-2">
            {users?.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <span>{user.name}</span>
                <button
                  onClick={() =>
                    updateUser({
                      id: user.id,
                      name: "Updated Name",
                    })
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleCreateUser}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Automatic caching</li>
          <li>Request deduplication</li>
          <li>Cache invalidation</li>
          <li>TypeScript support</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 2: Redux with Redux-Saga
const SagaExample = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER_REQUEST", payload: 1 });
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Redux-Saga Example</h3>
      <div className="space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : user ? (
          <div className="space-y-2">
            <div className="p-4 bg-gray-100 rounded">
              <h4 className="font-semibold">User Details</h4>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
        ) : (
          <div>No user data available</div>
        )}
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex side effects</li>
          <li>Async flow control</li>
          <li>Error handling</li>
          <li>Testing capabilities</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 3: Redux with Normalized State
const NormalizedStateExample = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const postIds = posts?.allIds || [];
  const postsById = posts?.byId || {};

  // Initialize with some sample data
  useEffect(() => {
    dispatch({
      type: "RECEIVE_POSTS",
      payload: [
        { id: 1, title: "First Post", content: "Content 1" },
        { id: 2, title: "Second Post", content: "Content 2" },
        { id: 3, title: "Third Post", content: "Content 3" },
      ],
    });
  }, [dispatch]);

  const handleUpdatePost = (id) => {
    dispatch({
      type: "UPDATE_POST",
      payload: {
        id,
        title: "Updated Title",
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Normalized State Example</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Posts List</h4>
            <div className="space-y-2">
              {postIds.length > 0 ? (
                postIds.map((id) => (
                  <div
                    key={id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span>{postsById[id]?.title || "Untitled"}</span>
                    <button
                      onClick={() => handleUpdatePost(id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No posts available</div>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">State Structure</h4>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(posts, null, 2)}
            </pre>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Efficient updates</li>
          <li>Normalized data</li>
          <li>Performance optimization</li>
          <li>Consistent state shape</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 4: Redux with Dynamic Reducers
const dynamicReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_DYNAMIC_REDUCER":
      return {
        ...state,
        [action.payload.key]: action.payload.reducer(undefined, {}),
      };
    case "REMOVE_DYNAMIC_REDUCER":
      const { [action.payload]: removed, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

const DynamicReducerExample = () => {
  const dispatch = useDispatch();
  const dynamicState = useSelector((state) => state.dynamic || {});

  const addCounter = () => {
    const key = `counter-${Date.now()}`;
    const counterReducer = (state = 0, action) => {
      switch (action.type) {
        case "INCREMENT":
          return state + 1;
        case "DECREMENT":
          return state - 1;
        default:
          return state;
      }
    };
    dispatch({
      type: "ADD_DYNAMIC_REDUCER",
      payload: { key, reducer: counterReducer },
    });
  };

  const removeCounter = (key) => {
    dispatch({ type: "REMOVE_DYNAMIC_REDUCER", payload: key });
  };

  const handleIncrement = (key) => {
    dispatch({ type: "INCREMENT", meta: { key } });
  };

  const handleDecrement = (key) => {
    dispatch({ type: "DECREMENT", meta: { key } });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Dynamic Reducers Example</h3>
      <div className="space-y-4">
        <button
          onClick={addCounter}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Counter
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(dynamicState).length > 0 ? (
            Object.entries(dynamicState).map(([key, value]) => (
              <div key={key} className="p-4 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Counter {key}</span>
                  <button
                    onClick={() => removeCounter(key)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecrement(key)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="text-xl">{value}</span>
                  <button
                    onClick={() => handleIncrement(key)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No counters added yet</div>
          )}
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Dynamic reducer injection</li>
          <li>Code splitting</li>
          <li>Lazy loading</li>
          <li>Modular state management</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 5: Redux with Middleware Chain
const customMiddleware = (store) => (next) => (action) => {
  console.log("Middleware 1:", action);
  const result = next(action);
  console.log("Middleware 1 result:", result);
  return result;
};

const asyncMiddleware = (store) => (next) => (action) => {
  if (action.type === "ASYNC_ACTION") {
    setTimeout(() => {
      store.dispatch({
        type: "ASYNC_ACTION_COMPLETE",
        payload: action.payload,
      });
    }, 1000);
    return next({ type: "ASYNC_ACTION_START" });
  }
  return next(action);
};

const MiddlewareExample = () => {
  const dispatch = useDispatch();
  const asyncState = useSelector((state) => state.async);

  const handleAsyncAction = () => {
    dispatch({ type: "ASYNC_ACTION", payload: "Data" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Middleware Chain Example</h3>
      <div className="space-y-4">
        <button
          onClick={handleAsyncAction}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Trigger Async Action
        </button>
        <div className="p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Current State:</h4>
          <pre className="bg-white p-2 rounded">
            {JSON.stringify(asyncState, null, 2)}
          </pre>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Middleware composition</li>
          <li>Action transformation</li>
          <li>Async flow control</li>
          <li>Debugging capabilities</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 6: Redux with Selector Memoization
const createMemoizedSelectors = () => {
  const selectUserById = (state, userId) => {
    const users = state.users || { byId: {} };
    return users.byId[userId];
  };

  const selectUserPosts = (state, userId) => {
    const users = state.users || { byId: {} };
    const posts = state.posts || { byId: {}, allIds: [] };
    const user = selectUserById(state, userId);

    if (!user) return [];

    return posts.allIds
      .map((id) => posts.byId[id])
      .filter((post) => post && post.userId === userId);
  };

  return {
    selectUserById,
    selectUserPosts,
  };
};

const MemoizedSelectorsExample = () => {
  const dispatch = useDispatch();
  const { selectUserById, selectUserPosts } = createMemoizedSelectors();
  const userId = 1;
  const user = useSelector((state) => selectUserById(state, userId));
  const userPosts = useSelector((state) => selectUserPosts(state, userId));

  // Initialize sample data
  useEffect(() => {
    dispatch({
      type: "RECEIVE_POSTS",
      payload: [
        { id: 1, title: "First Post", content: "Content 1", userId: 1 },
        { id: 2, title: "Second Post", content: "Content 2", userId: 1 },
        { id: 3, title: "Third Post", content: "Content 3", userId: 2 },
      ],
    });
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Selector Memoization Example
      </h3>
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">User Details:</h4>
          <pre className="bg-white p-2 rounded">
            {JSON.stringify(user || "No user found", null, 2)}
          </pre>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">User Posts:</h4>
          <pre className="bg-white p-2 rounded">
            {JSON.stringify(userPosts || [], null, 2)}
          </pre>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Selector composition</li>
          <li>Performance optimization</li>
          <li>Derived state</li>
          <li>Reusable selectors</li>
        </ul>
      </div>
    </div>
  );
};

export default Redux;
