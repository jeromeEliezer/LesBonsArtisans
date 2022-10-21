import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

export const isValid = (schemas: { body?: ObjectSchema; params?: ObjectSchema }) => (req: Request, res: Response, next: NextFunction) => {
  let error = false

  // body validation
  if (schemas.body) {
    const { error: bodyError, value: bodyValue } = schemas.body.validate(req.body)
    if (bodyError) {
      error = true
      console.log(bodyError)
    } else {
      req.body = bodyValue
    }
  }

  // params validation
  if (schemas.params) {
    const { error: paramsError, value: paramsValue } = schemas.params.validate(req.params)
    if (paramsError) {
      error = true
      console.log(paramsError)
    } else {
      req.params = paramsValue
    }
  }

  if (error) {
    res.sendStatus(400) // bad parameters
  } else {
    next()
  }
}
