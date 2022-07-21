import dbConnect from "../../../../lib/dbConnect";
import Registrant from "../../../../models/registrant";
import Credential from "../../../../models/credential";
import Programme from "../../../../models/programme";

const mongoose = require("mongoose");

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const providerId = mongoose.Types.ObjectId(id);

  dbConnect();

  if (method === "GET") {
    try {
      const monthlyOverview = await Registrant.aggregate([
        { $match: { institution: providerId } },
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
      const totalRegistrants = await Registrant.aggregate([
        { $match: { institution: providerId } },

        {
          $group: {
            _id: "$institution",
            total_registrants: { $count: {} },
          },
        },
      ]);
      const totalProgrammes = await Programme.aggregate([
        { $match: { provider: providerId } },
        {
          $group: {
            _id: "$provider",
            total_programmes: { $count: {} },
          },
        },
      ]);
      const credentials = await Credential.aggregate([
        { $match: { institution: providerId } },

        {
          $group: {
            _id: "$institution",
            total_credentials: { $count: {} },
          },
        },
      ]);
      res.status(200).json({
        monthlyOverview,
        totalRegistrants,
        totalProgrammes,
        credentials,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
