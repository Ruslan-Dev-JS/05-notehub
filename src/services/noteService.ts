import axios from 'axios';
import type { Note } from '../types/note';
import type { FetchNotesResponse } from '../types/api';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesParams {
  page?: number;       
  perPage?: number;     
  search?: string;      
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {};

  if (page !== undefined) params.page = page;
  if (perPage !== undefined) params.perPage = perPage;
  if (search) params.search = search;

  const { data } = await instance.get<FetchNotesResponse>('/notes', {
    params,
  });

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};

interface CreateNoteData {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'; 
}

export const createNote = async (
  payload: CreateNoteData
): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', payload);
  return data;
};
