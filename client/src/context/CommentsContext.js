import {createContext} from 'react';

export const CommentsContext = createContext({
    comments: {},
    setComments: () => {}
})