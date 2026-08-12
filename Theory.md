Q1. Explain how you would scale a MERN application? 

Horizontal scaling – multiple servers/Node.js instances use karunga.
Load balancing – NGINX se traffic distribute karunga.
Caching – frequently used data ke liye Redis use karunga.
Database optimization – MongoDB indexing aur optimized queries use karunga.
PM2 – Node.js application ke multiple processes manage karne ke liye use karunga.


Q2. What are the pros and cons of using MongoDB for relational data? — 5 Marks

Pros:
Flexible schema hota hai.
Data ko easily scale kar sakte hain.
JavaScript/MERN ke saath easily work karta hai.
Related data ko embedded documents me store kar sakte hain.

Cons:
Complex relationships ke liye queries difficult ho sakti hain.
Multiple collections ke joins ke liye $lookup use karna padta hai.
Data duplication ho sakti hai.

Q3:
Answer:
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

Q4. How does React rendering work when state is updated?

Jab React me state update hoti hai, React component ko re-render karta hai aur updated state ke according UI ko update karta hai.


Q5. Given this JSON response, write React code to display a table of users.

function UserTable() {
  const users = [
    { id: 1, name: "Amit", email: "amit@example.com" },
    { id: 2, name: "Sara", email: "sara@example.com" }
  ];

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;

Q6. What is the difference between PUT and PATCH?

PUT → Complete resource ko update/replace karne ke liye use hota hai.
PATCH → Resource ke specific part/field ko update karne ke liye use hota hai.