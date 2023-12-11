import { supabase } from "@/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const QuizForm = () => {

    async function createQuiz(formData: FormData) {
        'use server'
        const title = formData.get('title')
        const description = formData.get('description')
        const question = formData.get('question')
        const answer1 = formData.get('answer-1')
        const answer2 = formData.get('answer-2')
        const check1 = formData.get('check-1') === 'on'
        const check2 = formData.get('check-2') === 'on'

        await supabase
            .from('questions')
            .insert([
                { title: title, description: description, question_text: question }
            ])
        const { data: quizData, error: quizError } = await supabase.from('questions')
            .select("id")
            .eq('title', title)


        if (quizError) {
            console.error(quizError)
            return
        }

        if (Array.isArray(quizData) && quizData.length > 0) {
            const quizId = quizData[0].id

            const { status: answerStatus, error: answerError } = await supabase
                .from('answers')
                .insert([
                    { quiz_id: quizId, answer_text: answer1, is_correct: check1 },
                    { quiz_id: quizId, answer_text: answer2, is_correct: check2 }
                ])

            if (answerError) {
                console.error(answerError)
                return
            } else {
                console.log('success .. status: ', answerStatus)
                revalidatePath('/');
                redirect('/');
            }
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Create Quiz</h1>
            <form action={createQuiz} className="w-full max-w-md">
                <div className="p-8 space-y-3 bg-white rounded-md shadow-md">
                    <input className="w-full px-3 py-2 border rounded-md" type="text" name="title" placeholder="Title" />
                    <input className="w-full px-3 py-2 border rounded-md" type="text" name="question" placeholder="Question" />
                    <input className="w-full px-3 py-2 border rounded-md" type="text" name="description" placeholder="Description" />
                    <div className="flex items-center space-x-2">
                        <input className="w-full px-3 py-2 border rounded-md" type="text" name="answer-1" placeholder="Answer 1" />
                        <input type="checkbox" name="check-1" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input className="w-full px-3 py-2 border rounded-md" type="text" name="answer-2" placeholder="Answer 2" />
                        <input type="checkbox" name="check-2" />
                    </div>
                </div>
                <button type="submit" className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">Submit Form</button>
            </form>
        </div>
    );
};

export default QuizForm;
