const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API);

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const senderAdress = `credentials@vyeti.com`;
      const renderImage = req.body.image
        ? ` <img src="${req.body.image}" alt="image" style="width:100%; height:auto;"/>`
        : `<div></div>`;

      const data = {
        to: req.body.issued_to.email,
        from: {
          email: senderAdress,
          name: "Vyeti Certificates",
        },
        subject: `Congratulations! You have received a digital certificate from ${req.body.institutionName}`,
        html: `
                <div align="center" style="background-color:#eceff1; padding-top:12px; padding-bottom:12px;">
                  <div style="background-color:#fff ; margin:8%; padding:6%; border-radius:15px;">
                      <h1>Congratulations!</h1>
                      <p style="font-size: 16px;">You have recieved a digital credential from ${req.body.institutionName} via Vyeti.</p>
                      <div style="background-color:#fafafa; margin:20px; padding:10px;">
                        <div style=" margin:10px; width:100px">
                          ${renderImage}
                        </div>
                        <div style=" margin:10px; padding:10px;">
                        <p><strong>Issued by</strong>: ${req.body.institutionName}</p>
                        <p><strong>Issued to</strong>: ${req.body.issued_to.name}</p>
                        <p>${req.body.description}</p>
                        </div>
                      </div>
                      <div style=" padding-left:4%; padding-right:4%;">
                        <p style="font-size: 16px;">Follow this link to the vyeti website to claim your credential: <a style="color: black;" href="http://localhost:3000/dashboard/earner">Claim Credential</a></p>
                        <p style="font-size: 16px;">If you don't have a Vyeti account click the following link to <a style="color: black;" href="http://localhost:3000/register/earner">Create Account</a> and use the email used to receive this message to create your account</p>
                        <p style="font-size: 16px;">From there you can share your earned credential around different social media</p>
                      </div>
                  </div>
                  <p style="font-size: 12px;"><a style="color: black;" href="vyeti.com">vyeti.com</a></p>
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
