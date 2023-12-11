import Link from "next/link"

interface Props {
    params: {
        id: string
    }
}

function QuizPage({ params }: Props) {
    return (
        <section>
            <ul>
                <li>
                    <Link href="/">back</Link>
                </li>
            </ul>
            <h1>Quiz {params.id}</h1>
        </section>
    )
}

export default QuizPage