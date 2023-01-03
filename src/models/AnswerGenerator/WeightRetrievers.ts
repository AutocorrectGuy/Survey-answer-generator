import { weightedObject, answersType, questionType, weightsBasedOnPreviousType, answerValueType } from './AnswerGenerator.types'

export class WeightRetrievers {

  /**
   * @param weight 
   * @param questions 
   * @param prevAnswer 
   * @returns Weight (as number) from embedded answer which is written as string,
   * but it represents range of values (numbers). Numbers (min and max from range)
   * are seperated with dash. For example: '18-24' will be converted to [
   *  18, 19, 20, 21, 22, 23, 24
   * ]
   * Code example (if younger (18-24), then more likely to be male and vice versa): 
   [{
      item: 'male', weight: {
        questionId: 'q1',
        isRangeHelper: true,
        weights: [
          { item: '18-24', weight: 1 },
          { item: '25-34', weight: 0 }
        ]
      }
    },
    {
      item: 'female', weight: {
        questionId: 'q1',
        isRangeHelper: true,
        weights: [
          { item: '18-24', weight: 0 },
          { item: '25-34', weight: 1 }
        ]
      }
    }
  ]
   */
  protected getRangedEmbededWeight(
    weight: weightsBasedOnPreviousType,
    questions: questionType[],
    prevAnswer: answerValueType
  ): number {

    const embeddedItem = weight.weights
      .find((embedded: weightedObject) => {

        // Tries to find question id and then evaluates if answer is in given range.
        const prevQuestionAnswersList: weightedObject[] | undefined = questions.find(
          ({ id }) => id === weight.questionId)?.li

        if (!prevQuestionAnswersList)
          throw new Error(`Previous question answers not found based on given question id: "${weight.questionId}"`)

        if (typeof (embedded.item) !== 'string')
          throw new Error(`For embedded.item must be type of string! The item: ${embedded.item}`)

        /** Converts previous answer value from string to number type values and stores it in variable. */
        const range = embedded.item.split('-').map(str => parseInt(str))

        if (typeof (prevAnswer) !== 'number')
          throw new Error('`prevanswer` type must be number to be evaluated!')

        return (prevAnswer >= range[0] && prevAnswer <= range[1])
      })

    if (embeddedItem === undefined)
      throw new Error(`EmbeddedItem is undefined, no corresponding question id found! Prev answer: ${prevAnswer}`)

    if (typeof (embeddedItem.weight) !== 'number')
      throw new Error(`EmbeddedItem type must be number to be returned!`)

    return embeddedItem.weight
  }

  /**
   * @param weight 
   * @param prevAnswer 
   * @returns Weight (as number) from embedded answer, for example, from:
    [{
       item: 'Prev answer 100% was - 🍎', weight: {
         questionId: 'q3',
         weights: [{ item: '🍎', weight: 1 }, { item: '🍐', weight: 0 }]
       }
     },
     {
       item: 'Prev answer 100% was 🍐', weight: {
         questionId: 'q3',
         weights: [{ item: '🍎', weight: 0 }, { item: '🍐', weight: 1 }]
        }
      }
     }]
   */
  protected getEmbededWeight(weight: weightsBasedOnPreviousType, prevAnswer: answerValueType): number {

    const embeddedWeight = weight.weights.find(w => w.item === prevAnswer)

    if (!embeddedWeight)
      throw new Error(`Embedded weight not fond for prev answer: ${prevAnswer}`)

    if (typeof (embeddedWeight.weight) !== 'number')
      throw new Error(`Embedded weight must be numbertype. Prev answer: ${prevAnswer}`)

    return embeddedWeight.weight
  }
}