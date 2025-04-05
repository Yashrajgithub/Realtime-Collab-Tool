export const gmailContent = (verificationToken, username) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background-color: #f4f7fc;
        color: #333;
      }
  
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        color: #2d2d2d;
        font-size: 30px;
        text-align: center;
      }
  
      p {
        font-size: 16px;
        line-height: 1.6;
        color: #555;
        text-align: center;
      }
  
      .btn-verify {
        display: inline-block;
        background-color: #4CAF50;
        color: #fff;
        font-size: 18px;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 5px;
        border: none;
        transition: background-color 0.3s ease-in-out;
        text-align: center;
        margin-top: 20px;
      }
  
      .btn-verify:hover {
        background-color: #45a049;
      }
  
      .footer {
        text-align: center;
        font-size: 12px;
        margin-top: 30px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Email Verification</h1>
      <p>Hello ${username},</p>
      <p>Thank you for signing up with Collabify! Please verify your email address by clicking the button below.</p>
      <a href="${process.env.BACKEND_URL}/users/verifyemail/${verificationToken}" class="btn-verify">Verify Email</a>
      <p class="footer">If you did not request this verification, please ignore this email.</p>
    </div>
  </body>
  </html>
  `;
}

export const successFullVerification = (username) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Success</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background-color: #f4f7fc;
        color: #333;
      }
  
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        color: #2d2d2d;
        font-size: 30px;
        text-align: center;
      }
  
      p {
        font-size: 16px;
        line-height: 1.6;
        color: #555;
        text-align: center;
      }
  
      .btn-home {
        display: inline-block;
        background-color: #4CAF50;
        color: #fff;
        font-size: 18px;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 5px;
        border: none;
        transition: background-color 0.3s ease-in-out;
        text-align: center;
        margin-top: 20px;
      }
  
      .btn-home:hover {
        background-color: #45a049;
      }
  
      .footer {
        text-align: center;
        font-size: 12px;
        margin-top: 30px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Congratulations, ${username}!</h1>
      <p>Your email has been successfully verified. You're now ready to start using Collabify to edit in real time.</p>
      <a href="${process.env.FRONTEND_URL}" class="btn-home">Go to Home Page</a>
      <p class="footer">If you did not verify your email, please contact our support team.</p>
    </div>
  </body>
  </html>
  `;
}
