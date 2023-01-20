import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout } from '../auth';

export interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
  imageURLs?: string[];
}

export interface JournalState {
  isSaving: boolean;
  savedMessage: string;
  notes: Note[];
  active: Note | null;
}

const initialState: JournalState = {
  isSaving: false,
  savedMessage: '',
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload;
      state.savedMessage = '';
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.savedMessage = '';
    },
    setIsNotSaving: (state) => {
      state.isSaving = false;
    },
    setActiveNoteImages: (state, action: PayloadAction<string[]>) => {
      if (state.active) {
        const images = state.active.imageURLs;
        const newImages = action.payload;
        const updatedImages = [...(images || []), ...newImages];
        state.active.imageURLs = updatedImages;
      }
    },
    updateNote: (
      state,
      action: PayloadAction<Partial<Pick<Note, 'title' | 'body'>>>,
    ) => {
      if (state.active) {
        state.active = { ...state.active, ...action.payload };
      }
    },
    clearNotes: (state) => {
      state.isSaving = initialState.isSaving;
      state.savedMessage = initialState.savedMessage;
      state.notes = initialState.notes;
      state.active = initialState.active;
    },
    updateListWithActive: (state) => {
      if (state.active) {
        state.savedMessage = `${state.active.title} has been saved successfully`;
        state.notes = state.notes.map((note) => {
          if (note.id === state.active?.id) {
            return { ...state.active };
          }

          return { ...note };
        });
      }
    },
    deleteActiveNote: (state) => {
      if (state.active) {
        const activeId = state.active.id;
        state.active = initialState.active;
        state.notes = state.notes.filter((note) => note.id !== activeId);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setActiveNoteImages,
  setSaving,
  setIsNotSaving,
  updateListWithActive,
  clearNotes,
  updateNote,
  deleteActiveNote,
} = journalSlice.actions;
