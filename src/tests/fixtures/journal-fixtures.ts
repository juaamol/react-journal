import { JournalState } from '../../store/journal';

export const testEmptyNote = {
  id: '1234',
  title: '',
  body: '',
  date: 1234,
};

export const testNote = {
  id: '12345',
  title: 'title',
  body: 'body',
  date: 12345,
};

export const testNoteWithImages = {
  id: '12345',
  title: 'title',
  body: 'body',
  date: 12345,
  images: [
    {
      id: 'imgId',
      url: 'http://img.jpg',
    },
  ],
};

export const initialState: JournalState = {
  isSaving: false,
  savedMessage: '',
  notes: [],
  active: null,
};

export const savingState: JournalState = {
  isSaving: true,
  savedMessage: '',
  notes: [],
  active: null,
};

export const noteActiveState: JournalState = {
  isSaving: false,
  savedMessage: '',
  notes: [testNote],
  active: testNote,
};

export const noteActiveDifferentListState: JournalState = {
  isSaving: false,
  savedMessage: '',
  notes: [{ ...testNote, title: testNote.title + '1234' }],
  active: testNote,
};

export const testCollectionRef = { type: 'collection' };
export const testDocumentRef = { id: '1234', type: 'document' };
