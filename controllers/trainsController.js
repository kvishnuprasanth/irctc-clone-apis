import db from "../db.js";


export const addTrain = async (req, res) => {
    const { trainName, source, destination, seats, startTime} = req.body;
    try {
        const result = await db.query('INSERT INTO trains (train_name, source, destination, seats, start_time) VALUES ($1, $2, $3, $4, $5) RETURNING *', [trainName, source, destination, seats, startTime]);
        res.json({ success: true, message: 'Train added', train: result.rows[0] });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

export const getTrains = async (req, res) => {
    const { source, destination } = req.params;
    try {
        const result = await db.query('SELECT * FROM trains WHERE source = $1 AND destination = $2', [source, destination]);
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};
