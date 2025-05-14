const Kurs = require('../pkg/model/kursModel');

exports.viewKursevi = async (req, res) => {
    try {
        const kursevi = await Kurs.find();
        res.status(200).render('welcome', {
            title:'Site kursevi',
            kursevi,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};