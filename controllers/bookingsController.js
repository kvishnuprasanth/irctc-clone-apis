import db from "../db.js";

export const bookSeat = async (req, res) => {
    const { userId, source, destination } = req.body;
    const client = await db.connect(); 
    try {
        await client.query('BEGIN'); 
        const train = await client.query('SELECT * FROM trains WHERE source = $1 AND destination = $2 AND seats > 0 FOR UPDATE', [source, destination]);
        if (train.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.json({ success: false, message: 'No seats available' });
        }
        const result = await client.query('UPDATE trains SET seats = seats - 1 WHERE id = $1 RETURNING *', [train.rows[0].id]);
        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.json({ success: false, message: 'Failed to book seat' });
        }
        await client.query('INSERT INTO bookings (user_id, train_id, Train_Name) VALUES ($1, $2, $3)', [userId, result.rows[0].id, result.rows[0].train_name]);
        await client.query('COMMIT'); 
        res.json({ success: true, message: 'Seat booked successfully', Train_Name: result.rows[0].train_name });
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.log(error);
        res.json({ success: false, message: error.message });
    } finally {
        client.release();
    }
};

export const getBookingDetails = async (req, res) => {
    const { userId } = req.body;
    try {
        const result = await db.query('SELECT * FROM bookings WHERE user_id = $1', [userId]);
        if (result.rows.length === 0){
            return res.json({ success: false, message: 'No bookings found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};