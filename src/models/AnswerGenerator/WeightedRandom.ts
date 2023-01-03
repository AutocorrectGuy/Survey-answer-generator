import { WeightRetrievers } from './WeightRetrievers'
import { weightedObject, answersType, answerValueType, questionType, weightsBasedOnPreviousType } from './AnswerGenerator.types'
// class for static functions

export class WeightedRandom extends WeightRetrievers {

  private choices: weightedObject[] = []
  private weights: number[] = []
  private cumulativeWeights: number[] = []
  private randomChoiceIndex: number = 0
  private answer: answerValueType = ''

  /**
   * @param choices as `questionType[]`
   * @returns One random item property from `questionType[]` array
   * based on its corresponding weight.
   */
  protected getWeightedAnswer(
    choices: weightedObject[],
    answers: answersType,
    questions: questionType[]
  ): answerValueType {

    this.reInitializeChoices(choices)
    this.updateWeights(answers, questions)
    this.updateChoiceIndex()
    this.chooseAnswerBasedOnRandom()
    // this.logWeights(answers)
    return this.answer
  }

  /**
   * Updates `randomChoiceIndex` by generating random choce index.
   * This `randomChoiceIndex` will nevel be equal to largest of `cumulativeWeights`,
   * because, when comparing in fn `chooseAnswerBasedOnRandom`, index should be smaller,
   * to be properly valuated.
   */
  private updateChoiceIndex(): void {
    this.randomChoiceIndex = Math.floor(Math.random() * Math.max(...this.cumulativeWeights))
  }

  /**
   * 
   * @param weight Wight (chance) of item being choosed (as Number).
   * @param choiceIndex
   */
  private pushIntoWeightsArrays(weight: number, choiceIndex: number) {
    this.weights.push(weight)
    this.cumulativeWeights.push(
      choiceIndex
        ? this.cumulativeWeights[choiceIndex - 1] + weight
        : weight
    )
  }

  /**
   * Updates `weights` and `cumulativeWeights` array with weights based on 
   * `choices` array items (weights).
   */
  private updateWeights(answers: answersType, questions: questionType[]): void {

    this.choices.forEach(({ weight }: weightedObject, choiceIndex: number) => {

      // answer is not based on one of previous questions.
      if (typeof (weight) === 'number') {
        this.pushIntoWeightsArrays(weight, choiceIndex)
        return
      }

      /** Answer value for previously answered question. */
      const prevAnswer: answerValueType = answers[weight.questionId]

      // Answer is based one of previous questions.
      this.pushIntoWeightsArrays(
        weight.isRangeHelper
          ? this.getRangedEmbededWeight(weight, questions, prevAnswer)
          : this.getEmbededWeight(weight, prevAnswer),
        choiceIndex
      )
    })
  }

  /**
   * Saves Array of choices in memory and clears all other variables
   * from this class.
   * @param choices Array of given choices and their corresponding weights. 
   */
  private reInitializeChoices(choices: weightedObject[]): void {
    this.choices = choices
    this.weights = []
    this.cumulativeWeights = []
    this.randomChoiceIndex = 0
    this.answer = ''
  }

  /**
   * Updates `answer` variable by looping throught all given choices
   * and saving the choice if it matches corresponding cumulative weight.
   */
  private chooseAnswerBasedOnRandom(): void {
    for (let i = 0; i < this.cumulativeWeights.length; i++) {
      if (this.randomChoiceIndex < this.cumulativeWeights[i]) {
        this.answer = this.choices[i].isRange
          ? this.getRandomFromRange(this.choices[i].item as string)
          : this.choices[i].item
        break
      }
    }
  }

  /**
   * @param answerStr For exmple '18-24' Must have dash which seperates both values
   * @returns Returns single item from `answerStr` range.
   */
  private getRandomFromRange(answerStr: string): number {
    const ages = answerStr.split('-').map(age => parseInt(age))

    return Math.floor(Math.random() * (ages[1] - ages[0] + 1) + ages[0])
  }

  /**
   * Logs weights data in terminal
   */
  private logWeights(answers: answersType): void {
    console.log(`
    -- Question ${Object.keys(answers).length + 1} --
    weights: [${this.cumulativeWeights}]
    choices: [${this.choices.map(({ item }) => item)}]
    RandomIndex: ${this.randomChoiceIndex}\n`)
  }
}