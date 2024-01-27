import { createSlice, current } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      if (!state.find((contact) => contact.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeContact: (state, action) => {
      const newState = current(state);
      const filteredNewState = newState.filter(
        (contact) => contact.id !== action.payload.id,
      );

      state = filteredNewState;
      return state;
    },
    updateContact: (state, action) => {
      state = state.map((contact) => {
        if (contact.id === action.payload.id) {
          return { ...contact, ...action.payload };
        }
        return contact;
      });
      return state;
    },
    setContacts: (state, action) => {
      state = action.payload;
      return state;
    },
    updateContactDisplayName: (state, action) => {
      state = state.map((contact) => {
        if (contact.id === action.payload.id) {
          return { ...contact, displayName: action.payload.displayName };
        }
        return contact;
      });
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addContact,
  removeContact,
  updateContact,
  setContacts,
  updateContactDisplayName,
} = contactsSlice.actions;

export default contactsSlice.reducer;
