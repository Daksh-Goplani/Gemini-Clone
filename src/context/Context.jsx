import { createContext, useEffect, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompts, setPreviousPrompts] = useState(() => {
        // Load from LocalStorage on app start
        const saved = localStorage.getItem("previousPrompts");
        return saved ? JSON.parse(saved) : [];
    });

    const [showResults, setshowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    // SAVE in LocalStorage whenever previousPrompts changes
    useEffect(() => {
        localStorage.setItem("previousPrompts", JSON.stringify(previousPrompts));
    }, [previousPrompts]);

    const delayPara = (index, nextChunk) => {
        setTimeout(() => {
            setResultData(prev => prev + nextChunk);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setshowResults(false);
        setResultData("");
        setRecentPrompt("");
    };

    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setshowResults(true);

        let finalPrompt = prompt ?? input;

        if (!prompt) {
            setPreviousPrompts(prev => [...prev, input]);
        }

        setRecentPrompt(finalPrompt);

        const response = await runChat(finalPrompt);

        let formatted = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        formatted = formatted.replace(/\n/g, "<br>");

        const chunks = formatted.match(/<[^>]+>|[^<]+/g);

        chunks.forEach((chunk, i) => delayPara(i, chunk));

        setLoading(false);
        setInput('');
    };

    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResults,
        resultData,
        loading,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
