import dbConnect from "../../../../lib/dbConnect";
import Registrant from "../../../../models/registrant";

export default async function handler(req, res) {
  const {
    method,
    query: { name },
  } = req;

  dbConnect();
  let namePattern = new RegExp("^" + req.body.name);
  if (method === "POST") {
    try {
      const registrants = await Registrant.find({
        fullname: { $regex: namePattern },
      }).populate(
        "institution programme",
        "_id institution_name programme_name"
      );
      res.status(200).json({ registrants, namePattern });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  8;
}
