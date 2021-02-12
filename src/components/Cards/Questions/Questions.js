import { Button, Card } from "./styles";


export default function Questions({ questions, gameMode }) {
  return (
    <>
      {
        questions.map((question) =>
          <Card status={question.status} nerdfactor={question.nerdfactor} key={question.id} gameMode={gameMode} >
            <span>{question.nerdfactor === "3" ? "🤯" : question.nerdfactor === "2" ? "💪" : "🥱"}</span>
            <span>{question.topic} </span>
            <span>{question.description}</span>
            <span>
              <Button disabled={question.status !== "selected"}>👉{question.answer.a}</Button>
              <Button disabled={question.status !== "selected"}>👉{question.answer.b}</Button>
            </span>
            <span> Timer</span>
          </Card>
        )
      }
    </>
  );
}