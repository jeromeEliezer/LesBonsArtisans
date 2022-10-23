import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Article } from "../../interfaces/article";

interface ArticleState {
    articles: Article[] | null;
    loading: boolean; 
    singleArticle: Article | null;
    errors: any;
}

const initialState: ArticleState = {
    articles: [],
    singleArticle: null,
    loading: false,
    errors: null
}

const backendUrl = "http://localhost:4000";

// actions are processes that get data from backend
export const getArticles = createAsyncThunk<Article[]>(
    "articles/getArticles",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(backendUrl + "/articles");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createArticle = createAsyncThunk<Object, Article>(
    "articles/createArticle",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${backendUrl}/articles`, data);
            thunkAPI.dispatch(getArticles());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteArticle = createAsyncThunk<Object, Article>(
    "articles/deleteArticle",
    async (data, thunkAPI) => {
        try {
            const response = await axios.delete(`${backendUrl}/articles/${data._id}`);
            thunkAPI.dispatch(getArticles());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
 
export const editArticle = createAsyncThunk<Object, Article>(
    "articles/editArticle",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${backendUrl}/article/${data._id}`, {data});
            thunkAPI.dispatch(getArticles());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

// reducers -> reduce to a specific state -> changes state
export const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setArticles: (state, action: PayloadAction<Article[]>) => {
            state.articles = action.payload
        },
        setSingleArticle: (state, action: PayloadAction<Article>) => {
            state.singleArticle = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getArticles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getArticles.fulfilled, (state, action) => {
            state.articles = action.payload;
            state.loading = false;
        });
        builder.addCase(getArticles.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
    }
})

export default articleSlice.reducer;
export const { setArticles, setSingleArticle } = articleSlice.actions;