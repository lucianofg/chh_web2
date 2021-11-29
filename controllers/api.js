const db = require('../config/db')

async function postMudarGostar(req, res) {
    const modelo = await db.Gostou.findOrCreate({
        where: {
            itemId: req.body.item_id,
            usuarioId: req.body.usuario_id,
        },
        defaults: {
            gostou: req.body.gostou,
        }
    });
    const estado = req.body.gostou == 'true' ? true : false;
    modelo[0].set({
        gostou: estado
    });
    await modelo[0].save()

    const vic = await db.Item.findOne({where: {id: req.body.item_id}});
    if (estado)
        await vic.increment('numero_votos', { returning: false });
    else
        await vic.decrement('numero_votos', { returning: false });

    res.json({
        "data": {
            "status": "success",
        }
    });
}


module.exports = {
    postMudarGostar,
}
