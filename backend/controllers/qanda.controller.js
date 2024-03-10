import Qanda from "../models/qanda.model.js";
// import createError from "../utils/createError.js";

export const createQanda = async (req, res, next) => {
  try {
    const latestQanda = await Qanda.findOne({}, {}, { sort: { _id: -1 } });
    const latestId = latestQanda ? latestQanda.id : 0;

    const newId = latestId + 1;
    const newQanda = new Qanda({
      id: newId,
      ...req.body,
    });

    // Save the new Q&A pair

    const savedQanda = await newQanda.save();

    res.status(201).json(savedQanda);
  } catch (err) {
    next(err.data);
  }
};

export const deleteQanda = async (req, res, next) => {
  try {
    const result = await Qanda.deleteMany({id:req.params.id});
    console.log(result.deletedCount)
    if (result.deletedCount > 0) {
      res.status(200).send("Q&A pairs have been deleted!");
    } else {
      res.status(404).send("No matching Q&A pairs found for deletion.");
    }
  } catch (err) {
    next(err);
  }
};


export const getQandas = async (req, res, next) => {
    const q = req.query;
    // const filters = {
    //   ...(q.id && { id: q.id }),
    // };
    console.log("Get")
    try {
      const qandas = await Qanda.find();//.sort({ [q.sort]: -1 });  //.find(filters).
      res.status(200).send(qandas);
    } catch (err) {
      // console.log("Nincs error")
      next(err);
    }
  };

  export const editQanda = async (req, res, next) => {
    console.log("editing...")
    try {
      console.log(req.body)
      const updatedQanda = await Qanda.findOneAndUpdate(
        { id: req.params.id },
        { $set: { display: req.body.display } },
        { new: true } 
        );

        if (!updatedQanda) {
          return res.status(404).send("Q&A pair not found");
        }
        res.status(200).json(updatedQanda);
    } catch (err) {
      next(err);
    }
  };


