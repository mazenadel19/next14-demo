import { Suspense } from 'react';
import Link from "next/link";
import { supabase } from '@/supabase';

async function Quizzes() {
  const { data, error } = await supabase.from('questions').select('*');

  if (error) {
    console.error('Error:', error);
    return (
      <p className="text-red-500 text-lg font-semibold mt-4">Something went wrong...</p>
    );
  } else {
    return (
      <ul className='grid grid-cols-3 w-100'>
        {data.map((quiz) => (
          <li key={quiz.id} className='p-4 justify-center flex text-sky-500 hover:text-sky-700 hover:underline'>
            <Link href={`/quiz/${quiz.id}`}>{quiz.question_text}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <h1 className="text-3xl font-bold flex justify-center">All Quizzes</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Quizzes />
      </Suspense>
    </main>
  )
}
