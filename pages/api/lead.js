export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, role } = req.body;
    console.log('Lead submission:', { name, email, role });
    return res.status(200).json({ message: 'Lead received' });
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
