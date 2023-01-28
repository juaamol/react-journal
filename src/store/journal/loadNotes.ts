import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/firebase-config';
import { Note } from './journal-slice';

export async function loadNotes(uid: string) {
  if (!uid) {
    throw new Error('Uid does not exist');
  }

  const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes: Note[] = [];

  docs.forEach((doc) => {
    const { title, body, date, images } = doc.data();
    const { id } = doc;
    notes.push({ title, body, date, id, images });
  });

  return notes;
}
