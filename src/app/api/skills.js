let skills = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(skills);
  } 
  else if (req.method === 'POST') {
    const { name, rating } = req.body;
    if (!name || !rating) {
      return res.status(400).json({ error: 'Name and rating required' });
    }
    const newSkill = { id: Date.now(), name, rating };
    skills.push(newSkill);
    res.status(201).json(newSkill);
  } 
  else if (req.method === 'DELETE') {
    const { id } = req.query;
    skills = skills.filter(skill => skill.id !== parseInt(id));
    res.status(200).json({ message: 'Skill deleted' });
  } 
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
