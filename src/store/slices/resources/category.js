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
    addcategoryMessage: (state, action) => {
      const { payload } = action;
      let categories = state.list;
      const CategoryIndex = categories.findIndex(
        (element) => element.id === payload.parentId
      );
      const Category = categories[CategoryIndex];
      const { CategoryMessages: Messages } = Category;
      Messages.push(payload);

      const updatedCategory = {
        ...Category,
        CategoryMessages: Messages,
      };
      categories[CategoryIndex] = updatedCategory;

      state.list = categories;
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
    updatecategoryMessage: (state, action) => {
      const { payload } = action;

      let categories = state.list;
      const CategoryIndex = categories.findIndex(
        (element) => element.id === payload.parentId
      );
      const Category = categories[CategoryIndex];
      const { CategoryMessages: Messages } = Category;

      const MessagesIndex = Messages.findIndex(
        (element) => element.id === payload.id
      );

      const updatedMessages = [
        ...Messages.slice(0, MessagesIndex),
        payload,
        ...Messages.slice(MessagesIndex + 1),
      ];

      const updatedCategory = {
        ...Category,
        CategoryMessages: updatedMessages,
      };
      categories[CategoryIndex] = updatedCategory;
      state.list = categories;
    },
    remove: (state, action) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.list.filter((category) =>
        category.id !== state.update_item?.id ? category : null
      );
      state.list = update;
    },
    removecategoryMessage: (state, action) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.update_item;

      let categories = state.list;
      const CategoryIndex = categories.findIndex(
        (element) => element.id === update.parentId
      );
      const Category = categories[CategoryIndex];
      const { CategoryMessages: Messages } = Category;

      const MessagesIndex = Messages.findIndex(
        (element) => element.id === update.id
      );

      const updatedMessages = [
        ...Messages.slice(0, MessagesIndex),
        ...Messages.slice(MessagesIndex + 1),
      ];

      const updatedCategory = {
        ...Category,
        CategoryMessages: updatedMessages,
      };
      categories[CategoryIndex] = updatedCategory;
      state.list = categories;
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
  addcategoryMessage,
  removecategoryMessage,
  updatecategoryMessage,
  formType,
  failed,
  setCategotyList,
} = slice.actions;

export const getCategoryList = (data) => (dispatch) => {
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
export const addCategoryMessage = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/categoryMessages",
      method: "post",
      data,
      onSuccess: addcategoryMessage.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const removeCategoryMessage = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categoryMessages/${id}`,
      method: "delete",
      onSuccess: removecategoryMessage.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateCategoryMessage = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categoryMessages/${id}`,
      method: "put",
      data,
      onSuccess: updatecategoryMessage.type,
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
  // Drag from Category and drop in Category

  if (
    messageToUpdate.prevCategoryId !== "IncomingMessage" &&
    messageToUpdate.prevCategoryId !== "ActionListMessage" &&
    messageToUpdate.categoryId !== "IncomingMessage" &&
    messageToUpdate.categoryId !== "ActionListMessage"
  ) {
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
  }
  // Drag from IncomingMessage and drop in Category
  else if (
    messageToUpdate.prevCategoryId === "IncomingMessage" &&
    messageToUpdate.prevCategoryId !== "ActionListMessage" &&
    messageToUpdate.categoryId !== "IncomingMessage" &&
    messageToUpdate.categoryId !== "ActionListMessage"
  ) {
    const destinationCategoryIndex = socketCategories.findIndex(
      (element) => element.id === messageToUpdate.categoryId
    );
    const destinationCategory = socketCategories[destinationCategoryIndex];
    const { CategoryMessages: destinationMessages } = destinationCategory;

    let draggedMessage = messageToUpdate.message;
    let temp = Object.assign({}, draggedMessage);
    temp.parentId = messageToUpdate.categoryId;
    draggedMessage = temp;

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
  }
  // Drag from Category and drop in IncomingMessage
  else if (
    messageToUpdate.categoryId === "IncomingMessage" &&
    messageToUpdate.categoryId !== "ActionListMessage" &&
    messageToUpdate.prevCategoryId !== "ActionListMessage" &&
    messageToUpdate.prevCategoryId !== "IncomingMessage"
  ) {
    const sourceCategoryIndex = socketCategories.findIndex(
      (element) => element.id === messageToUpdate.prevCategoryId
    );
    const sourceCategory = socketCategories[sourceCategoryIndex];
    const { CategoryMessages: sourceMessages } = sourceCategory;
    const sourceMessagesIndex = sourceMessages.findIndex(
      (element) => element.id === messageToUpdate.id
    );

    const updatedSourceMessages = [
      ...sourceMessages.slice(0, sourceMessagesIndex),
      ...sourceMessages.slice(sourceMessagesIndex + 1),
    ];

    const updatedSourceCategory = {
      ...sourceCategory,
      CategoryMessages: updatedSourceMessages,
    };
    socketCategories[sourceCategoryIndex] = updatedSourceCategory;

    return socketCategories;
  }
};
