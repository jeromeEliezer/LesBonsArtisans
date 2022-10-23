import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleForm } from './features/articles/articleForm';
import { getArticles } from './features/articles/articleSlice';

import { ArticlesList } from './features/articles/articlesList';
import { useAppDispatch } from './store/store';

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getArticles());
  }, [dispatch]);
  useEffect(() => {
    initApp();
  }, [initApp])

  return (
    <BrowserRouter>,
      <Routes>
        <Route path="/" element={<ArticlesList />}/>
        <Route path="/article" element={<ArticleForm />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
