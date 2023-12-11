import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/supabase";

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
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="italic text-gray-600 mb-4">{question.description}</p>
                <ul className="list-disc pl-6">
                    {question.answers.map((answer) => {
                        const isCorrect = answer.is_correct ? 'text-green-700' : 'text-red-700'
                        const revealAnswers = show ? isCorrect : ""
                        return (
                            <li key={answer.id} className={`mb-1 ${revealAnswers}`}>
                                {answer.answer_text}
                            </li>
                        )
                    }
                    )}
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
        <section>
            <ul>
                <li>
                    <Link href="/" className='p-4 text-sky-500 hover:text-sky-700 hover:underline'>
                        🔙 Go back
                    </Link>
                </li>
            </ul>
            <br />
            <Quiz id={params.id} show={searchParams?.show} />
            <br />
            <form action={async () => {
                'use server';
                redirect(`/quiz/${params.id}?show=true`);
            }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Reveal Correct Answer
                </button>
            </form>
        </section>
    )
}

export default QuizPage