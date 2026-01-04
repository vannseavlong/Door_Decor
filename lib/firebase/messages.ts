import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./client";

export type MessageRecord = {
  id: string;
  customerName: string;
  phoneNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  isCalled: boolean;
  createdAt: Timestamp;
};

const COLLECTION_NAME = "messages";

// Get all messages
export async function getMessages(): Promise<MessageRecord[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MessageRecord[];
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

// Add a new message
export async function addMessage(
  message: Omit<MessageRecord, "id" | "createdAt" | "isCalled">
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...message,
      isCalled: false,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
}

// Update message (mark as called)
export async function updateMessage(
  id: string,
  updates: Partial<Omit<MessageRecord, "id" | "createdAt">>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating message:", error);
    throw error;
  }
}

// Delete a message
export async function deleteMessage(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}
