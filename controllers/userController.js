const axios = require('axios');

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const response = await axios.post('https://localhost:9443/scim2/Users', {
      userName: username,
      password,
      emails: [{ value: email, type: 'work' }]
    }, {
      headers: {
        Authorization: `Basic ${Buffer.from('admin:admin').toString('base64')}`
      }
    });

    res.json(response.data); // Trả về thông tin người dùng
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    res.status(500).json({ error: 'Đăng ký thất bại' });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.post('https://localhost:9443/oauth2/token', {
      grant_type: 'password',
      username,
      password,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    res.json(response.data); // Trả về Access Token
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(401).json({ error: 'Đăng nhập thất bại' });
  }
};

exports.signout = async (req, res) => {
  const { token } = req.body;

  try {
    await axios.post('https://localhost:9443/oauth2/revoke', {
      token
    }, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`
      }
    });

    res.json({ message: 'Đăng xuất thành công' });
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error);
    res.status(500).json({ error: 'Đăng xuất thất bại' });
  }
};
