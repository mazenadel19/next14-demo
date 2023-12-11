import { supabase } from "@/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Quiz({ id, show }: { id: string, show?: boolean }) {
    const { data, error } = await supabase
        .from('questions')
        .select(`
    id,
    title,
    description,
    question_text,
    answers (
      id,
      quiz_id,
      answer_text,
      is_correct
    )
  `).eq('id', id);


    if (error) {
        console.error('Error:', error);
        return (
            <p className="text-red-500 text-lg font-semibold mt-4">Something went wrong...</p>
        );
    } else {
        const question = data[0]
        return (
            <div className="bg-white p-6 rounded-lg shadow-md my-8">
                <p className="text-gray-600 mb-4 text-lg">{question.question_text}</p>
                <p className="italic text-gray-600 mb-4 text-md">{question.description}</p>
                <ul className="list-disc pl-6 space-y-2">
                    {question.answers.map((answer) => {
                        const isCorrect = answer.is_correct ? 'text-green-700' : 'text-red-700'
                        const revealAnswers = show ? isCorrect : ""
                        return (
                            <li key={answer.id} className={`mb-1 ${revealAnswers} text-lg`}>
                                {answer.answer_text}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

interface Props {
    params: {
        id: string
    },
    searchParams: {
        show?: boolean
    }
}

function QuizPage({ params, searchParams }: Props) {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <ul className="list-none">
                <li>
                    <Link href="/" className='p-4 text-sky-500 hover:text-sky-700 hover:underline transition duration-200 ease-in-out'>
                        Go back
                    </Link>
                </li>
            </ul>
            <Quiz id={params.id} show={searchParams?.show} />
            <form action={async () => {
                'use server';
                redirect(`/quiz/${params.id}?show=true`);
            }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
                    Reveal Correct Answer
                </button>
            </form>
        </section>

    )
}

export default QuizPage