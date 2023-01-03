import { AnswerGenerator } from './models/AnswerGenerator/AnswerGenerator'
import { questions } from './sampeQuestions'


const answers = new AnswerGenerator(questions)
console.log(answers.showAnswers())