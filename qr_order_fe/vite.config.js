import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // เพิ่ม alias หรือตรวจสอบว่าไม่มีข้อจำกัดในการ resolve node_modules
    }
  }
})
