# Render.com Environment Variables for Backend Deployment

## 📋 Complete Backend Environment Variables

Use these exact environment variables when deploying the backend on Render.com:

---

## ✅ Environment Variables to Add

### **Variable 1: MONGODB_URI**
```
Key:   MONGODB_URI
Value: mongodb+srv://tmdtrupasri_db_user:rupa2007@cluster0.evnqbqq.mongodb.net/employee-management?appName=Cluster0&retryWrites=true&w=majority
```

---

### **Variable 2: JWT_SECRET**
```
Key:   JWT_SECRET
Value: a7f3d9c2b8e1f6h4j9k0l2m5n8p1q4r7s9t2u5v8w1x4y7z9a2b5c8d1e4f7g9
```

**To generate your own unique JWT_SECRET, run in terminal:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### **Variable 3: NODE_ENV**
```
Key:   NODE_ENV
Value: production
```

---

### **Variable 4: CORS_ORIGIN**
```
Key:   CORS_ORIGIN
Value: https://employee-management-frontend-xxxxx.onrender.com
```

**Note:** Replace `xxxxx` with your actual Render frontend service name
(You'll get this URL after deploying frontend)

---

## 🎯 Step-by-Step to Add in Render

1. Go to **Render Dashboard**: https://render.com
2. Select your **backend service** (employee-management-backend)
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"** button
5. Add each variable one by one:
   - Copy the **Key** and **Value** from above
   - Click **"Save"**
   - It will automatically redeploy

---

## 📊 Summary Table

| Key | Value | Description |
|-----|-------|-------------|
| **MONGODB_URI** | `mongodb+srv://tmdtrupasri_db_user:rupa2007@cluster0.evnqbqq.mongodb.net/employee-management?appName=Cluster0&retryWrites=true&w=majority` | MongoDB connection string |
| **JWT_SECRET** | `a7f3d9c2b8e1f6h4j9k0l2m5n8p1q4r7s9t2u5v8w1x4y7z9a2b5c8d1e4f7g9` | Secret key for JWT tokens (generate unique) |
| **NODE_ENV** | `production` | Environment mode |
| **CORS_ORIGIN** | `https://employee-management-frontend-xxxxx.onrender.com` | Frontend URL (update after frontend deploy) |

---

## ✅ Verification

After adding all variables and saving:

1. Render will automatically redeploy backend
2. Wait 2-3 minutes
3. Check **Logs** tab
4. You should see:
   ```
   ✅ MongoDB connected successfully
   ✅ Server running on port XXXX
   ```

---

## 🧪 Test Backend API

Once deployed, test if it's working:

```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{"status":"Server is running"}
```

---

## 📝 Important Notes

- **Do NOT include PORT** - Render assigns it automatically
- **JWT_SECRET** - Generate a unique one for security (use the node command)
- **CORS_ORIGIN** - Update after deploying frontend
- **MONGODB_URI** - Must include `/employee-management` database name
- **NODE_ENV** - Keep as `production` for Render

---

## 🔒 Security Tips

- Never share JWT_SECRET
- Generate a unique JWT_SECRET (not the example one)
- Keep MONGODB_URI private
- Use strong database password (you have: `rupa2007`)

---

## 📞 If Deployment Fails

1. Check all variables are added correctly
2. Verify MongoDB connection string includes database name
3. Check MONGODB_URI has no typos
4. Review logs for specific error messages

Your backend should be ready! 🚀
