// jwtUtils.js

export function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1]; // ดึง Payload ออกมาจาก JWT
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // จัดการการเข้ารหัสแบบ Base64
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload); // แปลงผลลัพธ์เป็น JSON object
    } catch (error) {
      console.error('Invalid JWT token');
      return null;
    }
  }
  