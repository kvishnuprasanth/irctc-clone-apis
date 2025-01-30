import db from "../db.js";


export const addTrain = async (req, res) => {
    const { trainName, source, destination, seats } = req.body;
    try {
        const result = await db.query('INSERT INTO trains (train_name, source, destination, seats) VALUES ($1, $2, $3, $4) RETURNING *', [trainName, source, destination, seats]);
        res.json({ success: true, message: 'Train added', train: result.rows[0] });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

export const getTrains = async (req, res) => {
    const { source, destination } = req.body;
    try {
        const result = await db.query('SELECT * FROM trains WHERE source = $1 AND destination = $2', [source, destination]);
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};
