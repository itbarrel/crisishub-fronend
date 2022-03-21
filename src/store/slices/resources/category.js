import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "category",
  initialState: {
    list: [],
    update_item: [],
  },
  reducers: {
    all: (state, action) => {
      state.list = action.payload.data;
    },
    setCategotyList: (state, action) => {
      const payload = UpdateCategotyList(
        action.payload,
        JSON.parse(JSON.stringify(state.list))
      );
      state.list = payload;
    },
    add: (state, action) => {
      const { payload } = action;
      state.list.push({
        ...payload,
        CategoryMessages: [],
      });
    },
    update: (state, action) => {
      const { payload } = action;
      const haveID = state.list.findIndex(
        (category) => category.id === action.payload.id
      );

      const categoryMessages = state.list[haveID].CategoryMessages;
      state.list[haveID] = {
        ...payload,
        CategoryMessages: categoryMessages,
      };
    },
    remove: (state, action) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.list.filter((category) =>
        category.id !== state.update_item?.id ? category : null
      );
      state.list = update;
    },
    formType: (state, action) => {
      const { payload } = action;
      state.formType = payload.data;
    },
    current_item: (state, action) => {
      state.update_item = action.payload;
    },
    failed: (state) => {
      state.hasErrors = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, (state) => {
      state.list = [];
      state.update_item = [];
    });
  },
});

export const {
  loading,
  all,
  add,
  update,
  remove,
  current_item,
  formType,
  failed,
  setCategotyList,
} = slice.actions;

export const getCategoryList = (data) => (dispatch) => {
  console.log(">>>", data);
  return dispatch(
    apiCallBegan({
      url: "v1/categories",
      method: "get",
      data,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const getFilteredCategoryList = (filter) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categories?IncidentId=${filter}`,
      method: "get",
      // data: filter,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addCategory = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/categories",
      method: "post",
      data,
      // onStart: loading.type,
      onSuccess: add.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const removeCategory = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categories/${id}`,
      method: "delete",
      // onStart: loading.type,
      onSuccess: remove.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateCategory = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categories/${id}`,
      method: "put",
      data,
      // onStart: loading.type,
      onSuccess: update.type,
      onError: failed.type,
      notify: true,
    })
  );
};
export const setCategoryList = (data) => (dispatch) => {
  return dispatch(setCategotyList(data));
};

export default slice.reducer;

const UpdateCategotyList = (action, list) => {
  const { messageToUpdate, sortOrders } = action;

  // Source
  let socketCategories = [...list];

  const sourceCategoryIndex = socketCategories.findIndex(
    (element) => element.id === messageToUpdate.prevCategoryId
  );
  const sourceCategory = socketCategories[sourceCategoryIndex];
  const { CategoryMessages: sourceMessages } = sourceCategory;
  const sourceMessagesIndex = sourceMessages.findIndex(
    (element) => element.id === messageToUpdate.id
  );
  let draggedMessage = sourceMessages[sourceMessagesIndex];
  let temp = Object.assign({}, draggedMessage);
  temp.parentId = messageToUpdate.categoryId;
  draggedMessage = temp;
  const updatedSourceMessages = [
    ...sourceMessages.slice(0, sourceMessagesIndex),
    ...sourceMessages.slice(sourceMessagesIndex + 1),
  ];

  const updatedSourceCategory = {
    ...sourceCategory,
    CategoryMessages: updatedSourceMessages,
  };
  socketCategories[sourceCategoryIndex] = updatedSourceCategory;

  // // // Destination
  const destinationCategoryIndex = socketCategories.findIndex(
    (element) => element.id === messageToUpdate.categoryId
  );
  const destinationCategory = socketCategories[destinationCategoryIndex];
  const { CategoryMessages: destinationMessages } = destinationCategory;

  let updatedDestinationMessages = [
    ...destinationMessages.slice(0, messageToUpdate.sortOrder),
    draggedMessage,
    ...destinationMessages.slice(messageToUpdate.sortOrder),
  ];

  const newSortedMessages = updatedDestinationMessages.map((message) => {
    var temp = Object.assign({}, message);
    temp.sortOrder = sortOrders[temp.id];
    return temp;
  });
  newSortedMessages.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1));

  const updatedDestinationCategory = {
    ...destinationCategory,
    CategoryMessages: newSortedMessages,
  };

  socketCategories[destinationCategoryIndex] = updatedDestinationCategory;
  return socketCategories;
};
