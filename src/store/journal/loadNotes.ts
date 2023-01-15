import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/firebase-config';

export async function loadNotes(uid: string) {
  if (!uid) {
    throw new Error('Uid does not exist');
  }

  const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes: any[] = [];

  docs.forEach((doc) => {
    notes.push({ ...doc.data(), id: doc.id });
  });

  return notes;
}
