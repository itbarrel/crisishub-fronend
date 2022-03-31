import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "incomingMessage",
  initialState: {
    list: [],
    update_item: [],
  },
  reducers: {
    all: (state, action) => {
      state.list = action.payload.data;
    },
    setIncomingMessageIndex: (state, action) => {
      const payload = UpdateIncomingMessageList(
        action.payload,
        JSON.parse(JSON.stringify(state.list))
      );
      state.list = payload;
    },
    add: (state, action) => {
      state.list.push(action.payload);
    },
    update: (state, action) => {
      const haveID = state.list.findIndex(
        (incomingMessage) => incomingMessage.id === action.payload.id
      );

      state.list[haveID] = action.payload;
    },
    remove: (state, action) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.list.filter((incomingMessage) =>
        incomingMessage.id !== state.update_item?.id ? incomingMessage : null
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
  setIncomingMessageIndex,
  formType,
  failed,
} = slice.actions;

export const getIncomingMessageList = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/incomingMessages",
      method: "get",
      data,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const getFilteredIncomingMessageList = (filter) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/incomingMessages?IncidentId=${filter}`,
      method: "get",
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addIncomingMessage = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/incomingMessages",
      method: "post",
      data,
      // onStart: loading.type,
      onSuccess: add.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const removeIncomingMessage = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/incomingMessages/${id}`,
      method: "delete",
      // onStart: loading.type,
      onSuccess: remove.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateIncomingMessage = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/incomingMessages/${id}`,
      method: "put",
      data,
      // onStart: loading.type,
      onSuccess: update.type,
      onError: failed.type,
      notify: true,
    })
  );
};
export const updateIncomingMessageIndex = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/incomingMessages/${id}/sortOrder`,
      method: "put",
      data,
      notify: true,
    })
  );
};
export const setIncomingMessageList = (data) => (dispatch) => {
  return dispatch(setIncomingMessageIndex(data));
};
export default slice.reducer;

const UpdateIncomingMessageList = (action, list) => {
  const { messageToUpdate, sortOrders } = action;

  let IncomingMessages = [...list];
  // Drag from IncomingMessage and drop in IncomingMessage
  if (
    messageToUpdate.categoryId === "IncomingMessage" &&
    messageToUpdate.prevCategoryId === "IncomingMessage"
  ) {
    const newSortedMessages = IncomingMessages.map((message) => {
      var temp = Object.assign({}, message);
      temp.sortOrder = sortOrders[temp.id];
      return temp;
    });
    newSortedMessages.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1));

    return newSortedMessages;
  } else if (messageToUpdate.prevCategoryId === "IncomingMessage") {
    const messagesIndex = IncomingMessages.findIndex(
      (element) => element.id === messageToUpdate.id
    );

    const updatedMessages = [
      ...IncomingMessages.slice(0, messagesIndex),
      ...IncomingMessages.slice(messagesIndex + 1),
    ];

    return updatedMessages;
  }
  // Drag from Category and drop in IncomingMessage
  else if (
    messageToUpdate.categoryId === "IncomingMessage" &&
    messageToUpdate.categoryId !== "ActionListMessage" &&
    messageToUpdate.prevCategoryId !== "ActionListMessage" &&
    messageToUpdate.prevCategoryId !== "IncomingMessage"
  ) {
    let updatedDestinationMessages = [
      ...IncomingMessages.slice(0, messageToUpdate.sortOrder),
      messageToUpdate.message,
      ...IncomingMessages.slice(messageToUpdate.sortOrder),
    ];

    const newSortedMessages = updatedDestinationMessages.map((message) => {
      var temp = Object.assign({}, message);
      temp.sortOrder = sortOrders[temp.id];
      return temp;
    });
    newSortedMessages.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1));
    return newSortedMessages;
  }
};
