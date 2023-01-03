import { WeightedRandom } from './WeightedRandom'
import { answersType, questionType } from './AnswerGenerator.types'

export class AnswerGenerator extends WeightedRandom {

  questions: questionType[]
  answers: answersType = {}

  /**
   * Constructor
   * @param questions Input questions  
   */
  constructor (questions: questionType[]) {
    super()
    this.questions = questions
    this.solveQuestions()
  }

  /**
   * @returns Answers which are generated based on `questions` variable
   */
  public showAnswers(): answersType {
    return this.answers
  }

  public solveQuestions() {
    this.questions.forEach(({ id, li }: questionType) => {
      this.answers[id] = this.getWeightedAnswer(li, this.answers, this.questions)
    })
  }
}