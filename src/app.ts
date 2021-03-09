require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';
import AWS from 'aws-sdk';
const app: Application = express();
const port: string = String(process.env.PORT);

//Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
const validateNumber = (Str: string) => {
  const newA: string[] = [];
  for (let i = 0; i < 3; i++) {
    newA.push((Array.from(Str)[i]));
  }
  
  return newA.join('') === '+44';
};

const params = (req: Request) => {
  return {
    Message: req.body.message,
    PhoneNumber: `${req.body.PhoneNumber}`,
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        DataType: 'String',
        StringValue: req.body.subject,
      },
    },
  };
};

// REQUESTS
app.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // BAD REQUEST 400 STATUS
    if (!validateNumber(req.body.PhoneNumber))
      return res.status(400).json({ message: 'use correct format +44' });

    await new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(params(req))
      .promise();

    res.status(201).json({ message: 'successfully sent text message' });
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
