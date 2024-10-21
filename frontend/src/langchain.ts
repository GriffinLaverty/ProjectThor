import { OpenAI } from "@langchain/openai";

const llm = new OpenAI({
    openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function getAnswer(question: string) {
    let answer = ''

    try {
        answer = await llm.invoke(question);
    } catch (e) {
        console.error(e);
    }

    return answer;
}
