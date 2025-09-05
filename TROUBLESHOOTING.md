# 🔧 Troubleshooting Guide

Common issues and solutions for Zauren authentication setup.

## 🚨 Common Errors

### 1. "Invalid login credentials"
**Error**: User gets this error when trying to sign in
**Causes**:
- Wrong email/password combination
- User hasn't confirmed their email address
- User account doesn't exist

**Solutions**:
- Double-check email and password
- Check spam folder for confirmation email
- Try password reset if needed
- Ensure user has completed email confirmation

### 2. "Email not confirmed"
**Error**: User can't sign in even with correct credentials
**Cause**: Email confirmation is enabled but user hasn't clicked the link

**Solutions**:
- Check email inbox and spam folder
- Resend confirmation email from Supabase dashboard
- Temporarily disable email confirmation for testing:
  ```
  Supabase → Authentication → Settings → Enable email confirmations (turn off)
  ```

### 3. Google OAuth "redirect_uri_mismatch"
**Error**: Google OAuth fails with redirect URI error
**Cause**: Redirect URIs don't match between Google Console and your app

**Solutions**:
- Ensure redirect URI in Google Console exactly matches:
  ```
  https://your-project-ref.supabase.co/auth/v1/callback
  ```
- Check for trailing slashes, http vs https
- Wait a few minutes after making changes

### 4. "Environment variables not found"
**Error**: Application can't connect to Supabase
**Cause**: Missing or incorrect environment variables

**Solutions**:
- Ensure `.env.local` is in project root
- Restart development server after adding env vars
- Check for typos in variable names
- Verify no spaces around `=` in env file

### 5. "CORS Error" in browser console
**Error**: Browser blocks requests to Supabase
**Cause**: CORS not configured properly

**Solutions**:
- Add your domain to Supabase CORS settings
- Check if you're using correct Supabase URL
- Ensure NEXT_PUBLIC_SITE_URL matches your actual URL

## 🔍 Debugging Steps

### Step 1: Check Environment Variables
```bash
# In your terminal, run:
npm run dev

# Look for these lines in the output:
# ✓ Ready in X.Xs
# No errors about missing environment variables
```

### Step 2: Test Supabase Connection
Open browser console on your site and run:
```javascript
// This should log your Supabase URL
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

// This should log your anon key (first few characters)
console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10))
```

### Step 3: Check Network Tab
1. Open browser Developer Tools → Network tab
2. Try to sign up/sign in
3. Look for failed requests to Supabase
4. Check response codes and error messages

### Step 4: Check Supabase Logs
1. Go to your Supabase dashboard
2. Navigate to Logs → Auth logs
3. Look for recent authentication attempts
4. Check for error messages

## 🛠️ Development vs Production

### Development Setup
- Use `http://localhost:3001` URLs
- Email confirmation can be disabled for faster testing
- Use separate Supabase project for development

### Production Setup
- Update all URLs to use `https://`
- Enable email confirmation
- Use environment variables in your hosting platform
- Set up proper CORS origins

## 📊 Testing Checklist

### Email Authentication
- [ ] Sign up with new email
- [ ] Receive confirmation email
- [ ] Click confirmation link
- [ ] Sign in with confirmed account
- [ ] Sign out
- [ ] Sign in again

### Google OAuth
- [ ] Click "Continue with Google"
- [ ] Complete Google authorization
- [ ] Get redirected back to app
- [ ] See user info in navigation
- [ ] Sign out
- [ ] Sign in with Google again

### Protected Routes
- [ ] Try accessing `/dashboard` without login (should redirect)
- [ ] Sign in and access `/dashboard` (should work)
- [ ] Sign out and try `/dashboard` again (should redirect)

### Navigation
- [ ] Unauthenticated: See "Sign In" and "Get Started" buttons
- [ ] Authenticated: See user menu with name/email
- [ ] User menu: Test "Dashboard", "Profile", "Sign Out" links

## 🆘 Getting Help

If you're still having issues:

1. **Check the setup guide**: Review `SETUP_GUIDE.md` step by step
2. **Console errors**: Look for JavaScript errors in browser console
3. **Network errors**: Check browser Network tab for failed requests
4. **Supabase logs**: Check authentication logs in Supabase dashboard
5. **Community help**: 
   - [Supabase Discord](https://discord.supabase.com)
   - [Supabase GitHub Discussions](https://github.com/supabase/supabase/discussions)

## 🔄 Reset Everything

If nothing works, try this nuclear option:

1. **Delete and recreate Supabase project**
2. **Clear browser cache/cookies**
3. **Delete `.env.local` and recreate it**
4. **Restart development server**
5. **Follow setup guide from scratch**

Remember: Most authentication issues are configuration problems, not code problems! 🎯
