import Account from "../../../models/account";
const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API);

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const email = req.body.email;
      const account = await Account.findOne({ email: email });
      const senderAdress = `accountstest@vyeti.com`;
      const token = account.verification_token;
      const data = {
        to: email,
        from: {
          email: senderAdress,
          name: "Vyeti Credentials",
        },
        subject: `Email Verification`,
        html: `
                <div align="center" style="background-color:#eceff1; padding-top:12px; padding-bottom:12px;">
                  <div style="background-color:#fff ; margin:10%; padding:6%; border-radius:15px;">
                      <h1>Email Verification Needed</h1>
                      <h3>Thank you for Registering to Vyeti!</h3>
                      <div style=" padding-left:4%; padding-right:4%;">
                        <p style="font-size: 16px;">Click the button below to verify your email address</p>
                        <a style="color: white; text-decoration:none;" href="http://localhost:3000//verifyaccount/${token}">
                          <div style="margin:10px; width:100px; background-color:#4D776D; border-radius:8px;">
                          <p style="font-size: 16px; padding:0.5px;">Verify</p>
                          </div>
                        </a> 
                      </div>
                  </div>
                </div>`,
      };

      await mail.send(data);

      res.status(200).json({ status: "OK", data });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
