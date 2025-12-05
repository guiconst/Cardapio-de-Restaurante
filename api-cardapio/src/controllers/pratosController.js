const supabase = require('../supabaseClient');

// Nome da tabela no Supabase
const TABLE = 'pratos';

exports.listar = async (req, res) => {
  try {
    const { vegano } = req.query;
    let query = supabase.from(TABLE).select('*');

    if (vegano !== undefined) {
      // aceitar vegano=true|false
      const isVeg = vegano === 'true' || vegano === '1';
      query = query.eq('vegano', isVeg);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).limit(1).single();
    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const novo = req.body;
    const { data, error } = await supabase.from(TABLE).insert(novo).select();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const changes = req.body;
    const { data, error } = await supabase.from(TABLE).update(changes).eq('id', id).select();
    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Registro não encontrado' });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { data, error } = await supabase.from(TABLE).delete().eq('id', id).select();
    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Registro não encontrado' });
    res.json({ message: 'Excluído com sucesso', deleted: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
