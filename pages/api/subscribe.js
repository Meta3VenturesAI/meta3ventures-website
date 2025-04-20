export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    console.log('Newsletter subscription:', email);
    return res.status(200).json({ message: 'Subscribed' });
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
