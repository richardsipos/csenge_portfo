import Qanda from "../models/qanda.model.js";
// import createError from "../utils/createError.js";

export const createQanda = async (req, res, next) => {
//   if (req.id === null)
    // return next(createError(403, "No id specified."));

    console.log("Hoppa")
  const newQanda = new Qanda({
    id: req.id,
    ...req.body,
  });

  try {
    const savedQanda = await newQanda.save();
    res.status(201).json(savedQanda);
  } catch (err) {
    next(err.data);
  }
};

// export const getQandas = async (req, res, next) => {
//     const q = req.query;
//     const filters = {
//       ...(q.userId && { userId: q.userId }),
//       ...(q.cat && { cat: q.cat }),
//       ...((q.min || q.max) && {
//         price: {
//           ...(q.min && { $gt: q.min }),
//           ...(q.max && { $lt: q.max }),
//         },
//       }),
//       ...(q.search && { title: { $regex: q.search, $options: "i" } }),
//     };
//     try {
//       const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
//       res.status(200).send(gigs);
//     } catch (err) {
//       // console.log("Nincs error")
//       next(err);
//     }
//   };

