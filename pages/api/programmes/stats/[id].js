import dbConnect from "../../../../lib/dbConnect";
import Registrant from "../../../../models/registrant";
import Credential from "../../../../models/credential";

const mongoose = require("mongoose");

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const programmeId = mongoose.Types.ObjectId(id);

  dbConnect();

  if (method === "GET") {
    try {
      const monthlyOverview = await Registrant.aggregate([
        { $match: { programme: programmeId } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },

            monthly_registrants: { $count: {} },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const totals = await Registrant.aggregate([
        { $match: { programme: programmeId } },

        {
          $group: {
            _id: "$programme",
            total_registrants: { $count: {} },
          },
        },
      ]);
      const credentials = await Credential.aggregate([
        { $match: { programme: programmeId } },

        {
          $group: {
            _id: "$programme",
            total_credentials: { $count: {} },
          },
        },
      ]);
      res.status(200).json({ totals, monthlyOverview, credentials });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
