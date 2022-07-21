import dbConnect from "../../../lib/dbConnect";
import Credential from "../../../models/credential";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const credential = await Credential.findOne({ tokenId: id }).populate(
        "institution programme registrant",
        "_id institution_name slug programme_name wallet gender enrollment_date completion_date date_of_birth birth_certificate"
      );
      res.status(200).json({ credential });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
