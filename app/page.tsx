import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>All Quizzes</h1>
      <ul>
        <li>
          <Link href="/quiz/1">Quiz 1</Link>
        </li>
        <li>
          <Link href="/quiz/2">Quiz 2</Link>
        </li>
        <li>
          <Link href="/quiz/3">Quiz 3</Link>
        </li>
        <li>
          <Link href="/quiz/4">Quiz 4</Link>
        </li>
      </ul>
    </main>
  )
}
