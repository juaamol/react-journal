import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { startLoadingNotes, startNewNote } from '../../../store/journal/thunks';
import {
  addNewEmptyNote,
  deleteActiveNote,
  setActiveNote,
  setActiveNoteImages,
  setIsNotSaving,
  setNotes,
  setSaving,
  updateListWithActive,
} from '../../../store/journal';
import { loadNotes } from '../../../store/journal/loadNotes';
import { rootAuthenticatedState } from '../../fixtures/store-fixtures';
import {
  testCollectionRef,
  testDocumentRef,
  testEmptyNote,
} from '../../fixtures/journal-fixtures';

jest.mock('../../../store/journal/loadNotes', () => ({
  loadNotes: jest.fn(),
}));

jest.mock('firebase/firestore/lite', () => ({
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe('Test journal thunks', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  test('Should add a new note with id', async () => {
    const state = rootAuthenticatedState;
    const resourceUrl = `${state.auth.uid}/journal/notes`;
    const getState = jest.fn(() => state);
    (collection as jest.Mock).mockReturnValue(testCollectionRef);
    (doc as jest.Mock).mockReturnValue(testDocumentRef);
    const dispatch = jest.fn();
    await startNewNote()(dispatch, getState);

    const emptyNote = { title: '', body: '', date: new Date().getTime() };
    const addedNote = {
      ...emptyNote,
      id: testDocumentRef.id,
    };

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(addedNote));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(addedNote));
    expect(dispatch).toHaveBeenCalledWith(setIsNotSaving());
    expect(doc as jest.Mock).toHaveBeenCalledWith(testCollectionRef);
    expect((collection as jest.Mock).mock.calls[0][1]).toBe(resourceUrl);
    expect((setDoc as jest.Mock).mock.calls[0][0]).toEqual(testDocumentRef);
    expect((setDoc as jest.Mock).mock.calls[0][1]).toEqual(emptyNote);
  });

  test('Should load notes', async () => {
    const state = rootAuthenticatedState;
    const getState = jest.fn(() => state);
    (loadNotes as jest.Mock).mockReturnValue([testEmptyNote]);
    const dispatch = jest.fn();
    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(setNotes([testEmptyNote]));
    expect(loadNotes as jest.Mock).toHaveBeenCalledWith(state.auth.uid);
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
