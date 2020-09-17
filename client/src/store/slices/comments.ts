import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommentData {
  id: number;
  comment: string;
  parentId: number;
  storyId: number;
  datetime: string;
  authorId: number;
}

export interface ServerCommentData {
  data: CommentData[];
  errors: string;
  loading: boolean;
  normalizedComments: CommentData[][];
}

export interface CustomPayload {
  roots: CommentData[] | undefined;
  comments: CommentData[];
}

const initialState: ServerCommentData = {
  data: [],
  errors: "",
  loading: false,
  normalizedComments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setLoading: (
      state: ServerCommentData,
      { payload }: PayloadAction<boolean>
    ) => {
      state.loading = payload;
    },
    setErrors: (
      state: ServerCommentData,
      { payload }: PayloadAction<string>
    ) => {
      state.errors = payload;
    },
    setData: (state: ServerCommentData, { payload }: PayloadAction<any>) => {
      state.data = payload;
    },
    normalizeComments: (
      state: ServerCommentData,
      { payload }: PayloadAction<CustomPayload>
    ) => {
      function helper(
        roots: CommentData[] | undefined,
        comments: CommentData[]
      ) {
        state.normalizedComments.push(roots!);
        roots?.forEach((root) => {
          const toContinue: CommentData[] = [];
          comments.forEach((comment) => {
            if (root?.id === comment.parentId) {
              toContinue.push(comment);
            }
          });
          if (toContinue.length) {
            state.normalizedComments.push(toContinue);
            helper(toContinue, comments);
          }
        });
      }
      helper(payload.roots, payload.comments);
    },
  },
});

export default commentsSlice.reducer;

export const {
  setLoading,
  setErrors,
  setData,
  normalizeComments,
} = commentsSlice.actions;

export const dataSelector = (state: { dataStore: ServerCommentData }) =>
  state.dataStore;
