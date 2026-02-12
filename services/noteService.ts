import axios from 'axios';
import type { Note, FetchNotesResponse } from '../types/note';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search) {
    params.search = search;
  }

  const response = await instance.get('/notes', { params });

  return response.data;
};


export const deleteNote = async (id: string) => {
  const response = await instance.delete(`/notes/${id}`);
  return response.data;
};

interface CreateNoteData {
  title: string;
  content: string;
}

export const createNote = async (data: CreateNoteData) => {
  const response = await instance.post('/notes', data);
  return response.data;
};
